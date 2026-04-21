import { NavLink } from 'react-router-dom';

interface ContentCardProps {
  slug: string;
  title: string;
  category: string;
  excerpt?: string;
  date?: string;
  image?: string;
  basePath: string;
  aspect?: "square" | "video";
}

export function ContentCardSkeleton() {
  return (
    <div className="flex flex-col h-full bg-surface border border-line shadow-sm rounded-lg overflow-hidden animate-pulse">
      <div className="relative aspect-video bg-line/50" />
      <div className="p-6 lg:p-8 flex-1 flex flex-col justify-between gap-5">
        <div className="flex flex-col gap-4">
          <div className="h-4 w-24 bg-line/50 rounded" />
          <div className="h-8 w-3/4 bg-line/50 rounded" />
          <div className="flex flex-col gap-2">
            <div className="h-4 w-full bg-line/50 rounded" />
            <div className="h-4 w-5/6 bg-line/50 rounded" />
          </div>
        </div>
        <div className="h-4 w-20 bg-line/50 rounded mt-auto" />
      </div>
    </div>
  );
}

export function ContentCard({ slug, title, category, excerpt, date, image, basePath }: ContentCardProps) {
  return (
    <NavLink
      to={`${basePath}/${slug}`}
      className="group cursor-pointer flex flex-col h-full bg-surface border border-line hover:border-accent transition-all duration-300 rounded-none overflow-hidden"
    >
      {/* Visual Thumbnail */}
      <div className="relative aspect-video overflow-hidden bg-bg">
        {image ? (
          <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center opacity-10 bg-accent-navy">
             <span className="font-display font-bold uppercase tracking-tight leading-none text-3xl">TD</span>
          </div>
        )}
        <div className="absolute top-4 left-4">
          <div className="px-3 py-1 bg-surface/90 backdrop-blur-sm border border-line rounded-[2px]">
            <span className="font-mono tracking-widest uppercase text-[8px] font-bold text-accent-navy uppercase tracking-wider">
              {category}
            </span>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-6 lg:p-8 flex-1 flex flex-col justify-between gap-5">
        <div className="flex flex-col gap-4">
          <span className="font-mono tracking-[0.15em] text-xs text-text-dim uppercase">
            {date}
          </span>
          <span
            className="font-display font-bold uppercase tracking-tight leading-snug text-xl text-accent-navy leading-snug group-hover:text-accent transition-colors font-black"
          >
            {title}
          </span>
          <p className="font-sans leading-relaxed text-text-body text-base text-text-dim line-clamp-2 leading-relaxed">
             {excerpt || `Discover the technical intersections of robotics and dance in this deep dive into ${category.toLowerCase()} methodology and engineering principles.`}
          </p>
        </div>

        <div className="flex items-center gap-2 pt-6 border-t border-slate-100 mt-auto">
          <span className="font-mono tracking-[0.15em] text-xs text-accent font-semibold uppercase">
            Read More
          </span>
          <div className="w-0 h-[1.5px] bg-accent group-hover:w-8 transition-all duration-500" />
        </div>
      </div>
    </NavLink>
  );
}
