import { TOOL_ID_DEPLOYMENT_IMPACT_ANALYZER, TOOL_ID_GITOPS_PR_REVIEWER, TOOL_ID_SDLC_PROFILER } from './devai-tool-ids';

export interface DevAIAsset {
  path: string;
  label: string;
  description: string;
  toolId: string;
}

export const DEVAI_ASSETS: DevAIAsset[] = [
  {
    path: 'boomtick-pkg/cli/dev_tools/scope_check.py',
    label: 'Impact Analyzer',
    description: 'Calculates semantic blast radius of code changes.',
    toolId: TOOL_ID_DEPLOYMENT_IMPACT_ANALYZER
  },
  {
    path: 'boomtick-pkg/cli/dev_tools/workflow_summary.py',
    label: 'SDLC Profiler',
    description: 'Analyzes GitHub Workflow execution metrics.',
    toolId: TOOL_ID_SDLC_PROFILER
  },
  {
    path: 'td',
    label: 'CLI Manager',
    description: 'Unified command-line interface for DevAI operations.',
    toolId: TOOL_ID_GITOPS_PR_REVIEWER
  }
];
