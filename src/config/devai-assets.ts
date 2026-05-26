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
    toolId: 'scope-blast-radius'
  },
  {
    path: 'dev-tools/workflow_summary.py',
    label: 'SDLC Profiler',
    description: 'Analyzes GitHub Workflow execution metrics.',
    toolId: 'scope-blast-radius'
  },
  {
    path: 'dev-tools/mergellama.py',
    label: 'PR Auditor',
    description: 'Autonomous LLM-based code review agent.',
    toolId: 'gitops-pr-reviewer'
  },
  {
    path: 'dev-tools/ollama_reviewer.py',
    label: 'Local LLM Reviewer',
    description: 'Local-first model execution for privacy-safe reviews.',
    toolId: 'gitops-pr-reviewer'
  },
  {
    path: 'dev-tools/td_cli.py',
    label: 'CLI Manager',
    description: 'Unified command-line interface for DevAI operations.',
    toolId: 'gitops-pr-reviewer'
  }
];
