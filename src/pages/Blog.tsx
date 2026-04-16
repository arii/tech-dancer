/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { Calendar, Clock, User, ArrowLeft, Share2, Bookmark } from 'lucide-react';
import { useState, useEffect } from 'react';
import Markdown from 'react-markdown';
import { getAllContent, ContentItem } from '../lib/content';

export default function Blog() {
  const [selectedPost, setSelectedPost] = useState<ContentItem | null>(null);
  const [posts, setPosts] = useState<ContentItem[]>([]);

  useEffect(() => {
    const loadedPosts = getAllContent('posts');
    setPosts(loadedPosts);
  }, []);

  if (selectedPost) {
    return (
      <section className="panel h-full overflow-y-auto">
        <button 
          onClick={() => setSelectedPost(null)}
          className="flex items-center gap-2 text-accent font-bold uppercase tracking-widest text-xs mb-8 hover:-translate-x-1 transition-transform"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Blog
        </button>

        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center gap-6 mb-12">
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-accent border border-accent/20 px-3 py-1 w-fit">
              {selectedPost.category}
            </span>
            <div className="flex items-center gap-2 text-text-dim text-[10px] font-mono uppercase tracking-widest font-bold">
              <Calendar className="w-3 h-3" />
              {selectedPost.date}
            </div>
            <div className="hidden md:block w-px h-4 bg-line"></div>
            <div className="text-[10px] text-text-dim font-mono uppercase tracking-widest font-bold">
              LOG_REF: {selectedPost.slug.substring(0, 8).toUpperCase()}
            </div>
          </div>

          <h1 className="text-4xl md:text-7xl font-display font-bold text-text-main mb-12 leading-[0.9] uppercase tracking-tighter">
            {selectedPost.title}
          </h1>

          <div className="flex items-center justify-between border-y border-line py-8 mb-16">
            <div className="flex items-center gap-6">
              <div className="w-[60px] h-[60px] border border-line overflow-hidden bg-line">
                <img src="https://picsum.photos/seed/ariel/120/120" alt="Author" className="w-full h-full object-cover grayscale" />
              </div>
              <div className="space-y-1">
                <div className="text-[11px] font-mono font-bold uppercase tracking-widest text-text-main">{selectedPost.author}</div>
                <div className="text-[9px] text-accent uppercase tracking-[0.2em] font-bold">MIT ROBOTICIST // WCS</div>
              </div>
            </div>
            <div className="flex gap-4">
              <button className="p-3 border border-line hover:bg-line transition-colors text-text-dim">
                <Share2 className="w-4 h-4" />
              </button>
              <button className="p-3 border border-line hover:bg-line transition-colors text-text-dim">
                <Bookmark className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="aspect-[21/9] border border-line overflow-hidden mb-16 shadow-2xl">
            <img src={selectedPost.image} alt={selectedPost.title} className="w-full h-full object-cover grayscale" referrerPolicy="no-referrer" />
          </div>

          <div className="markdown-body prose prose-lg max-w-none text-text-body font-sans leading-relaxed space-y-8">
            <Markdown>{selectedPost.content}</Markdown>
          </div>
          
          <div className="mt-24 pt-16 border-t border-line">
            <h4 className="text-[10px] font-mono font-bold text-accent uppercase tracking-[4px] mb-12">// RELATED_FILES</h4>
            <div className="grid md:grid-cols-2 gap-0 border border-line bg-line">
              {posts.filter(p => p.slug !== selectedPost.slug).map(post => (
                <div 
                  key={post.slug} 
                  onClick={() => {
                    setSelectedPost(post);
                    window.scrollTo(0,0);
                  }}
                  className="bg-bg p-8 hover:bg-card-bg transition-colors cursor-pointer group border-r md:last:border-r-0 border-line"
                >
                  <h5 className="text-xl font-display font-bold text-text-main group-hover:text-accent transition-colors mb-4 uppercase leading-none">
                    {post.title}
                  </h5>
                  <p className="text-xs text-text-body/70 line-clamp-2 font-sans">{post.excerpt}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="panel h-full overflow-y-auto">
      <div className="space-y-8 mb-16 px-4 md:px-0">
        <h1 className="font-display uppercase text-5xl md:text-8xl leading-[1.0] text-text-main font-bold tracking-tighter">
          The Blog.
        </h1>
        <p className="text-lg md:text-xl leading-[1.6] text-text-body max-w-2xl font-sans">
          Deep dives into the intersection of robotics, dance, and lifestyle optimization.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-1 border-t border-line bg-line max-w-5xl">
        {posts.map((post, index) => (
          <motion.div
            key={post.slug}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.05 }}
            onClick={() => setSelectedPost(post)}
            className="bg-bg p-8 md:p-12 group cursor-pointer hover:bg-card-bg transition-all flex flex-col md:flex-row gap-12 border-x border-b border-line"
          >
            <div className="w-full md:w-2/5 aspect-video md:aspect-square overflow-hidden shrink-0 border border-line">
              <img 
                src={post.image} 
                alt={post.title} 
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="flex flex-col justify-center space-y-6">
              <div className="flex items-center gap-4">
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-accent border border-accent/30 px-2 py-0.5">
                  {post.category}
                </span>
                <span className="text-[10px] text-text-dim font-mono uppercase tracking-widest flex items-center gap-1">
                  <Calendar className="w-3 h-3" /> {post.date}
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-text-main group-hover:text-accent transition-colors leading-none uppercase">
                {post.title}
              </h2>
              <p className="text-[15px] text-text-body leading-relaxed line-clamp-3 font-sans">
                {post.excerpt}
              </p>
              <div className="flex items-center gap-2 text-[10px] font-mono font-bold uppercase tracking-[2px] text-accent pt-2 group-hover:translate-x-1 transition-transform">
                Read Full Entry <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function ArrowRight({ className }: { className?: string }) {
  return (
    <svg 
      className={className} 
      fill="none" 
      stroke="currentColor" 
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
    </svg>
  );
}
