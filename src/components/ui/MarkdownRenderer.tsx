import ReactMarkdown from 'react-markdown';
import { Box, Text } from '@/layouts/Primitives';
import { Link } from 'react-router-dom';

interface MarkdownRendererProps {
  content: string;
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <Box className="[counter-reset:section]">
      <ReactMarkdown
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
               <Box as="blockquote" margin={0} padding={0} className="font-medium italic" {...props} />
            </Box>
          ),
          h2: ({node: _node, ...props}) => (
            <Box marginTop={12} marginBottom={6} className="group [counter-increment:section]">
              <Text
                variant="mono"
                size="tiny"
                color="accent"
                weight="font-bold"
                tracking="wide-editorial"
                display="block"
                marginBottom={2}
                className="opacity-50 before:content-[counter(section,decimal-leading-zero)] before:mr-2"
              />
              <Text as="h2" variant="display" size="3xl" weight="font-bold" margin={0} className="normal-case tracking-tight" {...props} />
              <Box className="h-px w-12 bg-accent" marginTop={4} />
            </Box>
          )
        }}
      >
        {content}
      </ReactMarkdown>
    </Box>
  );
}
