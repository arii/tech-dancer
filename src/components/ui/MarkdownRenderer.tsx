
import ReactMarkdown, { Components } from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize, { defaultSchema } from 'rehype-sanitize';
import { Box, Text, Stack } from '@/layouts/Primitives';
import { Link } from 'react-router-dom';
import { Notice } from './Notice';
import {
  ArticleCallout,
  ArticlePullQuote,
  ArticleSection,
  ArticleAffiliateCard
} from '@/components/article/ArticleElements';

const CUSTOM_COMPONENTS: Record<string, { component: React.ComponentType<Record<string, unknown>>; tags: string[]; attributes: string[] }> = {
  notice: { component: Notice as React.ComponentType<Record<string, unknown>>, tags: ['notice', 'Notice'], attributes: ['type'] },
  callout: { component: ArticleCallout as React.ComponentType<Record<string, unknown>>, tags: ['callout'], attributes: ['title', 'variant'] },
  pullquote: { component: ArticlePullQuote as React.ComponentType<Record<string, unknown>>, tags: ['pullquote'], attributes: ['quote', 'author'] },
  'article-section': { component: ArticleSection as React.ComponentType<Record<string, unknown>>, tags: ['article-section'], attributes: ['title', 'id'] },
  'affiliate-card': { component: ArticleAffiliateCard as React.ComponentType<Record<string, unknown>>, tags: ['affiliate-card'], attributes: ['id', 'cta'] },
};

interface MarkdownRendererProps {
  content: string;
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  const customTags = Object.values(CUSTOM_COMPONENTS).flatMap(c => c.tags);
  const customAttributes = Object.values(CUSTOM_COMPONENTS).reduce((acc, config) => {
    config.tags.forEach(tag => {
      acc[tag] = config.attributes;
    });
    return acc;
  }, {} as Record<string, string[]>);

  const markdownComponents: Components = {
    a: ({ href, children, ...props }) => {
      const isInternal = href?.startsWith('/');
      if (isInternal) {
        return <Link to={href} {...props}>{children}</Link>;
      }
      return <a href={href} {...props} rel="noopener noreferrer" target="_blank">{children}</a>;
    },
    blockquote: ({ children, ...props }) => (
      <Box border surface="muted" padding={6} marginY={8} radius="lg" className="border-accent/20">
         <Text variant="mono" size="tiny" weight="font-bold" color="accent" tracking="utility" marginBottom={2} display="block" uppercase>Key Takeaway</Text>
         <blockquote className="italic font-medium text-text-dim" {...props}>
           {children}
         </blockquote>
      </Box>
    ),
    h2: ({ children, ...props }) => (
      <Box marginTop={16} marginBottom={8} className="prose-section group">
        <Text
          variant="mono"
          size="micro"
          color="accent"
          weight="font-extrabold"
          tracking="utility"
          className="prose-section-number"
          display="block"
          marginBottom={3}
          uppercase
        />
        <Text as="h2" variant="h2" size="4xl" color="main" weight="font-bold" margin={0} tracking="tight" {...props}>
          {children}
        </Text>
      </Box>
    ),
    h3: ({ children, ...props }) => (
      <Box marginTop={12} marginBottom={6}>
        <Text
          as="h3"
          variant="h3"
          size="xl"
          color="main"
          weight="font-bold"
          margin={0}
          paddingLeft={4}
          className="border-l-2 border-accent/40"
          {...props}
        >
          {children}
        </Text>
      </Box>
    ),
    p: ({ children, ...props }) => (
      <Text as="p" size="md" color="dim" marginBottom={6} className="leading-relaxed" {...props}>
        {children}
      </Text>
    ),
    ul: ({ children, ...props }) => (
      <Stack as="ul" gap={3} marginBottom={8} className="list-none" {...props}>
        {children}
      </Stack>
    ),
    li: ({ children, ...props }) => (
      <Stack as="li" direction="row" gap={3} align="start" color="dim">
        <Box marginTop={1}>
          <Text color="accent" weight="font-bold">•</Text>
        </Box>
        <Text size="md" color="dim" className="leading-relaxed" {...props}>
          {children}
        </Text>
      </Stack>
    ),
    ol: ({ children, ...props }) => (
      <Stack as="ol" gap={4} marginBottom={8} className="list-decimal list-inside" {...props}>
        {children}
      </Stack>
    ),
    table: ({ children, ...props }) => (
      <Box width="full" overflowX="auto" marginY={8} radius="lg" border className="overflow-hidden border-line/40">
        <Box as="table" width="full" className="border-collapse" {...props}>
          {children}
        </Box>
      </Box>
    ),
    th: ({ children, ...props }) => (
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
      >
        {children}
      </Text>
    ),
    td: ({ children, ...props }) => (
      <Box as="td" padding={4} className="border-b border-line/40 text-text-dim" {...props}>
        {children}
      </Box>
    ),
    img: (props) => (
      <img
        className="rounded-xl shadow-2xl border border-line/40"
        loading="lazy"
        {...props}
      />
    ),
    ...Object.values(CUSTOM_COMPONENTS).reduce((acc, config) => {
      config.tags.forEach(tag => {
        const Component = config.component;
        acc[tag] = (props: Record<string, unknown>) => <Component {...props} />;
      });
      return acc;
    }, {} as Record<string, React.ComponentType<Record<string, unknown>>>)
  };

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
        components={markdownComponents as Components}
      >
        {content}
      </ReactMarkdown>
    </Box>
  );
}
