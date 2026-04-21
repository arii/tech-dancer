import { motion } from 'motion/react';
import { NavLink } from 'react-router-dom';

interface HeroPathCardProps {
  label: string;
  title: string;
  paths: { label: string; path: string }[];
  tag: string;
  image: string;
  span?: number;
  icon: any;
}

export function HeroPathCard({ title, paths, tag, span = 1, icon: Icon }: HeroPathCardProps) {
  return (
    <motion.div
      className={`col-span-1 lg:col-span-${span} relative overflow-hidden p-8 group bg-surface border border-slate-200 hover:border-accent transition-all duration-500 rounded-none`}
    >
      <div className="flex flex-col gap-10 h-full justify-between relative z-10">
        <div className="flex flex-col gap-8">
          <div className="flex items-center gap-3">
            <Icon className="w-5 h-5 text-accent" />
            <span className="font-mono tracking-[0.15em] text-xs text-text-dim font-semibold uppercase">
              {tag.split(' // ')[0]}
            </span>
          </div>
          
          <div className="flex flex-col gap-6">
            <span
              className="font-display font-bold uppercase tracking-tight leading-tight text-4xl font-black text-accent-navy transition-colors"
            >
              {title}
            </span>
            
            <div className={`grid grid-cols-1 ${span > 2 ? 'sm:grid-cols-3' : 'sm:grid-cols-1'} gap-3 max-w-4xl`}>
              {paths.map(item => (
                <NavLink
                  key={item.label}
                  to={item.path}
                  className="flex items-center gap-4 bg-bg/50 hover:bg-accent/5 border border-slate-200 hover:border-accent rounded-[2px] transition-all group/link px-5 py-4"
                >
                  <div className="w-2 h-2 bg-accent/20 group-hover/link:bg-accent rounded-[2px] transition-colors flex-shrink-0" />
                  <span className="font-sans leading-relaxed text-text-body text-base font-bold text-text-main group-hover/link:text-accent">
                    {item.label}
                  </span>
                </NavLink>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center pt-8 border-t border-slate-200">
          <span className="font-mono tracking-[0.15em] text-xs text-text-dim font-semibold uppercase">
            {tag}
          </span>
          <div className="w-8 h-[2px] bg-accent/20 group-hover:w-16 group-hover:bg-accent transition-all duration-500 rounded-[2px]" />
        </div>
      </div>
    </motion.div>
  );
}
