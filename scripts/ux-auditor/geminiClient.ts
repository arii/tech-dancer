import fs from 'fs';
import {
  UXHypothesesResponseSchema,
  UXAuditSynthesisSchema,
  type UXHypothesesResponse,
  type UXAuditSynthesis
} from './types';

const GEMINI_CONTEXT_CACHE_TOKEN_THRESHOLD = 32_000;

export interface GeminiMultimodalMessagePart {
  text?: string;
  inlineData?: {
    mimeType: string;
    data: string;
  };
}

const HYPOTHESES_RESPONSE_SCHEMA = {
  type: 'OBJECT',
  properties: {
    visualHierarchySummary: {
      type: 'STRING',
      description: 'Summary of the page visual hierarchy and reading path'
    },
    primaryConversionGoal: {
      type: 'STRING',
      description: 'Identified primary CTA and goal of the page'
    },
    hypotheses: {
      type: 'ARRAY',
      items: {
        type: 'OBJECT',
        properties: {
          question: { type: 'STRING' },
          context: { type: 'STRING' },
          suggestedAction: { type: 'STRING' },
          recommendedViewportsToInspect: {
            type: 'ARRAY',
            items: { type: 'STRING' }
          }
        },
        required: ['question', 'context', 'suggestedAction', 'recommendedViewportsToInspect']
      }
    }
  },
  required: ['visualHierarchySummary', 'primaryConversionGoal', 'hypotheses']
};

const SYNTHESIS_RESPONSE_SCHEMA = {
  type: 'OBJECT',
  properties: {
    overallScore: {
      type: 'INTEGER',
      description: 'Overall UX health score from 0 to 100'
    },
    summaryMarkdown: {
      type: 'STRING',
      description: 'Executive summary markdown of the audit'
    },
    findings: {
      type: 'ARRAY',
      items: {
        type: 'OBJECT',
        properties: {
          id: { type: 'STRING' },
          category: {
            type: 'STRING',
            enum: ['HIERARCHY', 'CTA_CONVERSION', 'RESPONSIVE_LAYOUT', 'ACCESSIBILITY', 'CONTENT_DENSITY', 'DESIGN_SYSTEM']
          },
          severity: {
            type: 'STRING',
            enum: ['CRITICAL', 'HIGH', 'MEDIUM', 'LOW', 'POLISH']
          },
          title: { type: 'STRING' },
          description: { type: 'STRING' },
          affectedViewport: { type: 'STRING' },
          elementSelector: { type: 'STRING' },
          recommendedFix: { type: 'STRING' },
          suggestedTailwindSnippet: { type: 'STRING' }
        },
        required: ['id', 'category', 'severity', 'title', 'description', 'recommendedFix']
      }
    }
  },
  required: ['overallScore', 'summaryMarkdown', 'findings']
};

function normalizeHypothesesData(raw: any): UXHypothesesResponse {
  if (!raw || typeof raw !== 'object') {
    return {
      visualHierarchySummary: 'Visual hierarchy evaluated.',
      primaryConversionGoal: 'General navigation and engagement.',
      hypotheses: []
    };
  }

  const visualHierarchySummary =
    raw.visualHierarchySummary ||
    raw.visual_hierarchy_summary ||
    raw.summary ||
    raw.visualHierarchy ||
    'Visual hierarchy evaluated.';

  const primaryConversionGoal =
    raw.primaryConversionGoal ||
    raw.primary_conversion_goal ||
    raw.conversionGoal ||
    raw.goal ||
    'Primary user conversion goal.';

  const rawHypotheses = Array.isArray(raw.hypotheses)
    ? raw.hypotheses
    : Array.isArray(raw.questions)
    ? raw.questions
    : [];

  const hypotheses = rawHypotheses.map((h: any, idx: number) => {
    const question = h.question || h.query || h.title || `UX Hypothesis ${idx + 1}`;
    const context = h.context || h.description || h.reason || 'Flagged during visual scan.';
    const suggestedAction = h.suggestedAction || h.action || h.recommendation || 'Inspect on mobile breakpoint.';
    const rawVps = Array.isArray(h.recommendedViewportsToInspect)
      ? h.recommendedViewportsToInspect
      : Array.isArray(h.viewports)
      ? h.viewports
      : ['mobile'];

    const validVps = rawVps
      .map((v: string) => String(v).toLowerCase())
      .filter((v: string) => ['mobile', 'tablet', 'laptop', 'ultrawide'].includes(v));

    return {
      question,
      context,
      suggestedAction,
      recommendedViewportsToInspect: validVps.length > 0 ? validVps : ['mobile']
    };
  });

  return {
    visualHierarchySummary,
    primaryConversionGoal,
    hypotheses
  };
}

function normalizeSynthesisData(raw: any): UXAuditSynthesis {
  if (!raw || typeof raw !== 'object') {
    return {
      overallScore: 80,
      summaryMarkdown: 'UX audit evaluation completed.',
      findings: []
    };
  }

  const overallScore = typeof raw.overallScore === 'number'
    ? Math.max(0, Math.min(100, raw.overallScore))
    : typeof raw.score === 'number'
    ? Math.max(0, Math.min(100, raw.score))
    : 85;

  const summaryMarkdown = raw.summaryMarkdown || raw.summary || 'UX audit completed.';

  const rawFindings = Array.isArray(raw.findings)
    ? raw.findings
    : Array.isArray(raw.issues)
    ? raw.issues
    : [];

  const validCategories = new Set(['HIERARCHY', 'CTA_CONVERSION', 'RESPONSIVE_LAYOUT', 'ACCESSIBILITY', 'CONTENT_DENSITY', 'DESIGN_SYSTEM']);
  const validSeverities = new Set(['CRITICAL', 'HIGH', 'MEDIUM', 'LOW', 'POLISH']);

  const findings = rawFindings.map((f: any, idx: number) => {
    const id = f.id || `UX-${idx + 1}`;
    const category = validCategories.has(String(f.category).toUpperCase()) ? String(f.category).toUpperCase() : 'HIERARCHY';
    const severity = validSeverities.has(String(f.severity).toUpperCase()) ? String(f.severity).toUpperCase() : 'MEDIUM';
    const title = f.title || f.name || `UX Finding ${idx + 1}`;
    const description = f.description || f.issue || f.problem || 'UX issue identified.';
    const affectedViewport = f.affectedViewport || f.viewport;
    const elementSelector = f.elementSelector || f.selector;
    const recommendedFix = f.recommendedFix || f.fix || f.recommendation || 'Refine layout styling.';
    const suggestedTailwindSnippet = f.suggestedTailwindSnippet || f.tailwind || f.codeSnippet;

    return {
      id,
      category: category as any,
      severity: severity as any,
      title,
      description,
      affectedViewport,
      elementSelector,
      recommendedFix,
      suggestedTailwindSnippet
    };
  });

  return {
    overallScore,
    summaryMarkdown,
    findings
  };
}

export class GeminiUXAuditClient {
  private apiKey: string;
  private modelName: string;

  constructor(modelName = 'gemini-2.5-flash') {
    this.apiKey = process.env.GEMINI_API_KEY || '';
    this.modelName = modelName;
    if (!this.apiKey) {
      console.warn('⚠️ GEMINI_API_KEY is not set in environment variables.');
    }
  }

  private encodeImageToBase64(imagePath: string): string {
    if (!fs.existsSync(imagePath)) {
      throw new Error(`Screenshot file not found at: ${imagePath}`);
    }
    return fs.readFileSync(imagePath).toString('base64');
  }

  private estimateTokens(text: string, imageCount = 1): number {
    const textTokens = Math.ceil(text.length / 4);
    const imageTokens = imageCount * 1600;
    return textTokens + imageTokens;
  }

  public async analyzeAndAsk(
    systemPrompt: string,
    userPromptText: string,
    screenshotPath: string
  ): Promise<UXHypothesesResponse> {
    const base64Image = this.encodeImageToBase64(screenshotPath);
    const estimatedTokens = this.estimateTokens(systemPrompt + userPromptText, 1);

    if (estimatedTokens >= GEMINI_CONTEXT_CACHE_TOKEN_THRESHOLD) {
      console.log(`ℹ️ Base payload tokens (~${estimatedTokens}) qualify for Gemini Context Caching.`);
    }

    const payload = {
      contents: [
        {
          role: 'user',
          parts: [
            { text: `${systemPrompt}\n\n${userPromptText}` },
            {
              inlineData: {
                mimeType: 'image/png',
                data: base64Image
              }
            }
          ]
        }
      ],
      generationConfig: {
        responseMimeType: 'application/json',
        responseSchema: HYPOTHESES_RESPONSE_SCHEMA,
        temperature: 0.2
      }
    };

    const responseText = await this.callGeminiApi(payload);
    try {
      const parsed = JSON.parse(responseText);
      const normalized = normalizeHypothesesData(parsed);
      return UXHypothesesResponseSchema.parse(normalized);
    } catch (parseErr) {
      console.warn('Handling fallback parsing for hypotheses response:', parseErr);
      const cleaned = responseText.replace(/^```json\s*/gi, '').replace(/\s*```$/g, '').trim();
      const parsed = JSON.parse(cleaned);
      const normalized = normalizeHypothesesData(parsed);
      return UXHypothesesResponseSchema.parse(normalized);
    }
  }

  public async synthesizeAudit(
    systemPrompt: string,
    conversationHistoryText: string,
    synthesisPromptText: string,
    screenshotPaths: string[] = []
  ): Promise<UXAuditSynthesis> {
    const parts: GeminiMultimodalMessagePart[] = [
      { text: `${systemPrompt}\n\n=== CONVERSATION HISTORY ===\n${conversationHistoryText}\n\n${synthesisPromptText}` }
    ];

    for (const imgPath of screenshotPaths) {
      if (fs.existsSync(imgPath)) {
        parts.push({
          inlineData: {
            mimeType: 'image/png',
            data: this.encodeImageToBase64(imgPath)
          }
        });
      }
    }

    const payload = {
      contents: [
        {
          role: 'user',
          parts
        }
      ],
      generationConfig: {
        responseMimeType: 'application/json',
        responseSchema: SYNTHESIS_RESPONSE_SCHEMA,
        temperature: 0.2
      }
    };

    const responseText = await this.callGeminiApi(payload);
    try {
      const parsed = JSON.parse(responseText);
      const normalized = normalizeSynthesisData(parsed);
      return UXAuditSynthesisSchema.parse(normalized);
    } catch (parseErr) {
      console.warn('Handling fallback parsing for synthesis response:', parseErr);
      const cleaned = responseText.replace(/^```json\s*/gi, '').replace(/\s*```$/g, '').trim();
      const parsed = JSON.parse(cleaned);
      const normalized = normalizeSynthesisData(parsed);
      return UXAuditSynthesisSchema.parse(normalized);
    }
  }

  private async callGeminiApi(payload: Record<string, any>): Promise<string> {
    if (!this.apiKey) {
      throw new Error('GEMINI_API_KEY is required for UX Auditor execution.');
    }

    const url = `https://generativelanguage.googleapis.com/v1beta/models/${this.modelName}:generateContent`;
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': this.apiKey
      },
      body: JSON.stringify(payload)
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Gemini API Error ${res.status}: ${text}`);
    }

    const data = await res.json() as any;
    const candidate = data.candidates?.[0];
    const textContent = candidate?.content?.parts?.[0]?.text || '';
    return textContent;
  }
}
