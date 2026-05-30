
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize, { defaultSchema } from 'rehype-sanitize';
import { Box, Text } from '@/layouts/Primitives';
import { Link } from 'react-router-dom';
import { Notice } from './Notice';
import {
  ArticleCallout,
  ArticlePullQuote,
  ArticleSection,
  ArticleAffiliateCard
} from '@/components/article/ArticleElements';

const CUSTOM_COMPONENTS = {
  notice: { component: Notice, tags: ['notice', 'Notice'], attributes: ['type'] },
  callout: { component: ArticleCallout, tags: ['callout'], attributes: ['title', 'variant'] },
  pullquote: { component: ArticlePullQuote, tags: ['pullquote'], attributes: ['quote', 'author'] },
  'article-section': { component: ArticleSection, tags: ['article-section'], attributes: ['title', 'id'] },
  'affiliate-card': { component: ArticleAffiliateCard, tags: ['affiliate-card'], attributes: ['id', 'cta'] },
} as const;

interface MarkdownRendererProps {
  content: string;
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  const customTags = Object.values(CUSTOM_COMPONENTS).flatMap(c => c.tags);
  const customAttributes = Object.entries(CUSTOM_COMPONENTS).reduce((acc, [_, config]) => {
    config.tags.forEach(tag => {
      acc[tag] = config.attributes;
    });
    return acc;
  }, {} as Record<string, string[]>);

  return (
    <Box className="prose-counters">
      <ReactMarkdown
        rehypePlugins={[
          rehypeRaw,
          [rehypeSanitize, {
            ...defaultSchema,
            tagNames: [...(defaultSchema.tagNames || []), ...customTags],
            attributes: {
              ...defaultSchema.attributes,
              ...customAttributes
            },
            clobberPrefix: ''
          }]
        ]}
        components={{
          a: ({node: _node, href, ...props}) => {
            const isInternal = href?.startsWith('/');
            if (isInternal) {
              return <Link to={href} {...props} />;
            }
            return <a href={href} {...props} rel="noopener noreferrer" target="_blank" />;
          },
          blockquote: ({node: _node, ...props}) => (
            <Box border surface="muted" padding={6} marginY={8} radius="lg" className="border-accent/20">
               <Text variant="mono" size="tiny" weight="font-bold" color="accent" tracking="widest" marginBottom={2} display="block" className="uppercase">Key Takeaway</Text>
               <blockquote className="italic font-medium text-text-dim" {...props} />
            </Box>
          ),
          h2: ({node: _node, ...props}) => (
            <Box marginTop={16} marginBottom={8} className="prose-section group">
              <Text
                variant="mono"
                size="micro"
                color="accent"
                weight="font-extrabold"
                tracking="utility"
                display="block"
                marginBottom={3}
                className="prose-section-number uppercase"
              />
              <Text as="h2" variant="h2" size="4xl" color="main" weight="font-bold" margin={0} className="tracking-tight" {...props} />
            </Box>
          ),
          h3: ({node: _node, ...props}) => (
            <Box marginTop={12} marginBottom={6}>
              <Text
                as="h3"
                variant="h3"
                size="xl"
                color="main"
                weight="font-bold"
                margin={0}
                className="border-l-2 border-accent/40 pl-4"
                {...props}
              />
            </Box>
          ),
          p: ({node: _node, ...props}) => (
            <Text as="p" size="md" color="dim" className="leading-relaxed mb-6" {...props} />
          ),
          ul: ({node: _node, ...props}) => (
            <Box as="ul" className="space-y-3 mb-8 list-none" {...props} />
          ),
          li: ({node: _node, ...props}) => (
            <Box as="li" display="flex" gap={3} className="text-text-dim">
              <Text color="accent" weight="font-bold" className="mt-1">•</Text>
              <Text size="md" color="dim" className="leading-relaxed" {...props} />
            </Box>
          ),
          ol: ({node: _node, ...props}) => (
            <Box as="ol" className="space-y-4 mb-8 list-decimal list-inside" {...props} />
          ),
          table: ({node: _node, ...props}) => (
            <Box width="full" overflowX="auto" marginY={8} radius="lg" border className="overflow-hidden border-line/40">
              <Box as="table" width="full" className="border-collapse" {...props} />
            </Box>
          ),
          th: ({node: _node, ...props}) => (
            <Text
              as="th"
              variant="mono"
              size="xs"
              color="dim"
              uppercase
              weight="font-extrabold"
              padding={4}
              textAlign="left"
              surface="surface"
              className="border-b border-line/60"
              {...props}
            />
          ),
          td: ({node: _node, ...props}) => (
            <Box as="td" padding={4} className="border-b border-line/40 text-text-dim" {...props} />
          ),
          img: ({node: _node, ...props}) => (
            <img
              className="rounded-xl shadow-2xl border border-line/40"
              loading="lazy"
              {...props}
            />
          ),
          ...Object.entries(CUSTOM_COMPONENTS).reduce((acc, [_, config]) => {
            config.tags.forEach(tag => {
              const Component = config.component as any;
              acc[tag] = (props: any) => <Component {...props} />;
            });
            return acc;
          }, {} as any)
        }}
      >
        {content}
      </ReactMarkdown>
    </Box>
  );
}
