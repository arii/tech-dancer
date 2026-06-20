import { TOOL_ID_DEPLOYMENT_IMPACT_ANALYZER, TOOL_ID_GITOPS_PR_REVIEWER, TOOL_ID_SDLC_PROFILER } from './devai-tool-ids';

export interface DevAIAsset {
  path: string;
  label: string;
  description: string;
  toolId: string;
}

export const DEVAI_ASSETS: DevAIAsset[] = [
  {
    path: 'dev-tools/scope_check.py',
    label: 'Impact Analyzer',
    description: 'Calculates semantic deployment impact of code changes.',
    toolId: TOOL_ID_DEPLOYMENT_IMPACT_ANALYZER
  },
  {
    path: 'dev-tools/workflow_summary.py',
    label: 'SDLC Profiler',
    description: 'Analyzes GitHub Workflow execution metrics.',
    toolId: TOOL_ID_SDLC_PROFILER
  },
  {
    path: 'dev-tools/mergellama.py',
    label: 'PR Auditor',
    description: 'Autonomous LLM-based code review agent.',
    toolId: TOOL_ID_GITOPS_PR_REVIEWER
  },
  {
    path: 'dev-tools/ollama_reviewer.py',
    label: 'Local LLM Reviewer',
    description: 'Local-first model execution for privacy-safe reviews.',
    toolId: TOOL_ID_GITOPS_PR_REVIEWER
  },
  {
    path: 'dev-tools/td_cli.py',
    label: 'CLI Manager',
    description: 'Unified command-line interface for DevAI operations.',
    toolId: TOOL_ID_GITOPS_PR_REVIEWER
  }
];
