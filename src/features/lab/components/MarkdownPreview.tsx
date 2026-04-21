import React from 'react';
import { Box, Stack, Text, Grid, Button } from '@/layouts/Primitives';
import { Github, ExternalLink } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { DraftData } from '../useBlogDrafter';

interface MarkdownPreviewProps {
  data: DraftData;
  markdownBody: string;
  githubIssueUrl: string;
}

export const MarkdownPreview: React.FC<MarkdownPreviewProps> = ({ data, markdownBody, githubIssueUrl }) => {
  return (
    <Stack gap={6}>
       <Box border="b" paddingBottom={2} borderColor="line">
         <Text variant="mono" size="tiny" color="accent" tracking="widest">MARKDOWN_PREVIEW</Text>
       </Box>
       <Box 
         surface="muted" 
         padding={8} 
         radius="lg"
         border 
         maxHeight="600px"
         overflow="y-auto"
         shadow="standard"
       >
         {/* Visual Metadata Header */}
         <Stack gap={4} marginBottom={8} border="b" paddingBottom={6} borderColor="line">
            <Stack gap={1}>
              <Text variant="mono" size="micro" color="accent" uppercase>Title</Text>
              <Text weight="bold" size="2xl">{data.title || 'Untitled Draft'}</Text>
            </Stack>
            <Grid cols={3} gap={4}>
               <Stack gap={0.5}>
                  <Text variant="mono" size="micro" color="dim" uppercase>Date</Text>
                  <Text size="xs">{data.date}</Text>
               </Stack>
               <Stack gap={0.5}>
                  <Text variant="mono" size="micro" color="dim" uppercase>Category</Text>
                  <Text size="xs">{data.category}</Text>
               </Stack>
               <Stack gap={0.5}>
                  <Text variant="mono" size="micro" color="dim" uppercase>Author</Text>
                  <Text size="xs">{data.author}</Text>
               </Stack>
            </Grid>
            <Stack gap={1}>
              <Text variant="mono" size="micro" color="dim" uppercase>Excerpt</Text>
              <Text size="sm" italic color="body" className="leading-relaxed">{data.excerpt || 'No excerpt provided...'}</Text>
            </Stack>
         </Stack>

         {/* Markdown Content */}
         <div className="prose prose-sm prose-invert max-w-none">
            <ReactMarkdown>{markdownBody}</ReactMarkdown>
         </div>
       </Box>

       <Button 
         as="a"
         href={githubIssueUrl}
         target="_blank"
         rel="noopener noreferrer"
         variant="solid"
         surface="github"
         radius="lg"
         size="lg"
         fullWidth
         shadow="lg"
         className="hover:bg-accent-brand hover:text-bg transition-all duration-300 group cursor-pointer active:scale-[0.99]"
       >
         <Github className="w-5 h-5 text-bg" />
         <Text weight="bold" color="bg">Submit Draft to GitHub</Text>
         <ExternalLink className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity text-bg" />
       </Button>
    </Stack>
  );
};
