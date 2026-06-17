import { TOOL_ID_SCOPE_BLAST_RADIUS, TOOL_ID_GITOPS_PR_REVIEWER } from './devai-tool-ids';

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
    description: 'Calculates semantic blast radius of code changes.',
    toolId: TOOL_ID_SCOPE_BLAST_RADIUS
  },
  {
    path: 'dev-tools/workflow_summary.py',
    label: 'SDLC Profiler',
    description: 'Analyzes GitHub Workflow execution metrics.',
    toolId: TOOL_ID_SCOPE_BLAST_RADIUS
  },
  {
    path: 'dev-tools/td_cli.py',
    label: 'CLI Manager',
    description: 'Unified command-line interface for DevAI operations.',
    toolId: TOOL_ID_GITOPS_PR_REVIEWER
  }
];
