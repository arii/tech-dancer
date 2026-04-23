import { NavLink } from 'react-router-dom';
import { Text } from '@/layouts/Primitives';
import { Resource } from '@/lib/content';

interface GearCardProps extends Resource {
  basePath: string;
}

export function GearCard({
  slug,
  title,
  category,
  excerpt,
  image,
  basePath,
  rating,
  verdict,
  priceCategory,
  updatedDate
}: GearCardProps) {
  return (
    <NavLink
      to={`${basePath}/${slug}`}
      className="group flex flex-col bg-surface rounded-2xl border border-line shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
    >
      {/* Image Wrapper */}
      <div className="aspect-square md:aspect-video relative overflow-hidden bg-bg">
        {image ? (
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center opacity-10 bg-accent-navy text-accent-navy">
             <span className="font-display font-bold uppercase tracking-tight leading-none text-3xl">TD</span>
          </div>
        )}
        <div className="absolute top-4 left-4">
          <div className="bg-surface/90 backdrop-blur px-3 py-1 rounded-full border border-line">
            <Text variant="mono" size="micro" weight="font-bold" className="text-accent-navy uppercase">
              {category}
            </Text>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex flex-col gap-4 p-6 flex-1">
        <div className="flex flex-col gap-2">
          {rating && (
            <div className="flex items-center gap-1 mb-1">
              <span className="text-yellow-400">
                {'★'.repeat(Math.floor(rating))}
                {rating % 1 !== 0 ? '½' : ''}
              </span>
              <span className="text-[8px] text-text-dim font-medium">
                ({rating}/5)
              </span>
            </div>
          )}

          <h3 className="font-display font-bold uppercase tracking-tight leading-tight text-xl text-accent-navy group-hover:text-accent transition-colors">
            {title}
          </h3>

          <p className="font-sans leading-relaxed text-text-body text-sm line-clamp-2">
             {excerpt}
          </p>

          {(verdict || priceCategory || updatedDate) && (
            <div className="flex flex-wrap items-center gap-3 mt-2">
               {verdict && (
                 <div className="bg-accent/10 px-2 py-0.5 rounded-md">
                   <span className="text-[8px] font-mono uppercase text-accent font-bold">{verdict}</span>
                 </div>
               )}
               {priceCategory && (
                 <span className="text-[8px] font-mono uppercase text-text-dim font-bold">{priceCategory}</span>
               )}
               {updatedDate && (
                 <span className="text-[8px] font-mono uppercase text-text-dim">Updated {updatedDate}</span>
               )}
            </div>
          )}
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-line/50 mt-auto">
          <span className="font-mono tracking-wider uppercase text-accent font-bold text-xs">
            Read Review
          </span>
          <div className="group-hover:translate-x-1 transition-transform duration-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-accent"
            >
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </div>
        </div>
      </div>
    </NavLink>
  );
}
