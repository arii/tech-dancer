import { StateGraph, MemorySaver, START, END } from '@langchain/langgraph';
import { BaseMessage, HumanMessage, AIMessage, SystemMessage } from '@langchain/core/messages';
import readline from 'readline';
import {
  type UXAuditState,
  type UXHypothesisQuestion,
  type ViewportScanResult
} from './types';
import { captureViewport, type CaptureOptions } from './capture';
import { GeminiUXAuditClient } from './geminiClient';
import { DesignSystemRAGRetriever } from './ragRetriever';
import {
  BASE_UX_SYSTEM_PROMPT,
  buildAnalyzeAndAskPrompt,
  buildSynthesisPrompt
} from './prompts';

export interface GraphRunnerOptions {
  route: string;
  defaultViewport?: string;
  allViewports?: boolean;
  interactive?: boolean;
  maxIterations?: number;
  captureOptions?: CaptureOptions;
}

/**
 * State annotation channels with state reducers.
 */
const auditStateChannels = {
  route: { value: (x?: string, y?: string) => y ?? x ?? '/', default: () => '/' },
  slug: { value: (x?: string, y?: string) => y ?? x ?? 'home', default: () => 'home' },
  selectedViewports: {
    value: (x: string[] = [], y: string[] = []) => Array.from(new Set([...(x || []), ...(y || [])])),
    default: () => ['desktop']
  },
  messages: {
    value: (x: BaseMessage[] = [], y: BaseMessage[] = []) => (x || []).concat(y || []),
    default: () => []
  },
  iterationCount: { value: (x?: number, y?: number) => y ?? x ?? 0, default: () => 0 },
  maxIterations: { value: (x?: number, y?: number) => y ?? x ?? 3, default: () => 3 },
  baseScan: { value: (x?: ViewportScanResult, y?: ViewportScanResult) => y ?? x, default: () => undefined },
  expandedScans: {
    value: (x: Record<string, ViewportScanResult> = {}, y: Record<string, ViewportScanResult> = {}) => ({ ...x, ...y }),
    default: () => ({})
  },
  currentHypotheses: {
    value: (x: UXHypothesisQuestion[] = [], y: UXHypothesisQuestion[] = []) => y ?? x ?? [],
    default: () => []
  },
  visualHierarchySummary: { value: (x?: string, y?: string) => y ?? x ?? '', default: () => '' },
  primaryConversionGoal: { value: (x?: string, y?: string) => y ?? x ?? '', default: () => '' },
  isApproved: { value: (x?: boolean, y?: boolean) => y ?? x ?? false, default: () => false },
  finalFindings: { value: (x: any[] = [], y: any[] = []) => y ?? x ?? [], default: () => [] },
  summaryMarkdown: { value: (x?: string, y?: string) => y ?? x ?? '', default: () => '' },
  overallScore: { value: (x?: number, y?: number) => y ?? x ?? 100, default: () => 100 }
};

export function createUXAuditGraph(
  runnerOptions: GraphRunnerOptions,
  client = new GeminiUXAuditClient(),
  retriever = new DesignSystemRAGRetriever()
) {
  const isInteractive = Boolean(runnerOptions.interactive);
  const allViewportsFlag = Boolean(runnerOptions.allViewports);

  // 1. Node 1: Base Capture
  const baseCaptureNode = async (state: UXAuditState): Promise<Partial<UXAuditState>> => {
    console.log(`\n🚀 [Node 1] Capturing Base Viewport: ${state.selectedViewports[0] || 'desktop'} for ${state.route}`);
    const vp = state.selectedViewports[0] || 'desktop';
    const scan = await captureViewport(state.route, vp, runnerOptions.captureOptions);

    const baseSystemMessage = new SystemMessage(BASE_UX_SYSTEM_PROMPT);

    return {
      baseScan: scan,
      messages: [baseSystemMessage]
    };
  };

  // 2. Node 2: Analyze & Ask
  const analyzeAndAskNode = async (state: UXAuditState): Promise<Partial<UXAuditState>> => {
    console.log(`\n🧠 [Node 2] Analyzing Visual Hierarchy & Formulating Hypotheses...`);
    if (!state.baseScan) {
      throw new Error('Base scan missing before Node 2 invocation.');
    }

    const analyzePrompt = buildAnalyzeAndAskPrompt(state.baseScan, state.route);
    const result = await client.analyzeAndAsk(
      BASE_UX_SYSTEM_PROMPT,
      analyzePrompt,
      state.baseScan.screenshotPath
    );

    const questionsSummary = result.hypotheses.map((h, i) => `${i + 1}. ${h.question} (Context: ${h.context})`).join('\n');
    const aiMessage = new AIMessage(
      `Visual Hierarchy: ${result.visualHierarchySummary}\nPrimary Goal: ${result.primaryConversionGoal}\n\nHypotheses & Questions:\n${questionsSummary}`
    );

    return {
      visualHierarchySummary: result.visualHierarchySummary,
      primaryConversionGoal: result.primaryConversionGoal,
      currentHypotheses: result.hypotheses,
      messages: [aiMessage]
    };
  };

  // 3. Node 3: Human Gate
  const humanGateNode = async (state: UXAuditState): Promise<Partial<UXAuditState>> => {
    console.log(`\n⏸️  [Node 3: Human Gate] Refinement Cycle ${state.iterationCount + 1} of ${state.maxIterations}`);

    // Print current hypotheses to user
    console.log('\n--- PROBING QUESTIONS & HYPOTHESES ---');
    state.currentHypotheses.forEach((h, i) => {
      console.log(`[Q${i + 1}] ${h.question}`);
      console.log(`     Context: ${h.context}`);
      console.log(`     Proposed Viewports to Test: ${h.recommendedViewportsToInspect.join(', ')}`);
    });
    console.log('--------------------------------------\n');

    // Auto-approval if max iterations reached
    if (state.iterationCount >= state.maxIterations - 1) {
      console.log('⚠️ Reached maximum refinement cycles. Proceeding to synthesis.');
      return { isApproved: true };
    }

    // Auto-handling if --all-viewports flag is passed and we haven't expanded yet
    if (allViewportsFlag && state.iterationCount === 0) {
      const neededViewports = ['mobile', 'tablet', 'ultrawide'];
      console.log(`🤖 Auto-approving multi-viewport expansion: ${neededViewports.join(', ')}`);
      return {
        isApproved: false,
        selectedViewports: neededViewports
      };
    } else if (allViewportsFlag && state.iterationCount > 0) {
      console.log('🤖 Auto-approving final synthesis.');
      return { isApproved: true };
    }

    // Interactive CLI Prompt
    if (isInteractive) {
      const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
      const answer = await new Promise<string>(resolve => {
        rl.question(
          `Do you want to (1) Approve synthesis, (2) Expand all viewports, or (3) Type feedback? [1/2/3]: `,
          ans => {
            rl.close();
            resolve(ans.trim());
          }
        );
      });

      if (answer === '1' || answer.toLowerCase() === 'approve' || answer.toLowerCase() === 'yes') {
        return { isApproved: true };
      } else if (answer === '2' || answer.toLowerCase() === 'expand') {
        return {
          isApproved: false,
          selectedViewports: ['mobile', 'tablet', 'ultrawide']
        };
      } else {
        const userFeedback = answer;
        const humanMsg = new HumanMessage(`User clarifying feedback: ${userFeedback}`);
        return {
          isApproved: false,
          selectedViewports: ['mobile'],
          messages: [humanMsg]
        };
      }
    }

    // Default non-interactive single-pass approval
    console.log('ℹ️ Running in single-pass default mode. Proceeding to synthesis.');
    return { isApproved: true };
  };

  // 4. Node 4: Refine & Delta Capture
  const refineAndDeltaCaptureNode = async (state: UXAuditState): Promise<Partial<UXAuditState>> => {
    console.log(`\n🔍 [Node 4] Capturing Delta Viewports...`);
    const newScans: Record<string, ViewportScanResult> = {};

    const viewportsToCapture = state.selectedViewports.filter(
      vp => vp !== 'desktop' && !state.expandedScans[vp]
    );

    for (const vp of viewportsToCapture) {
      const scan = await captureViewport(state.route, vp, runnerOptions.captureOptions);
      newScans[vp] = scan;
    }

    const deltaCount = Object.keys(newScans).length;
    const humanMsg = new HumanMessage(`Captured ${deltaCount} expanded viewports for responsive inspection.`);

    return {
      expandedScans: newScans,
      iterationCount: state.iterationCount + 1,
      messages: [humanMsg]
    };
  };

  // 5. Node 5: Synthesis Node
  const synthesisNode = async (state: UXAuditState): Promise<Partial<UXAuditState>> => {
    console.log(`\n✨ [Node 5: Synthesis] Retrieving Design Tokens & Synthesizing Findings...`);

    // Retrieve RAG Context
    const axeViolations = state.baseScan?.axeViolations.map(v => v.id) || [];
    const ragContext = retriever.retrieveContext(axeViolations);

    // Build summary of expanded evidence
    const expandedKeys = Object.keys(state.expandedScans);
    const expandedSummary = expandedKeys.length > 0
      ? expandedKeys.map(k => {
          const scan = state.expandedScans[k];
          return `- Viewport ${k} (${scan.width}x${scan.height}px): Small tap targets=${scan.metrics?.smallTapTargetsCount || 0}, Dimensions=${scan.metrics?.scrollWidth}x${scan.metrics?.scrollHeight}px`;
        }).join('\n')
      : 'No expanded viewports requested; audited based on primary viewport.';

    const synthesisPrompt = buildSynthesisPrompt(ragContext, expandedSummary);
    const conversationHistoryText = state.messages.map(m => `[${m.getType()}]: ${m.content}`).join('\n\n');

    // Collect all screenshot paths
    const screenshotPaths: string[] = [];
    if (state.baseScan?.screenshotPath) screenshotPaths.push(state.baseScan.screenshotPath);
    for (const vp of Object.values(state.expandedScans)) {
      if (vp.screenshotPath) screenshotPaths.push(vp.screenshotPath);
    }

    const result = await client.synthesizeAudit(
      BASE_UX_SYSTEM_PROMPT,
      conversationHistoryText,
      synthesisPrompt,
      screenshotPaths
    );

    return {
      finalFindings: result.findings,
      overallScore: result.overallScore,
      summaryMarkdown: result.summaryMarkdown
    };
  };

  // Build the StateGraph
  const workflow = new StateGraph<UXAuditState>({
    channels: auditStateChannels as any
  })
    .addNode('baseCapture', baseCaptureNode)
    .addNode('analyzeAndAsk', analyzeAndAskNode)
    .addNode('humanGate', humanGateNode)
    .addNode('refineAndDeltaCapture', refineAndDeltaCaptureNode)
    .addNode('synthesis', synthesisNode)
    .addEdge(START, 'baseCapture')
    .addEdge('baseCapture', 'analyzeAndAsk')
    .addEdge('analyzeAndAsk', 'humanGate')
    .addConditionalEdges(
      'humanGate',
      (state: UXAuditState) => (state.isApproved ? 'synthesis' : 'refineAndDeltaCapture'),
      {
        synthesis: 'synthesis',
        refineAndDeltaCapture: 'refineAndDeltaCapture'
      }
    )
    .addEdge('refineAndDeltaCapture', 'analyzeAndAsk')
    .addEdge('synthesis', END);

  const checkpointer = new MemorySaver();
  return workflow.compile({ checkpointer });
}
