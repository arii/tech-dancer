import { HumanMessage, SystemMessage } from '@langchain/core/messages';
import { buildVisualReviewPayload } from '../lib/visualReviewUtils';
import { extractFeedbackText } from '../lib/codeReviewUtils';
import { pickGeminiModel, getGeminiPricing } from '../lib/geminiModelPicker';
import { extractFinishReason, createGeminiModel, applyRetryStrategy } from '../lib/geminiUtils';
import type { LLMClientStrategy, AgentRole } from '../lib/visualReviewOrchestrator';

import { VISUAL_REVIEW_SCHEMA, type RouteReview, type VisualRouteSummary, type VisualReviewFinding } from '../lib/visualReviewTypes';

const ROLE_PROMPTS: Record<AgentRole, string> = {
  CODE_REVIEW: "You are a Senior Software Engineer. Focus on the impact of code changes on the rendered output. Verify that the DOM diff aligns with the visual changes.",
  ACCESSIBILITY: "You are an Accessibility Specialist. Audit the page for contrast issues, tap target sizes, and semantic structure regressions.",
  UX: "You are a Senior UX Researcher. Evaluate the visual hierarchy, information density, and overall user experience. Flag any 'BoomTick' design system violations.",
  VISUAL_REGRESSION: "You are a QA Engineer specialized in visual testing. Look for unintended pixel-perfect shifts, clipping, and color regressions.",
  RESPONSIVE_LAYOUT: "You are a Mobile-First Designer. Specifically audit how the layout collapses across viewports. Flag any horizontal compression or broken grids."
};

export const geminiVisualReviewClient: LLMClientStrategy = {
  botName: 'impact-gemini-review',
  reportTitle: '👁️ Visual Review Agent',
  botTagline: 'Powered by Gemini 3.x Vision + Blast-Radius Analyzer',
  reportFileName: 'gemini-review.md',

  invokeReview: async (summary: VisualRouteSummary, role: AgentRole = 'UX'): Promise<RouteReview> => {
    let modelName: string;
    try {
      modelName = await pickGeminiModel('flash', 0);
    } catch (err) {
      console.error('Failed to pick Gemini model, falling back to gemini-3.5-flash:', err);
      modelName = 'gemini-3.5-flash';
    }

    let maxOutputTokens = 4096;
    let thinkingBudget = 1024;
    let model = createGeminiModel(modelName, maxOutputTokens, thinkingBudget, VISUAL_REVIEW_SCHEMA, 'application/json');
    const baseContent = buildVisualReviewPayload(summary);

    baseContent.push({
      type: 'text',
      text: `YOUR SPECIFIC ROLE FOR THIS REVIEW: ${role}\n${ROLE_PROMPTS[role]}`
    });

    if (summary.previousFindings && summary.previousFindings.length > 0) {
      const findingsStr = summary.previousFindings
        .map(f => {
          let line = `- [${f.id}] ${f.issue} (Status: ${f.status})`;
          if (f.fixSummary) {
            line += `\n   → ${f.fixSummary}`;
          }
          return line;
        })
        .join('\n');

      baseContent.push({
        type: 'text',
        text: `PREVIOUS REVIEW ROUND FINDINGS FOR THIS ROUTE:
${findingsStr}

Your job:
- Confirm THIS issue is resolved before raising anything new.
- Only raise a NEW issue if it is unrelated to anything already addressed, or if the fix for a previous issue introduced a new problem.
- Do not re-open a resolved issue under a different framing.`
      });
    }

    // Actually, ChatGoogleGenerativeAI expects a list of messages, where each message can have parts.
    // Let's bundle them into a single HumanMessage for now as building multi-message vision payloads
    // with separate SystemMessages is model-dependent.
    // However, the core request was to separate system instructions.

    const systemInstruction = baseContent.filter(p => p.type === 'text' && (p.text.includes('You are a senior UX') || p.text.includes('YOUR SPECIFIC ROLE'))).map(p => p.text).join('\n\n');
    const otherParts = baseContent.filter(p => !(p.type === 'text' && (p.text.includes('You are a senior UX') || p.text.includes('YOUR SPECIFIC ROLE'))));

    const finalMessages = [
      new SystemMessage({ content: systemInstruction }),
      new HumanMessage({ content: otherParts.map(p => {
        if (p.type === 'text') return { type: 'text', text: p.text };
        return { type: 'image_url', image_url: p.image_url };
      })})
    ];

    let response = await model.invoke(finalMessages);

    let finishReason = extractFinishReason(response);

    if (finishReason === 'MAX_TOKENS') {
      console.warn('Gemini MAX_TOKENS — retrying with adjusted budget', {
        usage: response.usage_metadata,
      });

      const { newMax, newThinking } = applyRetryStrategy(maxOutputTokens, thinkingBudget);
      maxOutputTokens = newMax;
      thinkingBudget = newThinking;

      model = createGeminiModel(modelName, maxOutputTokens, thinkingBudget, VISUAL_REVIEW_SCHEMA, 'application/json');
      response = await model.invoke(finalMessages);

      finishReason = extractFinishReason(response);
    }

    const usageMetadata = response.usage_metadata as {
      input_tokens?: number;
      output_tokens?: number;
      total_tokens?: number;
      thoughts_token_count?: number;
    };
    const inputTokens = usageMetadata?.input_tokens ?? 0;
    const outputTokens = usageMetadata?.output_tokens ?? 0;
    const totalTokens = usageMetadata?.total_tokens ?? 0;
    const cacheTokens = (usageMetadata as { cache_read_tokens?: number })?.cache_read_tokens ?? 0;
    const thoughtsTokenCount = usageMetadata?.thoughts_token_count ??
                               (typeof response.response_metadata === 'object' && response.response_metadata !== null
                                 ? ((response.response_metadata as Record<string, unknown>).usage as Record<string, unknown>)?.thoughts_token_count as number | undefined
                                 : 0) ?? 0;

    if (thoughtsTokenCount > thinkingBudget * 1.1) {
      console.warn('Thinking budget exceeded by >10%', {
        budgetSet: thinkingBudget,
        thoughtsUsed: thoughtsTokenCount,
        model: modelName,
      });
    }

    const isTruncated = finishReason === 'MAX_TOKENS' || finishReason === 'length' || finishReason === 'max_tokens';

    if (isTruncated) {
      console.error('Gemini truncation', {
        finishReason,
        usage: usageMetadata,
      });
      return {
        route: summary.route,
        severity: summary.severity,
        differencePercent: summary.differencePercent,
        feedback: `Error: Gemini model was truncated during execution (finishReason=${finishReason}).`,
        tokens: totalTokens,
        cost: 0,
        modelName,
        llmVerdict: 'warn',
        findings: [],
        truncated: true,
      };
    }

    const pricing = getGeminiPricing(modelName);
    const cost = pricing ? (inputTokens / 1_000_000) * pricing.inputCostPerM + (outputTokens / 1_000_000) * pricing.outputCostPerM : 0;

    const rawFeedback = extractFeedbackText(response.content);
    let feedback: string;
    let verdict: 'pass' | 'fail' | 'warn' = 'warn';
    let findings: VisualReviewFinding[] = [];
    let parseError: RouteReview['parseError'] = undefined;

    try {
      const parsed = JSON.parse(rawFeedback);
      feedback = parsed.feedback || rawFeedback;
      verdict = (parsed.verdict?.toLowerCase() as 'pass' | 'fail' | 'warn') || 'pass';
      findings = parsed.findings || [];
    } catch (e) {
      console.warn('Failed to parse structured Gemini visual response:', e, 'Raw content:', rawFeedback.slice(0, 200));
      parseError = 'invalid_json';
      feedback = `Error parsing LLM response: ${e instanceof Error ? e.message : String(e)}\n\nOriginal response: ${rawFeedback}`;
    }

    return {
      route: summary.route,
      severity: summary.severity,
      differencePercent: summary.differencePercent,
      feedback: feedback,
      tokens: totalTokens,
      inputTokens,
      outputTokens,
      cacheTokens,
      cost: cost,
      modelName: modelName,
      llmVerdict: verdict,
      findings: findings,
      truncated: isTruncated,
      parseError,
    };
  }
};
