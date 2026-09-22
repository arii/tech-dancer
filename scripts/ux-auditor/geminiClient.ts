import fs from 'fs';
import {
  UXHypothesesResponseSchema,
  UXAuditSynthesisSchema,
  type UXHypothesesResponse,
  type UXAuditSynthesis,
  type UXFinding
} from './types';

const GEMINI_HYPOTHESIS_SCHEMA = {
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

const GEMINI_SYNTHESIS_SCHEMA = {
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
            enum: ['HIERARCHY', 'CTA_CONVERSION', 'RESPONSIVE_LAYOUT', 'ACCESSIBILITY', 'CONTENT_DENSITY', 'DESIGN_SYSTEM', 'AI_SLOP_PRUNING']
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

function normalizeHypothesesData(raw: unknown): UXHypothesesResponse {
  if (!raw || typeof raw !== 'object') {
    return {
      visualHierarchySummary: 'Visual hierarchy evaluated.',
      primaryConversionGoal: 'General navigation and engagement.',
      hypotheses: []
    };
  }

  const rawObj = raw as Record<string, unknown>;

  const visualHierarchySummary =
    typeof rawObj.visualHierarchySummary === 'string'
      ? rawObj.visualHierarchySummary
      : typeof rawObj.visual_hierarchy_summary === 'string'
      ? rawObj.visual_hierarchy_summary
      : typeof rawObj.summary === 'string'
      ? rawObj.summary
      : typeof rawObj.visualHierarchy === 'string'
      ? rawObj.visualHierarchy
      : 'Visual hierarchy evaluated.';

  const primaryConversionGoal =
    typeof rawObj.primaryConversionGoal === 'string'
      ? rawObj.primaryConversionGoal
      : typeof rawObj.primary_conversion_goal === 'string'
      ? rawObj.primary_conversion_goal
      : typeof rawObj.conversionGoal === 'string'
      ? rawObj.conversionGoal
      : typeof rawObj.goal === 'string'
      ? rawObj.goal
      : 'Primary user conversion goal.';

  const rawHypotheses = Array.isArray(rawObj.hypotheses)
    ? rawObj.hypotheses
    : Array.isArray(rawObj.questions)
    ? rawObj.questions
    : [];

  const hypotheses = rawHypotheses.map((hItem: unknown, idx: number) => {
    const h = (hItem && typeof hItem === 'object') ? (hItem as Record<string, unknown>) : {};
    const question = typeof h.question === 'string' ? h.question : typeof h.query === 'string' ? h.query : typeof h.title === 'string' ? h.title : `UX Hypothesis ${idx + 1}`;
    const context = typeof h.context === 'string' ? h.context : typeof h.description === 'string' ? h.description : typeof h.reason === 'string' ? h.reason : 'Flagged during visual scan.';
    const suggestedAction = typeof h.suggestedAction === 'string' ? h.suggestedAction : typeof h.action === 'string' ? h.action : typeof h.recommendation === 'string' ? h.recommendation : 'Inspect on mobile breakpoint.';
    const rawVps = Array.isArray(h.recommendedViewportsToInspect)
      ? h.recommendedViewportsToInspect
      : Array.isArray(h.viewports)
      ? h.viewports
      : ['mobile'];

    const validVps = rawVps
      .map((v: unknown) => String(v).toLowerCase())
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

function normalizeSynthesisData(raw: unknown): UXAuditSynthesis {
  if (!raw || typeof raw !== 'object') {
    return {
      overallScore: 80,
      summaryMarkdown: 'UX audit evaluation completed.',
      findings: []
    };
  }

  const rawObj = raw as Record<string, unknown>;

  const overallScore = typeof rawObj.overallScore === 'number'
    ? Math.max(0, Math.min(100, rawObj.overallScore))
    : typeof rawObj.score === 'number'
    ? Math.max(0, Math.min(100, rawObj.score))
    : 85;

  const summaryMarkdown = typeof rawObj.summaryMarkdown === 'string'
    ? rawObj.summaryMarkdown
    : typeof rawObj.summary === 'string'
    ? rawObj.summary
    : 'UX audit completed.';

  const rawFindings = Array.isArray(rawObj.findings)
    ? rawObj.findings
    : Array.isArray(rawObj.issues)
    ? rawObj.issues
    : [];

  const validCategories = new Set(['HIERARCHY', 'CTA_CONVERSION', 'RESPONSIVE_LAYOUT', 'ACCESSIBILITY', 'CONTENT_DENSITY', 'DESIGN_SYSTEM', 'AI_SLOP_PRUNING']);
  const validSeverities = new Set(['CRITICAL', 'HIGH', 'MEDIUM', 'LOW', 'POLISH']);

  const findings: UXFinding[] = rawFindings.map((fItem: unknown, idx: number) => {
    const f = (fItem && typeof fItem === 'object') ? (fItem as Record<string, unknown>) : {};
    const id = typeof f.id === 'string' ? f.id : `UX-${idx + 1}`;
    const categoryCandidate = typeof f.category === 'string' ? f.category.toUpperCase() : 'HIERARCHY';
    const category = validCategories.has(categoryCandidate) ? categoryCandidate : 'HIERARCHY';
    const severityCandidate = typeof f.severity === 'string' ? f.severity.toUpperCase() : 'MEDIUM';
    const severity = validSeverities.has(severityCandidate) ? severityCandidate : 'MEDIUM';
    const title = typeof f.title === 'string' ? f.title : typeof f.name === 'string' ? f.name : `UX Finding ${idx + 1}`;
    const description = typeof f.description === 'string' ? f.description : typeof f.issue === 'string' ? f.issue : typeof f.problem === 'string' ? f.problem : 'UX issue identified.';
    const affectedViewport = typeof f.affectedViewport === 'string' ? f.affectedViewport : typeof f.viewport === 'string' ? f.viewport : undefined;
    const elementSelector = typeof f.elementSelector === 'string' ? f.elementSelector : typeof f.selector === 'string' ? f.selector : undefined;
    const recommendedFix = typeof f.recommendedFix === 'string' ? f.recommendedFix : typeof f.fix === 'string' ? f.fix : typeof f.recommendation === 'string' ? f.recommendation : 'Refine layout styling.';
    const suggestedTailwindSnippet = typeof f.suggestedTailwindSnippet === 'string' ? f.suggestedTailwindSnippet : typeof f.tailwind === 'string' ? f.tailwind : typeof f.codeSnippet === 'string' ? f.codeSnippet : undefined;

    return {
      id,
      category: category as UXFinding['category'],
      severity: severity as UXFinding['severity'],
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

  constructor(apiKey?: string, modelName = 'gemini-2.5-flash') {
    this.apiKey = apiKey || process.env.GEMINI_API_KEY || '';
    this.modelName = modelName;
  }

  async analyzeAndAsk(
    systemPrompt: string,
    userPrompt: string,
    screenshotPath: string
  ): Promise<UXHypothesesResponse> {
    const screenshotBase64 = fs.existsSync(screenshotPath)
      ? fs.readFileSync(screenshotPath).toString('base64')
      : '';

    const payload = {
      contents: [
        {
          role: 'user',
          parts: [
            { text: userPrompt },
            ...(screenshotBase64
              ? [
                  {
                    inlineData: {
                      mimeType: 'image/png',
                      data: screenshotBase64
                    }
                  }
                ]
              : [])
          ]
        }
      ],
      systemInstruction: {
        parts: [{ text: systemPrompt }]
      },
      generationConfig: {
        responseMimeType: 'application/json',
        responseSchema: GEMINI_HYPOTHESIS_SCHEMA,
        temperature: 0.2
      }
    };

    const responseText = await this.callGeminiApi(payload);

    try {
      const parsed = JSON.parse(responseText);
      const normalized = normalizeHypothesesData(parsed);
      return UXHypothesesResponseSchema.parse(normalized);
    } catch (parseErr) {
      console.warn('Handling fallback parsing for hypothesis response:', parseErr);
      const cleaned = responseText.replace(/^```json\s*/gi, '').replace(/\s*```$/g, '').trim();
      const parsed = JSON.parse(cleaned);
      const normalized = normalizeHypothesesData(parsed);
      return UXHypothesesResponseSchema.parse(normalized);
    }
  }

  async synthesizeAudit(
    systemPrompt: string,
    conversationHistory: string,
    synthesisPrompt: string,
    screenshotPaths: string[]
  ): Promise<UXAuditSynthesis> {
    const parts: Array<{ text?: string; inlineData?: { mimeType: string; data: string } }> = [
      { text: `${synthesisPrompt}\n\n=== CONVERSATION HISTORY ===\n${conversationHistory}` }
    ];

    for (const p of screenshotPaths) {
      if (fs.existsSync(p)) {
        const data = fs.readFileSync(p).toString('base64');
        parts.push({
          inlineData: {
            mimeType: 'image/png',
            data
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
      systemInstruction: {
        parts: [{ text: systemPrompt }]
      },
      generationConfig: {
        responseMimeType: 'application/json',
        responseSchema: GEMINI_SYNTHESIS_SCHEMA,
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

  private async callGeminiApi(payload: Record<string, unknown>): Promise<string> {
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

    const data = (await res.json()) as { candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }> };
    const candidate = data.candidates?.[0];
    const textContent = candidate?.content?.parts?.[0]?.text || '';
    return textContent;
  }
}
