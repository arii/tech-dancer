import { NavLink } from 'react-router-dom';
import { Box, Stack, Text } from '@/layouts/Primitives';
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
      className="group flex flex-col transition-all duration-500"
    >
      {/* Image Wrapper - Grayscale to Color */}
      <div className="aspect-square relative overflow-hidden bg-bg grayscale group-hover:grayscale-0 transition-all duration-700 ease-out-expo">
        {image ? (
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out-expo"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center opacity-20 bg-accent-navy text-accent-navy">
             <span className="font-display font-black uppercase tracking-tight leading-none text-4xl">TD</span>
          </div>
        )}

        {/* Minimal Category Overlay */}
        <div className="absolute bottom-4 left-4">
          <Text variant="mono" size="micro" weight="font-bold" className="text-bg bg-accent-navy px-2 py-1 uppercase tracking-[0.2em]">
            {category}
          </Text>
        </div>
      </div>

      {/* Content Area - No background, purely typographic */}
      <div className="flex flex-col gap-4 py-8 flex-1 border-b border-line/30 group-last:border-none">
        <div className="flex flex-col gap-3">
          <div className="flex justify-between items-start gap-4">
            <h3 className="font-display font-black uppercase tracking-tight leading-none text-3xl text-accent-navy group-hover:text-accent transition-colors duration-300 flex-1">
              {title}
            </h3>

            {rating && (
              <div className="flex flex-col items-end gap-1 shrink-0">
                <div className="flex text-accent font-bold text-xs tracking-tighter">
                  {'★'.repeat(Math.floor(rating))}
                  {rating % 1 !== 0 ? '½' : ''}
                </div>
                <span className="text-[8px] text-text-dim font-bold font-mono">
                  SCORE: {rating}/5
                </span>
              </div>
            )}
          </div>

          <p className="font-sans leading-relaxed text-text-dim text-base max-w-[45ch] line-clamp-3">
             {excerpt}
          </p>

          <div className="flex flex-wrap items-center gap-6 mt-2">
             {verdict && (
               <div className="flex items-center gap-2">
                 <span className="w-1.5 h-1.5 bg-accent rounded-full" />
                 <span className="text-[10px] font-mono uppercase text-accent font-bold tracking-widest">{verdict}</span>
               </div>
             )}
             {priceCategory && (
               <span className="text-[10px] font-mono uppercase text-text-dim font-bold tracking-widest">{priceCategory}</span>
             )}
             {updatedDate && (
               <span className="text-[10px] font-mono uppercase text-text-dim tracking-widest opacity-60">REVISED: {updatedDate}</span>
             )}
          </div>
        </div>

        <div className="flex items-center gap-3 pt-4 mt-auto">
          <span className="font-mono tracking-[0.3em] uppercase text-accent-navy font-bold text-[10px] group-hover:text-accent transition-colors">
            ACCESS CASE STUDY
          </span>
          <div className="group-hover:translate-x-2 transition-transform duration-500 ease-out-expo">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-accent"
            >
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </div>
        </div>
      </div>
    </NavLink>
  );
}
