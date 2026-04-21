import { NavLink } from 'react-router-dom';
import { Box, Stack, Text } from '@/layouts/Primitives';
import { Resource } from '@/lib/content';

interface GearCardProps extends Resource {
  basePath: string;
}

const categoryGradients: Record<string, string> = {
  'Data & Dev Lab': 'from-[#1A2B3C] to-[#185FA5]',
  'All about WCS':  'from-[#1A2B3C] to-[#3B6D11]',
  'Travel/Lifestyle': 'from-[#993C1D] to-[#BA7517]',
  'Gear Reviews':   'from-[#534AB7] to-[#1D9E75]',
  'Dance Gear': 'from-[#534AB7] to-[#1D9E75]',
};

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
  const gradient = categoryGradients[category] || 'from-slate-800 to-slate-900';

  return (
    <NavLink
      to={`${basePath}/${slug}`}
      className="group flex flex-col bg-surface border border-line transition-all duration-300 overflow-hidden"
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
          <div className={`w-full h-full flex items-center justify-center bg-gradient-to-br ${gradient}`}>
             <span className="font-display font-bold uppercase tracking-tight leading-none text-3xl text-white/20">
               {category.slice(0, 2).toUpperCase()}
             </span>
          </div>
        )}
        <div className="absolute top-4 left-4">
          <div className="bg-surface/90 backdrop-blur px-3 py-1 rounded-none border border-line">
            <Text variant="mono" size="micro" weight="font-bold" className="text-accent-navy uppercase">
              {category}
            </Text>
          </div>
        </div>
        {verdict && (
          <div className="absolute top-4 right-4">
            <div className="bg-accent-brand px-2 py-1 rounded-none">
              <Text variant="mono" size="micro" weight="font-bold" className="text-white uppercase">
                {verdict}
              </Text>
            </div>
          </div>
        )}
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

          {(priceCategory || updatedDate) && (
            <div className="flex flex-wrap items-center gap-3 mt-2">
               {priceCategory && (
                 <div className="bg-amber-50 px-2 py-0.5 rounded-none border border-amber-200">
                   <span className="text-[10px] font-mono text-amber-700 font-bold">{priceCategory}</span>
                 </div>
               )}
               {updatedDate && (
                 <span className="text-[10px] font-mono uppercase text-text-dim">Updated {updatedDate}</span>
               )}
            </div>
          )}
        </div>

        <div className="flex flex-col gap-3 mt-auto">
          <div className="flex items-center justify-between pt-4 border-t border-line/50">
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
          <Text variant="mono" size="micro" color="dim" className="text-[9px] leading-tight opacity-50 italic">
            * This post contains affiliate links. I may earn a commission at no extra cost to you.
          </Text>
        </div>
      </div>
    </NavLink>
  );
}
