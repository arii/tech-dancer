// impeccable-ignore-file
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize, { defaultSchema } from 'rehype-sanitize';
import { ASSET_PREFIX } from '@/config/constants';
import { Box, Text } from '@/layouts/Primitives';
import { Link } from 'react-router-dom';
import { Notice } from './Notice';

interface MarkdownRendererProps {
  content: string;
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <Box className="prose-counters">
      <ReactMarkdown
        rehypePlugins={[
          rehypeRaw,
          [rehypeSanitize, {
            ...defaultSchema,
            tagNames: [...(defaultSchema.tagNames || []), 'notice', 'Notice'],
            attributes: {
              ...defaultSchema.attributes,
              notice: ['type'],
              Notice: ['type']
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
          img: ({node: _node, src, ...props}) => {
            const normalizedSrc = (src?.startsWith('/') && !src.startsWith(ASSET_PREFIX))
              ? `${ASSET_PREFIX}${src}`
              : src;
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
