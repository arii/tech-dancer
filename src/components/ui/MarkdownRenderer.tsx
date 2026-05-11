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
               <blockquote className="font-medium italic" style={{ margin: 0, padding: 0 }} {...props} /> /* impeccable-ignore */
            </Box>
          ),
          h2: ({node: _node, ...props}) => (
            <Box marginTop={16} marginBottom={8} className="group" style={{ counterIncrement: 'section' }}> /* impeccable-ignore */
              <Text
                variant="mono"
                size="micro"
                color="accent"
                weight="font-bold"
                tracking="utility"
                display="block"
                marginBottom={3}
                className="opacity-60 before:content-[counter(section,decimal-leading-zero)] before:mr-2" /* impeccable-ignore */
              />
              <Text as="h2" variant="h2" size="4xl" color="brand" margin={0} {...props} />
              <Box height={0.5} width={16} marginTop={6} className="bg-accent transition-all group-hover:w-24" />
            </Box>
          ),
          h3: ({node: _node, ...props}) => (
            <Box marginTop={12} marginBottom={6}>
              <Text as="h3" variant="h3" size="xl" color="main" margin={0} paddingLeft={4} className="border-l-2 border-accent/30" {...props} />
            </Box>
          )
        }}
      >
        {content}
      </ReactMarkdown>
    </Box>
  );
}
