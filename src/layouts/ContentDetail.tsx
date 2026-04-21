import { motion } from 'motion/react';
import { ArrowLeft, Clock, Tag, Share2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { ContentItem } from '@/lib/content';

interface ContentDetailProps {
  post: ContentItem;
  onBack: () => void;
  backLabel: string;
  children?: React.ReactNode;
}

export function ContentDetail({ post, onBack, backLabel, children }: ContentDetailProps) {
  const title = post.title;
  const content = post.content;

  const date = 'date' in post ? post.date : '';
  const category = 'category' in post ? post.category : '';
  const image = 'image' in post ? post.image : undefined;
  const author = 'author' in post ? post.author : 'Ariel';

  return (
    <article className="panel h-full overflow-y-auto w-full">
      <div className="flex flex-col gap-12 max-w-5xl mx-auto w-full">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-text-dim hover:text-accent-brand transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="font-mono tracking-widest uppercase text-xs font-bold">{backLabel}</span>
        </button>

        <div className="flex flex-col gap-8">
          <div className="flex items-center gap-4">
            {category && (
              <div className="flex items-center gap-2 text-accent-brand">
                <Tag className="w-3 h-3" />
                <span className="font-mono uppercase tracking-widest text-[8px] font-bold">{category}</span>
              </div>
            )}
            {date && (
              <div className="flex items-center gap-2 text-text-dim">
                <Clock className="w-3 h-3" />
                <span className="font-mono uppercase tracking-widest text-[8px]">{date}</span>
              </div>
            )}
          </div>

          <h1 className="font-display font-bold uppercase tracking-tighter leading-none text-5xl md:text-7xl">
            {title}
          </h1>

          {image && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="aspect-video overflow-hidden border border-line bg-muted"
            >
              <img
                src={image}
                alt={title}
                className="w-full h-full object-cover"
              />
            </motion.div>
          )}

          {children}

          <div className="prose prose-sm md:prose-base prose-slate max-w-none w-full overflow-hidden break-words prose-headings:font-display prose-p:font-sans prose-p:text-text-dim prose-strong:text-text-main">
            <ReactMarkdown
              components={{
                a: ({node, ...props}) => <a {...props} rel="noopener noreferrer" target="_blank" />
              }}
            >
              {content}
            </ReactMarkdown>
          </div>

          <div className="border-t border-line pt-12 flex justify-between items-center">
            <div className="flex flex-col gap-2">
              <span className="font-mono uppercase tracking-widest text-[8px] text-text-dim">PUBLISHED BY</span>
              <span className="font-mono tracking-widest uppercase text-xs font-bold">{author}</span>
            </div>
            <button className="flex items-center gap-2 text-text-dim hover:text-accent-brand transition-colors">
              <Share2 className="w-4 h-4" />
              <span className="font-mono tracking-widest uppercase text-xs">Share Content</span>
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
