/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { Calendar, Clock, User, ArrowLeft, Share2, Bookmark } from 'lucide-react';
import { useState } from 'react';

interface Post {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  readTime: string;
  author: string;
  category: string;
  image: string;
}

export default function Blog() {
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const posts: Post[] = [
    {
      id: 'physics-of-pivot',
      title: 'The Physics of the Pivot: Why Your Choice of Suede Matters',
      excerpt: 'An engineering deep-dive into friction coefficients and how they impact your double-spins on different ballroom floors.',
      content: `
        <p>It’s 2:00 AM. The floor at the Hyatt Regency is "fast"—too fast. You go for a double-spin and find yourself over-rotating because your shoes have zero grip. Or worse, the floor is "sticky," and you feel that dreaded tweak in your knee as your foot stays planted while your body rotates.</p>
        
        <p>As a roboticist, I think about friction (μ) constantly. In robotics, we need predictable friction for mobile manipulators to move safely. In West Coast Swing, we need that same predictability to dance safely and expressively.</p>
        
        <h3>The Coefficient of Friction (μ)</h3>
        <p>Friction is the force resisting the relative motion of solid surfaces. In dance, we care about two types:</p>
        <ul>
          <li><strong>Static Friction:</strong> What keeps you from sliding when you're anchored.</li>
          <li><strong>Kinetic Friction:</strong> What allows you to glide during a triple step or pivot.</li>
        </ul>
        
        <p>Most WCS dancers prefer a μ that is low enough to spin but high enough to stop on a dime. This is why we use suede. Suede is a "fibrous" material that creates a variable contact patch. When you press down hard, the fibers compress and increase friction. When you lighten your weight, the fibers "loft" and allow for a smooth glide.</p>
        
        <h3>The "Bougie on a Budget" Solution</h3>
        <p>You don't need $200 custom dance shoes to get the perfect pivot. In my "Gear Reviews" section, I talk about how I suede my own sneakers for $15. By choosing the right thickness of adhesive-backed suede, you can tune your shoes to your specific weight and dance style.</p>
        
        <h3>Conclusion</h3>
        <p>Next time you're struggling with your spins, don't just blame your technique. Check your friction coefficient. A simple brush of your suede or a change in material might be the "system update" your dance needs.</p>
      `,
      date: 'April 15, 2026',
      readTime: '5 min read',
      author: 'Ariel Anders, PhD',
      category: 'Engineering',
      image: 'https://picsum.photos/seed/dance-physics/1200/600'
    },
    {
      id: 'travel-hacking-2026',
      title: 'Travel Hacking the 2026 Circuit: Points vs. Cash',
      excerpt: 'How I optimized my flight path for the upcoming season using a greedy algorithm and 200k Marriott points.',
      content: '<p>Content coming soon...</p>',
      date: 'April 10, 2026',
      readTime: '8 min read',
      author: 'Ariel Anders, PhD',
      category: 'Travel',
      image: 'https://picsum.photos/seed/travel-points/1200/600'
    }
  ];

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
          <div className="flex items-center gap-4 mb-6">
            <span className="text-xs font-bold uppercase tracking-widest text-accent bg-accent/10 px-3 py-1 rounded-full">
              {selectedPost.category}
            </span>
            <div className="flex items-center gap-2 text-text-dim text-xs font-medium">
              <Calendar className="w-3 h-3" />
              {selectedPost.date}
            </div>
            <div className="flex items-center gap-2 text-text-dim text-xs font-medium">
              <Clock className="w-3 h-3" />
              {selectedPost.readTime}
            </div>
          </div>

          <h1 className="text-4xl md:text-6xl font-serif font-bold text-text-main mb-8 leading-tight">
            {selectedPost.title}
          </h1>

          <div className="flex items-center justify-between border-y border-line py-6 mb-12">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-line overflow-hidden">
                <img src="https://picsum.photos/seed/ariel/100/100" alt="Author" className="w-full h-full object-cover" />
              </div>
              <div>
                <div className="text-sm font-bold text-text-main">{selectedPost.author}</div>
                <div className="text-xs text-text-dim uppercase tracking-widest">MIT Roboticist // WCS Tech-Dancer</div>
              </div>
            </div>
            <div className="flex gap-4">
              <button className="p-2 rounded-full border border-line hover:bg-line transition-colors text-text-dim">
                <Share2 className="w-4 h-4" />
              </button>
              <button className="p-2 rounded-full border border-line hover:bg-line transition-colors text-text-dim">
                <Bookmark className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="aspect-video rounded-2xl overflow-hidden mb-12 shadow-xl">
            <img src={selectedPost.image} alt={selectedPost.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
          </div>

          <div 
            className="prose prose-lg max-w-none text-text-body leading-relaxed space-y-6"
            dangerouslySetInnerHTML={{ __html: selectedPost.content }}
          />
          
          <div className="mt-16 pt-12 border-t border-line">
            <h4 className="text-xl font-serif font-bold text-text-main mb-6">Continue Reading</h4>
            <div className="grid md:grid-cols-2 gap-8">
              {posts.filter(p => p.id !== selectedPost.id).map(post => (
                <div 
                  key={post.id} 
                  onClick={() => {
                    setSelectedPost(post);
                    window.scrollTo(0,0);
                  }}
                  className="content-card group cursor-pointer hover:border-accent transition-colors"
                >
                  <h5 className="text-lg font-serif font-bold text-text-main group-hover:text-accent transition-colors mb-2">
                    {post.title}
                  </h5>
                  <p className="text-sm text-text-body line-clamp-2">{post.excerpt}</p>
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
      <div className="space-y-8 mb-16">
        <h1 className="font-serif italic text-5xl md:text-7xl leading-[1.1] text-text-main font-bold">
          The Blog.
        </h1>
        <p className="text-lg md:text-xl leading-[1.6] text-text-body max-w-2xl">
          Deep dives into the intersection of robotics, dance, and lifestyle optimization.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-12 max-w-5xl">
        {posts.map((post, index) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => setSelectedPost(post)}
            className="content-card group cursor-pointer hover:border-accent transition-all flex flex-col md:flex-row gap-8"
          >
            <div className="w-full md:w-2/5 aspect-video md:aspect-square rounded-lg overflow-hidden shrink-0">
              <img 
                src={post.image} 
                alt={post.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="flex flex-col justify-center space-y-4">
              <div className="flex items-center gap-4">
                <span className="text-[10px] font-bold uppercase tracking-widest text-accent bg-accent/10 px-2 py-1 rounded">
                  {post.category}
                </span>
                <span className="text-[10px] text-text-dim font-medium flex items-center gap-1">
                  <Calendar className="w-3 h-3" /> {post.date}
                </span>
              </div>
              <h2 className="text-2xl md:text-3xl font-serif font-bold text-text-main group-hover:text-accent transition-colors leading-tight">
                {post.title}
              </h2>
              <p className="text-[15px] text-text-body leading-relaxed line-clamp-3">
                {post.excerpt}
              </p>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-accent pt-2 group-hover:translate-x-1 transition-transform">
                Read Full Post <ArrowRight className="w-4 h-4" />
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
