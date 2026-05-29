
/* impeccable-ignore-file */
import { Box, Text, Stack } from '@/layouts/Primitives';
import { ReactNode } from 'react';
import { Quote, ExternalLink } from 'lucide-react';
import { affiliateManager } from '@/lib/affiliateManager';

interface ArticleAffiliateCardProps {
  id: string;
  cta?: string;
}

export function ArticleAffiliateCard({ id, cta = "View Product" }: ArticleAffiliateCardProps) {
  const link = affiliateManager.getLink(id);

  if (!link) return null;

  return (
    <Box className="my-8 rounded-2xl border border-slate-800/80 bg-slate-950/60 overflow-hidden group hover:border-cyan-500/30 transition-all duration-300">
      <Stack direction={{ base: 'column', md: 'row' }} gap={0}>
        {link.image && (
          <Box className="w-full md:w-48 lg:w-64 aspect-square overflow-hidden border-b md:border-b-0 md:border-r border-slate-800/50">
            <img
              src={link.image}
              alt={link.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </Box>
        )}
        <Stack gap={4} className="p-6 lg:p-8 flex-1 justify-center">
          <Stack gap={2}>
            <Text variant="mono" size="micro" className="text-cyan-400 font-bold uppercase tracking-widest">
              {link.category || 'Featured Gear'}
            </Text>
            <Text variant="display" size="xl" className="text-slate-100">
              {link.name}
            </Text>
            {link.description && (
              <Text size="sm" className="text-slate-400 leading-relaxed line-clamp-2">
                {link.description}
              </Text>
            )}
          </Stack>

          <Box
            as="a"
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-500/50 hover:bg-slate-800 text-slate-200 font-bold transition-all w-fit"
          >
            <span>{cta}</span>
            <ExternalLink size={14} className="text-cyan-400" />
          </Box>
        </Stack>
      </Stack>
    </Box>
  );
}

interface ArticleCalloutProps {
  title?: string;
  children: ReactNode;
  variant?: 'info' | 'warning' | 'tip';
}

export function ArticleCallout({ title, children, variant = 'info' }: ArticleCalloutProps) {
  const styles = {
    info: 'border-cyan-500/30 bg-cyan-500/5 text-cyan-100',
    warning: 'border-amber-500/30 bg-amber-500/5 text-amber-100',
    tip: 'border-emerald-500/30 bg-emerald-500/5 text-emerald-100',
  };

  return (
    <Box className={`my-8 p-6 rounded-xl border ${styles[variant]} backdrop-blur-sm`}>
      <Stack gap={3}>
        {title && (
          <Text variant="mono" size="xs" weight="font-bold" className="uppercase tracking-widest opacity-80">
            {title}
          </Text>
        )}
        <Box className="prose-p:my-0 prose-p:text-inherit">
          {children}
        </Box>
      </Stack>
    </Box>
  );
}

interface ArticlePullQuoteProps {
  quote: string;
  author?: string;
  className?: string;
}

export function ArticlePullQuote({ quote, author, className = "" }: ArticlePullQuoteProps) {
  return (
    <Box className={`my-12 relative ${className}`}>
      <Quote className="absolute -top-4 -left-4 w-12 h-12 text-cyan-500/10 -z-10" />
      <Stack gap={4} className="border-l-2 border-cyan-400 pl-8">
        <Text variant="display" size="2xl" className="text-slate-100 italic leading-relaxed">
          &ldquo;{quote}&rdquo;
        </Text>
        {author && (
          <Text variant="mono" size="xs" className="text-cyan-400 font-bold uppercase tracking-widest">
            — {author}
          </Text>
        )}
      </Stack>
    </Box>
  );
}

interface ArticleSectionProps {
  title: string;
  id?: string;
  children: ReactNode;
}

export function ArticleSection({ title, id, children }: ArticleSectionProps) {
  return (
    <Box as="section" id={id} className="mb-16 last:mb-0">
      <Text
        as="h2"
        variant="display"
        size="2xl"
        className="text-slate-100 font-bold mb-8"
      >
        {title}
      </Text>
      <Box>
        {children}
      </Box>
    </Box>
  );
}
