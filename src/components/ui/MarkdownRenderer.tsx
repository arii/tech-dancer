// impeccable-ignore-file
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize, { defaultSchema } from 'rehype-sanitize';
import { Box, Text } from '@/layouts/Primitives';
import { Link } from 'react-router-dom';
import { normalizeAsset } from '@/lib/content';
import { Notice } from './Notice';
import { AffiliateCard } from './AffiliateCard';
import { affiliateManager } from '@/lib/affiliateManager';

interface MarkdownRendererProps {
  content: string;
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <Box className="prose-counters">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[
          rehypeRaw,
          [rehypeSanitize, {
            ...defaultSchema,
            tagNames: [...(defaultSchema.tagNames || []), 'notice', 'Notice', 'input'],
            attributes: {
              ...defaultSchema.attributes,
              notice: ['type', 'id'],
              Notice: ['type', 'id'],
              input: ['type', 'checked', 'disabled']
            },
            clobberPrefix: ''
          }]
        ]}
        components={{
          input: ({node: _node, checked, disabled, type, ...props}: React.InputHTMLAttributes<HTMLInputElement> & { node?: unknown }) => {
            if (type === 'checkbox') {
              return <input type="checkbox" defaultChecked={checked} className="w-4 h-4 rounded border-line text-accent focus:ring-accent accent-accent cursor-pointer mt-1" {...props} />;
            }
            return <input type={type} defaultChecked={checked} disabled={disabled} {...props} />;
          },
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
            <Box marginTop={12} marginBottom={6} className="prose-section group">
              <Text
                variant="mono"
                display="block"
                marginBottom={1}
                className="editorial-section-number"
              />
              <Text as="h2" variant="h2" size="3xl" color="brand" margin={0} leading="tight" {...props} />
              <Box height={0.5} width={12} marginTop={4} className="bg-accent transition-all group-hover:w-20" />
            </Box>
          ),
          h3: ({node: _node, ...props}) => (
            <Box marginTop={8} marginBottom={4}>
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
          img: ({node: _node, src, alt, ...props}) => {
            const normalizedSrc = normalizeAsset(src || '');
            return (
              <Box marginY={8} width="full" display="flex" justifyContent="center">
                <img
                  src={normalizedSrc}
                  className="rounded-lg shadow-sm"
                  loading="lazy"
                  alt={alt || "Article illustration"}
                  {...props}
                />
              </Box>
            );
          },
          notice: (props: { type?: string; id?: string; children?: React.ReactNode }) => {
            if (props.type === 'affiliate' && props.id) {
              const link = affiliateManager.getLink(props.id);
              if (link) {
                return (
                  <Box marginY={4} width="full">
                    <AffiliateCard link={link} />
                  </Box>
                );
              }
            }
            return <Notice type={props.type as 'info' | 'warning'}>{props.children}</Notice>;
          },
          Notice: (props: { type?: string; id?: string; children?: React.ReactNode }) => {
            if (props.type === 'affiliate' && props.id) {
              const link = affiliateManager.getLink(props.id);
              if (link) {
                return (
                  <Box marginY={4} width="full">
                    <AffiliateCard link={link} />
                  </Box>
                );
              }
            }
            return <Notice type={props.type as 'info' | 'warning'}>{props.children}</Notice>;
          }
        }}
      >
        {content}
      </ReactMarkdown>
    </Box>
  );
}
