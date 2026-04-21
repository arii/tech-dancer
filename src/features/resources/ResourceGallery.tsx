import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, ArrowRight, Database, Plane, Scissors, Calendar, ArrowLeft, Activity, Shield } from 'lucide-react';
import Markdown from 'react-markdown';
import { Resource } from '@/lib/content';
import { useResources } from './useResources';

export default function ResourceGallery() {
  const { resources, selectedResource, handleSelect, handleClear } = useResources();

  return (
    <section className="panel h-full overflow-y-auto w-full">
      <AnimatePresence mode="wait">
        {selectedResource ? (
          <ResourceDetails 
            key="details" 
            resource={selectedResource} 
            onBack={handleClear} 
          />
        ) : (
          <ResourceList 
            key="list" 
            resources={resources} 
            onSelect={handleSelect} 
          />
        )}
      </AnimatePresence>
    </section>
  );
}

function ResourceDetails({ resource, onBack }: { resource: Resource; onBack: () => void }) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-accent-brand mb-12 cursor-pointer hover:-translate-x-1 transition-transform"
      >
        <ArrowLeft className="w-4 h-4" />
        <span className="font-mono uppercase tracking-widest text-[8px] font-bold">Back to Reviews</span>
      </button>

      <div className="flex flex-col gap-16 max-w-4xl mx-auto">
        <div className="flex flex-col gap-6">
          <div className="flex justify-between items-center border-b border-line pb-4">
            <span className="font-mono tracking-widest uppercase text-xs font-bold">ITEM: {resource.slug.toUpperCase()}</span>
            <div className="flex flex-row items-center gap-3">
              <Calendar className="w-3 h-3 text-text-dim" />
              <span className="font-mono uppercase tracking-widest text-[8px] text-text-dim">{resource.date}</span>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <span className="font-mono tracking-widest uppercase text-xs text-accent-brand font-bold uppercase">{resource.category}</span>
            <h1 className="font-display font-bold uppercase tracking-tight leading-none text-6xl md:text-8xl">{resource.title}</h1>
          </div>
        </div>

        <div className="markdown-body prose prose-sm md:prose-base prose-invert max-w-none w-full overflow-hidden break-words text-text-body space-y-6">
          <Markdown>{resource.content}</Markdown>
        </div>
      </div>
    </motion.div>
  );
}

function ResourceList({ resources, onSelect }: { resources: Resource[]; onSelect: (resource: Resource) => void }) {
  const getIcon = (category: string) => {
    switch (category) {
      case 'Travel': return Plane;
      case 'Systems': return Database;
      case 'Gear': return Scissors;
      case 'Recovery': return Activity;
      case 'Focus': return Shield;
      default: return BookOpen;
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="flex flex-col gap-12 mb-24">
        <div className="flex flex-col gap-4">
          <h1 className="font-display font-bold uppercase tracking-tighter leading-[0.9] text-7xl md:text-9xl">Reviews.</h1>
          <p className="font-sans leading-relaxed text-text-body text-xl max-w-2xl text-text-body">
            Shoes, floor conditions, and equipment. Curated assessments for WCS Events.
          </p>
        </div>
        
        <div className="border border-line bg-surface overflow-hidden">
          <div className="aspect-video relative overflow-hidden bg-muted">
            <div className="absolute inset-0 flex items-center justify-center">
               <Scissors className="w-24 h-24 text-line stroke-[0.5]" />
            </div>
          </div>
          <div className="p-8 flex flex-col gap-4">
            <h2 className="font-display font-bold uppercase tracking-tight leading-none text-4xl">Verified Equipment.</h2>
            <p className="font-sans leading-relaxed text-text-body text-lg text-text-dim max-w-3xl">
              I test equipment on different floor types and competition environments to find what actually works for social dancers and competitors.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 border-line bg-line">
        {resources.map((resource, i) => {
          const Icon = getIcon(resource.category);
          const isWide = i % 2 === 0;
          return (
            <motion.div
              key={resource.slug}
              className={`col-span-1 md:col-span-${isWide ? 7 : 5} group hover:bg-surface transition-colors bg-surface p-8 border border-line cursor-pointer`}
              whileHover={{ x: 2, scale: 1.002 }}
              onClick={() => onSelect(resource)}
            >
              <div className="flex flex-col gap-12 h-full">
                <div className="flex justify-between items-start">
                  <Icon className="w-8 h-8 stroke-1 text-accent-brand group-hover:scale-110 transition-transform" />
                  <span className="font-mono uppercase tracking-widest text-[8px] text-text-dim">REVIEW</span>
                </div>
                <div className="flex flex-col gap-6">
                  <div className="flex flex-row items-center gap-3">
                    <span className="font-mono tracking-widest uppercase text-xs text-accent-brand font-bold">{resource.category}</span>
                    <div className="border border-accent-brand/30 px-2 py-0.5">
                      <span className="font-mono tracking-widest uppercase text-xs text-accent-brand font-bold text-[8px]">REVIEW</span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <span className="font-display font-bold uppercase tracking-tight leading-none text-2xl group-hover:text-accent-brand transition-colors">
                      {resource.title}
                    </span>
                    <p className="font-sans leading-relaxed text-text-body text-sm text-text-dim line-clamp-3">
                      {resource.excerpt}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 mt-auto text-text-dim group-hover:text-accent-brand transition-colors">
                  <span className="font-mono tracking-widest uppercase text-xs font-bold">Read Review</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
