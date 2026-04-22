import { NavLink } from 'react-router-dom';
import { Box, Stack, Text } from '@/layouts/Primitives';
import { Resource } from '@/lib/content';
import { CATEGORY_GRADIENTS } from '@/config/content';
import { getCategoryAbbreviation, getCategoryColorClass } from '@/lib/categoryUtils';

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
      className="group flex flex-col bg-surface border border-line transition-all duration-300 overflow-hidden"
    >
      {/* Image Wrapper */}
      <div className="aspect-square md:aspect-video relative overflow-hidden border-b border-line bg-bg">
        {image ? (
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className={`w-full h-full flex items-center justify-center ${getCategoryColorClass(category).split(' ')[0]}`}>
             <span className={`font-display font-bold uppercase tracking-tight leading-none text-3xl opacity-50 ${getCategoryColorClass(category).split(' ')[1]}`}>
               {getCategoryAbbreviation(category)}
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
              <Text variant="mono" size="micro" color="dim" emphasis="low">
                ({rating}/5)
              </Text>
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
                 <Box border className="bg-amber-50 px-2 py-0.5 border-amber-200">
                   <Text variant="mono" size="tiny" weight="font-bold" className="text-amber-700">{priceCategory}</Text>
                 </Box>
               )}
               {updatedDate && (
                 <Text variant="mono" size="tiny" color="dim">Updated {updatedDate}</Text>
               )}
            </div>
          )}
        </div>

        <div className="flex flex-col gap-3 mt-auto">
          <div className="flex items-center justify-between pt-4 border-t border-line/50">
            <Text variant="mono" size="xs" color="brand" weight="font-bold">
              Read Review
            </Text>
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
          <Text variant="mono" size="micro" color="dim" emphasis="low" italic className="leading-tight">
            * This post contains affiliate links. I may earn a commission at no extra cost to you.
          </Text>
        </div>
      </div>
    </NavLink>
  );
}
