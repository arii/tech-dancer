import ReactMarkdown from 'react-markdown';
import { Box, Text } from '@/layouts/Primitives';

interface MarkdownRendererProps {
  content: string;
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <ReactMarkdown
      components={{
        a: ({node, ...props}) => <a {...props} rel="noopener noreferrer" target="_blank" />,
        blockquote: ({node, ...props}) => (
          <Box border surface="warning" padding={6} marginY={8} radius="none">
             <Text variant="mono" size="tiny" weight="font-bold" intent="warning" tracking="widest" className="mb-2 block">Key Takeaway</Text>
             <blockquote className="m-0 p-0 font-medium italic" {...props} />
          </Box>
        ),
        h2: ({node, ...props}) => (
          <Box className="mt-12 mb-6 group" style={{ counterIncrement: 'section' }}>
            <Text
              variant="mono"
              size="tiny"
              color="accent"
              weight="font-bold"
              className="block mb-2 opacity-50 tracking-[0.2em] before:content-[counter(section,decimal-leading-zero)] before:mr-2"
            />
            <h2 className="text-3xl font-display font-bold normal-case tracking-tight m-0" {...props} />
            <Box className="h-px w-12 bg-accent mt-4" />
          </Box>
        )
      }}
      className="[counter-reset:section]"
    >
      {content}
    </ReactMarkdown>
  );
}
