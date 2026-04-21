import { useNavigate } from 'react-router-dom';
import { FileText, Search, ArrowRight } from 'lucide-react';
import { PageHeader } from '@/components/ui/PageHeader';
import { useResearch } from './useResearch';

export default function ResearchAnalytics() {
  const navigate = useNavigate();
  const { studies, tools } = useResearch();

  return (
    <section>
      <div className="flex flex-col gap-12">
        <PageHeader 
          label="TECHNICAL PORTFOLIO"
          title="Data & Development Lab"
          description="Sophisticated pages for interactive data science, software development, and specialized tools to optimize the WCS lifestyle."
        />

        <div className="flex flex-col gap-8">
          <div className="pb-4 flex justify-between items-end border-b border-slate-200">
            <span className="font-display font-bold uppercase tracking-tight leading-none text-2xl font-black text-accent-navy">Tools Ecosystem</span>
            <span className="font-mono tracking-[0.15em] text-xs text-text-dim font-semibold uppercase">{tools.length} TOOLS</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tools.map((tool) => (
              <button
                key={tool.id}
                onClick={() => navigate(`/research/${tool.id}`)}
                className="group hover:border-accent-brand transition-all text-left bg-surface border border-line p-8 md:p-12 cursor-pointer"
              >
                <div className="flex flex-col gap-6 h-full justify-between">
                  <div className="flex flex-col gap-4">
                    <div className="flex justify-between items-start">
                      <div className="w-10 h-10 bg-muted border border-line flex items-center justify-center text-text-dim group-hover:text-accent-brand transition-colors">
                        <Search className="w-5 h-5" />
                      </div>
                      <span className="font-mono uppercase tracking-widest text-[8px] text-accent-brand font-bold">{tool.status.toUpperCase()}</span>
                    </div>
                    <div className="flex flex-col gap-2">
                      <span className="font-display font-bold uppercase tracking-tight leading-none text-xl group-hover:text-accent-brand transition-colors">{tool.name}</span>
                      <p className="font-sans leading-relaxed text-text-body text-sm text-text-dim line-clamp-2">{tool.layman}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-text-dim group-hover:text-accent-brand transition-colors">
                    <span className="font-mono uppercase tracking-widest text-[8px] font-bold">Launch Console</span>
                    <ArrowRight className="w-3 h-3" />
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-8">
          <div className="pb-4 flex justify-between items-end border-b border-slate-200">
            <span className="font-display font-bold uppercase tracking-tight leading-none text-2xl font-black text-accent-navy">Studies</span>
            <span className="font-mono tracking-[0.15em] text-xs text-text-dim font-semibold uppercase">{studies.length} ARTICLES</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {studies.map((study) => (
              <div key={study.slug} className="group">
                <div className="flex flex-col gap-4">
                  <div className="flex justify-between items-center">
                    <span className="font-mono uppercase tracking-widest text-[8px] text-accent-brand uppercase">{study.category}</span>
                    <span className="font-mono uppercase tracking-widest text-[8px] text-text-dim">{study.date}</span>
                  </div>
                  <span className="font-display font-bold uppercase tracking-tight leading-none text-2xl group-hover:text-accent-brand transition-colors">
                    {study.title}
                  </span>
                  <p className="font-sans leading-relaxed text-text-body text-sm text-text-dim line-clamp-3">
                    {study.excerpt}
                  </p>
                  <div
                    className="flex items-center gap-2 text-text-dim group-hover:text-accent-brand transition-colors hover:translate-x-1 transition-transform"
                  >
                    <span className="font-mono tracking-widest uppercase text-xs font-bold">Read Study</span>
                    <FileText className="w-4 h-4" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
