
import React, { useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Box, Text, Stack, Grid } from '@/layouts/Primitives';
import { Link } from 'react-router-dom';
import { normalizeAsset } from '@/lib/content';
import { Notice } from './Notice';
import { AffiliateCard } from './AffiliateCard';
import { affiliateManager } from '@/lib/affiliateManager';
import { MARKDOWN_SANITIZATION_SCHEMA } from '@/lib/constants/markdown-schema';

const ALLOWED_PROPS = new Set([
  'padding', 'paddingTop', 'paddingBottom', 'paddingLeft', 'paddingRight', 'paddingX', 'paddingY',
  'margin', 'marginTop', 'marginBottom', 'marginLeft', 'marginRight', 'marginX', 'marginY',
  'width', 'height', 'display', 'border', 'radius', 'surface', 'shadow', 'maxWidth', 'minWidth',
  'overflow', 'gap', 'span', 'cols', 'rows', 'direction', 'align', 'justify',
  'variant', 'size', 'weight', 'color', 'uppercase', 'intent', 'tracking', 'leading', 'as'
]);

interface MarkdownRendererProps {
  content: string;
}

/**
 * Preprocesses markdown content to fix rendering issues.
 * Specifically, it ensures blank lines around Notice tag inner content
 * so that markdown inside the tags is parsed correctly by rehype-raw.
 */
const preprocessMarkdown = (content: string): string => {
  return content.replace(
    /<(Notice|notice)([^>]*)>([\s\S]*?)<\/\1>/g,
    (match, tag, attrs, inner) => `<${tag}${attrs}>\n\n${inner.trim()}\n\n</${tag}>`
  );
};

/**
 * Parses a prop value from a markdown tag.
 * Markdown attributes are always strings when parsed via rehype-raw,
 * but we want to support JSX-like syntax for numbers, booleans, and responsive objects.
 * e.g. cols="{{ base: 1, md: 3 }}" or gap="{6}"
 */
function parseProp<T>(val: unknown): T {
  if (typeof val !== 'string') return val as T;
  const trimmed = val.trim();

  // Handle JSX-style curly braces: {1} or {{base: 1}}
  if (trimmed.startsWith('{') && trimmed.endsWith('}')) {
    const inner = trimmed.slice(1, -1).trim();

    try {
      // Safely parse JSON strings by converting non-quoted keys to quoted
      // e.g. { base: 1, md: 3 } -> { "base": 1, "md": 3 }
      let jsonStr = inner;
      if (!inner.startsWith('{') && inner.startsWith("'") && inner.endsWith("'")) {
        jsonStr = `"${inner.slice(1, -1)}"`;
      } else if (inner.startsWith('{')) {
        jsonStr = inner
          .replace(/(?:^|[{,]\s*)([a-zA-Z0-9_]+)\s*:/g, (match, key) => match.replace(key, `"${key}"`))
          .replace(/(?<![a-zA-Z])'|'(?![a-zA-Z])/g, '"');
      }
      return JSON.parse(jsonStr) as T;
    } catch (e) {
      console.warn('MarkdownRenderer: Failed to parse prop expression:', inner, e);
      return inner as T;
    }
  }

  // Auto-convert plain numeric strings (e.g. margin="4")
  const num = Number(trimmed);
  if (trimmed !== '' && !Number.isNaN(num)) return num as T;

  return val as T;
}

const RenderNotice = (props: { type?: string; id?: string; children?: React.ReactNode }) => {
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
};

/**
 * Processes all incoming markdown attributes through parseProp to ensure
 * numbers, booleans, and objects are correctly converted.
 * Filters out internal markdown metadata and validates against a whitelist.
 */
function propMap<T>(props: Record<string, unknown>): T {
  const result: Record<string, unknown> = {};
  Object.entries(props).forEach(([key, value]) => {
    // node is internal metadata, children should remain untouched
    if (key === 'node') return;
    if (key === 'children') {
      result[key] = value;
      return;
    }

    // Strictly validate against whitelist of allowed props to prevent injection
    if (ALLOWED_PROPS.has(key)) {
      result[key] = parseProp(value);
    }
  });
  return result as T;
}

const RenderBlockquote = ({ children, node: _node, ...props }: { children: React.ReactNode, node?: unknown }) => {
  // Extract bold prefix (e.g. **Implemented:** or **Pattern:**) as the label
  const childArray = Array.isArray(children) ? children : [children];
  let label = 'Note';
  const firstChild = childArray[0];

  if (React.isValidElement(firstChild)) {
    const pChildren = firstChild.props.children;
    const pArr = Array.isArray(pChildren) ? pChildren : [pChildren];
    const firstStrong = pArr.find(
      (c) => React.isValidElement(c) && c.type === 'strong'
    );

    if (React.isValidElement(firstStrong) && firstStrong.props.children) {
      const raw = Array.isArray(firstStrong.props.children)
        ? firstStrong.props.children.join('')
        : String(firstStrong.props.children);
      label = raw.replace(/:$/, '').trim();
    }
  }
  return (
    <Box border surface="warning" padding={6} marginY={12} radius="lg">
      <Text variant="mono" size="micro" weight="font-bold" intent="warning" tracking="widest" uppercase marginBottom={3} display="block">
        {label}
      </Text>
      <blockquote className="italic font-medium text-text-main" {...props}>
        {children}
      </blockquote>
    </Box>
  );
};

const RenderCode = ({ className, children, node: _node, ...props }: { className?: string; children: React.ReactNode, node?: unknown }) => {
  const match = /language-(\w+)/.exec(className || '');
  const language = match ? match[1] : '';
  const isMermaid = language === 'mermaid';
  const codeString = String(children).replace(/\n$/, '');

  if (isMermaid) {
    let diagramUrl: string | null = null;
    try {
      const payload = {
        code: codeString,
        mermaid: {
          theme: 'dark',
          themeVariables: {
            fontSize: '24px', /* impeccable-ignore */
          },
        },
      };
      const jsonString = JSON.stringify(payload);
      const bytes = new TextEncoder().encode(jsonString);
      let binary = '';
      const len = bytes.byteLength;
      for (let i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
      }
      const rawBase64 = typeof window !== 'undefined' ? window.btoa(binary) : btoa(binary);
      const base64 = rawBase64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
      diagramUrl = `https://mermaid.ink/svg/${base64}`;
    } catch (e) {
      console.error('Failed to render mermaid diagram', e);
    }

    if (diagramUrl) {
      return (
        <Box marginY={12} width="full" display="flex" justify="center" surface="surface" radius="lg" padding={8} className="bg-surface-alt/50 border border-line/30">
          <Box
            as="img"
            src={diagramUrl}
            alt="Workflow Diagram"
            radius="lg"
            maxWidth="full"
            height="auto"
            className="object-contain"
            loading="lazy"
          />
        </Box>
      );
    }
  }

  const isBlock = codeString.includes('\n') || !!language;

  if (isBlock) {
    return (
      <Box marginY={12} radius="lg" border className="overflow-hidden">
        {language && (
          <Stack
            direction="row"
            align="center"
            gap={2}
            padding={2}
            paddingX={4}
            surface="surface"
            border="b"
            borderColor="line"
          >
            <Text variant="mono" size="micro" color="dim" uppercase tracking="widest">
              {language}
            </Text>
          </Stack>
        )}
        <SyntaxHighlighter
          style={vscDarkPlus}
          language={language || 'text'}
          PreTag="div"
          customStyle={{
            margin: 0,
            borderRadius: 0,
            background: 'var(--color-surface)',
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
    <Text
      as="code"
      variant="mono"
      size="xs"
      paddingX={3}
      paddingY={0.5}
      radius="sm"
      surface="surface"
      border
      borderColor="line"
      color="accent"
      className="normal-case"
      {...props}
    >
      {children}
    </Text>
  );
};

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  const processedContent = useMemo(() => preprocessMarkdown(content), [content]);

  return (
    <Box className="prose-counters">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[
          rehypeRaw,
          [rehypeSanitize, MARKDOWN_SANITIZATION_SCHEMA]
        ]}
        components={{
          // Explicitly map layout primitives for clarity and type safety
          Grid: (props) => <Grid {...propMap(props)} />,
          grid: (props) => <Grid {...propMap(props)} />,
          Stack: (props) => <Stack {...propMap(props)} />,
          stack: (props) => <Stack {...propMap(props)} />,
          Box: (props) => <Box {...propMap(props)} />,
          box: (props) => <Box {...propMap(props)} />,
          Text: (props) => <Text {...propMap(props)} />,
          text: (props) => <Text {...propMap(props)} />,
          input: ({node: _node, checked, disabled, type, ...props}: React.InputHTMLAttributes<HTMLInputElement> & { node?: unknown }) => {
            if (type === 'checkbox') {
              return (
                <Box
                  as="span"
                  display="inline-flex"
                  align="center"
                  justify="center"
                  minWidth={12}
                  minHeight={12}
                >
                  <input
                    type="checkbox"
                    defaultChecked={checked}
                    className="w-4 h-4 rounded border-line text-accent focus:ring-accent accent-accent cursor-pointer"
                    {...props}
                  />
                </Box>
              );
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
          blockquote: RenderBlockquote,
          h2: ({node: _node, ...props}) => (
            <Box marginTop={16} marginBottom={10} className="prose-section group">
              <Text
                variant="mono"
                display="block"
                marginBottom={1}
                className="editorial-section-number"
              />
              <Text as="h2" variant="h2" size="3xl" color="brand" margin={0} leading="tight" {...props} />
              <Box height={0.5} width={12} marginTop={6} className="bg-accent transition-all group-hover:w-20" />
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
            <Box width="full" overflowX="auto" marginY={6} radius="lg" border className="overflow-hidden">
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
              <Box marginY={12} width="full" display="flex" justify="center" className="markdown-image-wrapper">
                <Box
                  as="img"
                  src={normalizedSrc}
                  radius="lg"
                  shadow="sm"
                  border
                  loading="lazy"
                  alt={alt || "Article illustration"}
                  maxWidth={{ base: 'full', md: '2xl' }}
                  height="auto"
                  {...props}
                />
              </Box>
            );
          },
          p: ({node: _node, children, ...props}) => {
            // Always render as div to safely contain any children (block or inline)
            // while preserving paragraph-like styling. This prevents hydration errors.
            return <Text as="div" color="dim" leading="relaxed" marginBottom={6} size="lg" className="markdown-paragraph" {...props}>{children}</Text>;
          },
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
          code: RenderCode,
          notice: RenderNotice,
          Notice: RenderNotice
        }}
      >
        {processedContent}
      </ReactMarkdown>
    </Box>
  );
}
