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
               <Text variant="mono" size="tiny" weight="font-bold" intent="warning" tracking="widest" className="mb-2 block">Key Takeaway</Text>
               <blockquote className="m-0 p-0 font-medium italic" {...props} />
            </Box>
          ),
          h2: ({node: _node, ...props}) => (
            <Box className="mt-16 mb-8 group" style={{ counterIncrement: 'section' }}>
              <Text
                variant="mono"
                size="micro"
                color="accent"
                weight="font-bold"
                tracking="utility"
                className="block mb-3 opacity-60 before:content-[counter(section,decimal-leading-zero)] before:mr-2"
              />
              <Text as="h2" variant="h2" size="4xl" color="brand" className="m-0" {...props} />
              <Box className="h-0.5 w-16 bg-accent mt-6 transition-all group-hover:w-24" />
            </Box>
          ),
          h3: ({node: _node, ...props}) => (
            <Box className="mt-12 mb-6">
              <Text as="h3" variant="h3" size="xl" color="main" className="m-0 border-l-2 border-accent/30 pl-4" {...props} />
            </Box>
          )
        }}
      >
        {content}
      </ReactMarkdown>
    </Box>
  );
}
