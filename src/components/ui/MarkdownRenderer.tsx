// impeccable-ignore-file
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { Box, Text, Stack } from '@/layouts/Primitives';
import { Link } from 'react-router-dom';
import { Info, AlertTriangle, AlertCircle, HelpCircle } from 'lucide-react';
import { Icon } from './Icon';

interface MarkdownRendererProps {
  content: string;
}

const Notice = ({ type, children }: { type?: string; children: React.ReactNode }) => {
  const config = {
    info: { icon: Info, intent: 'accent' as const, bg: 'bg-accent/5', border: 'border-accent/20' },
    warning: { icon: AlertTriangle, intent: 'warning' as const, bg: 'bg-warning/5', border: 'border-warning/20' },
    danger: { icon: AlertCircle, intent: 'danger' as const, bg: 'bg-danger/5', border: 'border-danger/20' },
    success: { icon: Info, intent: 'success' as const, bg: 'bg-success/5', border: 'border-success/20' },
  }[type || 'info'] || { icon: HelpCircle, intent: 'accent' as const, bg: 'bg-accent/5', border: 'border-accent/20' };

  return (
    <Box padding={6} marginY={8} radius="lg" border className={`${config.bg} ${config.border}`}>
      <Stack direction="row" gap={4} align="start">
        <Box marginTop={1}>
          <Icon icon={config.icon} size="md" color={config.intent === 'accent' ? 'accent' : 'default'} />
        </Box>
        <Box flex className="prose-p:m-0 prose-p:text-text-main">
          {children}
        </Box>
      </Stack>
    </Box>
  );
};

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <Box className="prose-counters" width="full">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        remarkRehypeOptions={{ allowDangerousHtml: true }}
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
            <Box marginTop={{ base: 10, md: 16 }} marginBottom={8} className="prose-section group">
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
              <Text as="h2" variant="h2" size={{ base: '2xl', md: '4xl' }} color="brand" margin={0} {...props} />
              <Box height={0.5} width={16} marginTop={6} className="bg-accent transition-all group-hover:w-24" />
            </Box>
          ),
          h3: ({node: _node, ...props}) => (
            <Box marginTop={{ base: 8, md: 12 }} marginBottom={6}>
              <Text
                as="h3"
                variant="h3"
                size={{ base: 'lg', md: 'xl' }}
                color="main"
                margin={0}
                paddingLeft={4}
                className="border-l-2 border-accent/30"
                {...props}
              />
            </Box>
          ),
          pre: ({node: _node, ...props}) => (
            <Box as="pre" width="full" overflow="auto" className="no-scrollbar" marginY={6} {...props} />
          ),
          table: ({node: _node, ...props}) => (
            <Box width="full" overflow="auto" className="no-scrollbar" marginY={6}>
              <table className="min-w-full" {...props} />
            </Box>
          ),
          notice: ({node: _node, ...props}) => <Notice {...props} />
        }}
      >
        {content}
      </ReactMarkdown>
    </Box>
  );
}
