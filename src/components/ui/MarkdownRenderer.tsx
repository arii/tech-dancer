// impeccable-ignore-file
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize, { defaultSchema } from 'rehype-sanitize';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Box, Text } from '@/layouts/Primitives';
import { Link } from 'react-router-dom';
import { normalizeAsset } from '@/lib/content';
import { Notice } from './Notice';
import { MermaidDiagram } from './MermaidDiagram';

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
          blockquote: ({node: _node, children, ...props}) => {
            // Extract bold prefix (e.g. **Implemented:** or **Pattern:**) as the label
            const childArray = Array.isArray(children) ? children : [children];
            let label = 'Note';
            const firstChild = childArray[0];
            if (firstChild && typeof firstChild === 'object' && 'props' in firstChild) {
              const pChildren = (firstChild as React.ReactElement).props?.children;
              const pArr = Array.isArray(pChildren) ? pChildren : [pChildren];
              const firstStrong = pArr.find(
                (c: unknown) => c && typeof c === 'object' && 'type' in (c as object) && (c as React.ReactElement).type === 'strong'
              ) as React.ReactElement | undefined;
              if (firstStrong?.props?.children) {
                const raw = Array.isArray(firstStrong.props.children)
                  ? firstStrong.props.children.join('')
                  : String(firstStrong.props.children);
                label = raw.replace(/:$/, '').trim();
              }
            }
            return (
              <Box border surface="warning" padding={6} marginY={8} radius="md">
                <Text variant="mono" size="micro" weight="font-bold" intent="warning" tracking="widest" uppercase marginBottom={3} display="block">
                  {label}
                </Text>
                <blockquote className="italic font-medium text-text-main" {...props}>
                  {children}
                </blockquote>
              </Box>
            );
          },
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
          p: ({node: _node, ...props}) => (
            <p className="text-text-dim leading-relaxed my-4 text-base" {...props} />
          ),
          ul: ({node: _node, ...props}) => (
            <Box as="ul" marginY={4} paddingLeft={6} className="list-disc space-y-1.5" {...props} />
          ),
          ol: ({node: _node, ...props}) => (
            <Box as="ol" marginY={4} paddingLeft={6} className="list-decimal space-y-1.5" {...props} />
          ),
          li: ({node: _node, ...props}) => (
            <Box as="li" className="text-text-dim leading-relaxed" {...props} />
          ),
          hr: ({node: _node, ...props}) => (
            <Box marginY={10} height={0} className="border-t border-line/40" {...props} />
          ),
          notice: (props: React.ComponentProps<typeof Notice>) => <Notice {...props} />,
          Notice: (props: React.ComponentProps<typeof Notice>) => <Notice {...props} />,
          code: ({ node: _node, className, children, ...props }) => {
            const match = /language-(\w+)/.exec(className || '');
            const language = match ? match[1] : '';
            const codeString = String(children).replace(/\n$/, '');
            const isBlock = codeString.includes('\n') || !!language;

            if (language === 'mermaid') {
              return <MermaidDiagram code={codeString} />;
            }

            if (isBlock) {
              return (
                <Box marginY={6} radius="lg" border className="overflow-hidden">
                  {language && (
                    <Box
                      padding={2}
                      paddingX={4}
                      surface="surface"
                      className="border-b border-line flex items-center gap-2"
                    >
                      <Text variant="mono" size="micro" color="dim" uppercase tracking="widest">
                        {language}
                      </Text>
                    </Box>
                  )}
                  <SyntaxHighlighter
                    style={vscDarkPlus}
                    language={language || 'text'}
                    PreTag="div"
                    customStyle={{
                      margin: 0,
                      borderRadius: 0,
                      background: 'var(--color-surface, #0f172a)',
                      fontSize: '0.8rem',
                      lineHeight: '1.6',
                    }}
                    {...(props as object)}
                  >
                    {codeString}
                  </SyntaxHighlighter>
                </Box>
              );
            }

            // Inline code
            return (
              <code
                className="px-1.5 py-0.5 rounded text-[0.8em] font-mono bg-surface border border-line text-accent"
                {...props}
              >
                {children}
              </code>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </Box>
  );
}
