import { useParams, useNavigate } from 'react-router-dom';
import { Database, Activity, ArrowLeft, Search } from 'lucide-react';
import { useResearch } from './useResearch';
import { BlogDrafter } from '@/features/lab/BlogDrafter';

export default function ResearchDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getTool } = useResearch();
  
  const tool = id ? getTool(id) : null;

  if (!tool) {
    return (
      <div className="panel h-full overflow-y-auto w-full text-center py-20">
        <div className="flex flex-col gap-8 items-center">
          <Search className="w-12 h-12 opacity-20" />
          <h1 className="font-display font-bold uppercase tracking-tight leading-none text-2xl">Tool Not Found</h1>
          <button onClick={() => navigate('/research')} className="hover:text-accent-brand transition-colors cursor-pointer">
            <span className="font-mono tracking-widest uppercase text-xs">Back to Laboratory</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <section className="panel h-full overflow-y-auto w-full">
      <div className="flex flex-col gap-12">
        <button
          onClick={() => navigate('/research')}
          className="flex items-center gap-2 text-text-dim hover:text-accent-brand transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="font-mono tracking-widest uppercase text-xs font-bold">Back to Lab</span>
        </button>

        <div className="border border-line bg-surface p-8 md:p-12">
          <div className="flex flex-col gap-12">
            {tool.id === 'blog-drafter' ? (
              <BlogDrafter />
            ) : (
              <div className="flex flex-col gap-12">
                <div className="flex flex-col gap-4">
                  <span className="font-mono tracking-widest uppercase text-xs font-bold text-accent-brand tracking-widest">
                    LABORATORY_ACCESS // {tool.category.toUpperCase()}
                  </span>
                  <h1 className="font-display font-bold uppercase tracking-tighter leading-[0.9] text-5xl md:text-7xl">{tool.name}</h1>
                  <div className="border border-line p-4 bg-accent/5 opacity-100">
                    <p className="font-sans leading-relaxed text-text-body text-lg text-text-body">{tool.layman}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div className="flex flex-col gap-4">
                    <span className="font-mono uppercase tracking-widest text-[8px] text-text-dim uppercase tracking-widest">System Status</span>
                    <div className="border border-line p-4 flex items-center gap-3">
                      <Activity className="w-4 h-4 text-accent-brand" />
                      <span className="font-mono tracking-widest uppercase text-xs text-accent-brand font-bold">{tool.status.toUpperCase()}</span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-4">
                    <span className="font-mono uppercase tracking-widest text-[8px] text-text-dim uppercase tracking-widest">Database Source</span>
                    <div className="border border-line p-4 flex items-center gap-3">
                      <Database className="w-4 h-4 text-accent-brand text-dim" />
                      <span className="font-mono tracking-widest uppercase text-xs">WSDC REGISTRY // AUTHENTICATED</span>
                    </div>
                  </div>
                </div>

                {tool.status === 'Coming Soon' && (
                  <div className="border border-dashed border-accent-brand/20 p-8 md:p-12 bg-accent-brand/5">
                    <div className="flex flex-col gap-4 items-center text-center">
                      <Search className="w-8 h-8 text-accent-brand opacity-50" />
                      <div className="flex flex-col gap-2">
                        <span className="font-display font-bold uppercase tracking-tight leading-none text-xl">Work in Progress</span>
                        <p className="font-sans leading-relaxed text-text-body text-sm text-text-dim max-w-md">
                          This specialized module is currently being integrated into the Tech-Dancer platform. We are finalizing the analysis models and UI components.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
