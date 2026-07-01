import { LucideIcon, Cpu, Activity, Globe, Search } from 'lucide-react';
import { ResearchTool } from '@/config/research-tools';

export const STACK_CATEGORIES = [
  { label: 'Stack', tags: ['React', 'Vite', 'TypeScript', 'Python'], colorClass: 'bg-brand-purple/10 text-brand-purple border border-brand-purple/20' },
  { label: 'Infra', tags: ['GitHub Actions', 'Vercel', 'Playwright'], colorClass: 'bg-brand-green/10 text-brand-green border border-brand-green/20' },
  { label: 'Robotics', tags: ['ROS1/2', 'C++', 'Navigation', 'Localization'], colorClass: 'bg-brand-cyan/10 text-brand-cyan border border-brand-cyan/20' },
  { label: 'AI', tags: ['LLM Workflows', 'Agentic CI/CD'], colorClass: 'bg-brand-amber/10 text-brand-amber border border-brand-amber/20' },
];

export function getToolIcon(tool: ResearchTool): LucideIcon {
  if (tool.category.includes('DevAI')) return Cpu;
  if (tool.id.includes('scraper') || tool.id.includes('pipeline')) return Activity;
  if (tool.id.includes('hrm')) return Globe;
  return Search;
}
