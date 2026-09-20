import { BaseMessage } from '@langchain/core/messages';
import { z } from 'zod';

export const UXHypothesisSchema = z.object({
  question: z.string().describe('Probing question for the user or UX hypothesis'),
  context: z.string().describe('Why this is flagged based on the visual/DOM scan'),
  suggestedAction: z.string().describe('Recommended next inspection or design fix'),
  recommendedViewportsToInspect: z.array(z.enum(['mobile', 'tablet', 'laptop', 'ultrawide']))
});

export const UXHypothesesResponseSchema = z.object({
  visualHierarchySummary: z.string().describe('Summary of the page visual hierarchy and reading path'),
  primaryConversionGoal: z.string().describe('Identified primary CTA and goal of the page'),
  hypotheses: z.array(UXHypothesisSchema)
});

export const UXFindingSchema = z.object({
  id: z.string(),
  category: z.enum([
    'HIERARCHY',
    'CTA_CONVERSION',
    'RESPONSIVE_LAYOUT',
    'ACCESSIBILITY',
    'CONTENT_DENSITY',
    'DESIGN_SYSTEM'
  ]),
  severity: z.enum(['CRITICAL', 'HIGH', 'MEDIUM', 'LOW', 'POLISH']),
  title: z.string(),
  description: z.string(),
  affectedViewport: z.string().optional(),
  elementSelector: z.string().optional(),
  recommendedFix: z.string(),
  suggestedTailwindSnippet: z.string().optional()
});

export const UXAuditSynthesisSchema = z.object({
  overallScore: z.number().min(0).max(100),
  summaryMarkdown: z.string(),
  findings: z.array(UXFindingSchema)
});

export type UXHypothesisQuestion = z.infer<typeof UXHypothesisSchema>;
export type UXFinding = z.infer<typeof UXFindingSchema>;
export type UXHypothesesResponse = z.infer<typeof UXHypothesesResponseSchema>;
export type UXAuditSynthesis = z.infer<typeof UXAuditSynthesisSchema>;

export interface AxeNodeSummary {
  html: string;
  target: string[];
  failureSummary?: string;
}

export interface AxeViolationSummary {
  id: string;
  impact: string;
  description: string;
  helpUrl: string;
  nodes: AxeNodeSummary[];
}

export interface ViewportScanResult {
  viewport: string;
  width: number;
  height: number;
  screenshotPath: string;
  prunedDom: string;
  axeViolations: AxeViolationSummary[];
  metrics?: {
    scrollWidth: number;
    scrollHeight: number;
    visibleCTACount: number;
    smallTapTargetsCount: number;
  };
  deltaCrops?: string[];
}

export interface UXAuditState {
  route: string;
  slug: string;
  selectedViewports: string[];
  messages: BaseMessage[];
  iterationCount: number;
  maxIterations: number;
  baseScan?: ViewportScanResult;
  expandedScans: Record<string, ViewportScanResult>;
  currentHypotheses: UXHypothesisQuestion[];
  visualHierarchySummary: string;
  primaryConversionGoal: string;
  isApproved: boolean;
  finalFindings: UXFinding[];
  summaryMarkdown: string;
  overallScore: number;
}
