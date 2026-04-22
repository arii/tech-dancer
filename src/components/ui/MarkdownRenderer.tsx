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
        )
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
