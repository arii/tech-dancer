import { Cpu, ShieldAlert } from 'lucide-react';
import { TOOL_ID_GITOPS_PR_REVIEWER } from '@/config/devai-tool-ids';
import { ResearchToolShell } from '@/components/research/ResearchToolShell';

export function GitOpsReviewerTool() {
  const features = [
    {
      icon: ShieldAlert,
      title: "Safety Scorecards",
      description: "Runs autonomous static analysis on incoming pull requests. Generates structural code safety scorecards, ensuring new features adhere to the repository's strict design-token and styling rules."
    },
    {
      icon: Cpu,
      title: "Model Agnostic",
      description: "Built on a flexible orchestration layer supporting both high-performance cloud LLMs (Gemini) and local privacy-first models (Ollama/Llama)."
    }
  ];

  return (
    <ResearchToolShell
      title="Automating the Outer Loop"
      description="To maintain architectural consistency and prevent regression at scale, I built and integrated deterministic GitOps agents directly into the code review lifecycle."
      toolId={TOOL_ID_GITOPS_PR_REVIEWER}
      features={features}
    />
  );
}
