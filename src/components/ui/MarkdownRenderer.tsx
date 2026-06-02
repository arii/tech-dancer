
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize, { defaultSchema } from 'rehype-sanitize';
import { Box, Text } from '@/layouts/Primitives';
import { Link } from 'react-router-dom';
import { normalizeAsset } from '@/lib/content';
import { Notice } from './Notice';
import { ArticleCallout } from '@/components/article/ArticleCallout';
import { ArticlePullQuote } from '@/components/article/ArticlePullQuote';
import { ArticleSection } from '@/components/article/ArticleSection';
import { ArticleAffiliateCard } from '@/components/article/ArticleAffiliateCard';

/**
 * Registry of custom components allowed in Markdown/MDX.
 * Standardizes sanitization schema and component mapping.
 */
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
  // Dynamically build sanitization schema from registry
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
            <Box border surface="warning" padding={6} marginY={8} radius="none">
               <Text variant="mono" size="tiny" weight="font-bold" intent="warning" tracking="widest" marginBottom={2} display="block">Key Takeaway</Text>
               <blockquote className="italic font-medium" {...props} />
            </Box>
          ),
          h2: ({node: _node, ...props}) => (
            <Box marginTop={16} marginBottom={8} className="prose-section group">
              <Text
                variant="mono"
                size="micro"
                color="dim"
                weight="font-bold"
                tracking="utility"
                display="block"
                marginBottom={3}
                className="prose-section-number"
              />
              <Text as="h2" variant="h2" size="4xl" color="brand" margin={0} {...props} />
              <Box height={0.5} width={16} marginTop={6} className="bg-accent transition-all group-hover:w-24" />
            </Box>
          ),
          h3: ({node: _node, ...props}) => (
            <Box marginTop={12} marginBottom={6}>
              <Text
                as="h3"
                variant="h3"
                size="xl"
                color="main"
                margin={0}
                paddingLeft={4}
                className="border-l-2 border-accent/30"
                {...props}
              />
            </Box>
          ),
          table: ({node: _node, ...props}) => (
            <Box width="full" overflowX="auto" marginY={8} radius="lg" border className="overflow-hidden">
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
              weight="font-bold"
              padding={4}
              textAlign="left"
              surface="surface"
              className="border-b border-line"
              {...props}
            />
          ),
          td: ({node: _node, ...props}) => (
            <Box as="td" padding={4} className="border-b border-line/50" {...props} />
          ),
          img: ({node: _node, ...props}) => (
            <img
              className="rounded-lg shadow-sm"
              loading="lazy"
              {...props}
            />
          ),
          // Map component implementations from registry
          ...Object.entries(CUSTOM_COMPONENTS).reduce((acc, [_, config]) => {
            config.tags.forEach(tag => {
              const Component = config.component as ComponentType<Record<string, unknown>>;
              acc[tag] = (props: Record<string, unknown>) => <Component {...props} />;
            });
            return acc;
          }, {} as Record<string, (props: Record<string, unknown>) => JSX.Element>)
          img: ({node: _node, src, ...props}) => {
            const normalizedSrc = normalizeAsset(src || '');
            return (
              <img
                src={normalizedSrc}
                className="rounded-lg shadow-sm"
                loading="lazy"
                {...props}
              />
            );
          },
          notice: (props: React.ComponentProps<typeof Notice>) => <Notice {...props} />,
          Notice: (props: React.ComponentProps<typeof Notice>) => <Notice {...props} />
        }}
      >
        {content}
      </ReactMarkdown>
    </Box>
  );
}
