import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, Clock, Tag, ExternalLink } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { Box, Stack, Text } from '@/layouts/Primitives';
import { getResourceBySlug } from '@/lib/content';
import { affiliateManager } from '@/lib/affiliateManager';

export default function GearPost() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const resource = slug ? getResourceBySlug(slug) : undefined;

  if (!resource) {
    return (
      <Box padding="panel" textAlign="center">
        <Stack gap={8} align="center">
          <Text variant="display" size="2xl">Review Not Found</Text>
          <Box as="button" onClick={() => navigate('/gear')} className="hover:text-accent-brand transition-colors">
            <Text variant="mono" size="xs">Back to Toolbox</Text>
          </Box>
        </Stack>
      </Box>
    );
  }

  const affiliateLinks = resource.affiliateIds?.map(id => affiliateManager.getLink(id)).filter(Boolean);

  return (
    <Box as="article" padding="panel">
      <Stack gap={12} maxWidth="5xl" marginX="auto" className="w-full">
        <Box
          as="button"
          onClick={() => navigate('/gear')}
          display="flex"
          align="center"
          gap={2}
          color="dim"
          className="hover:text-accent-brand transition-colors"
          cursor="pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <Text variant="mono" size="xs" weight="font-bold">Back to Toolbox</Text>
        </Box>

        <Stack gap={8}>
          <Box display="flex" align="center" gap={4}>
            <Box display="flex" align="center" gap={2} color="brand">
              <Tag className="w-3 h-3" />
              <Text variant="mono" size="micro" weight="font-bold" className="uppercase">{resource.category}</Text>
            </Box>
            <Box display="flex" align="center" gap={2} color="dim">
              <Clock className="w-3 h-3" />
              <Text variant="mono" size="micro">{resource.date}</Text>
            </Box>
          </Box>

          <Text variant="headline" size="fluid-8" className="tracking-tighter leading-none">
            {resource.title}
          </Text>

          {resource.image && (
            <Box
              as={motion.div}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              aspect="video"
              overflow="hidden"
              border
              className="bg-muted"
            >
              <img
                src={resource.image}
                alt={resource.title}
                className="w-full h-full object-cover"
              />
            </Box>
          )}

          {affiliateLinks && affiliateLinks.length > 0 && (
            <Box border padding={6} className="bg-surface/50 border-accent/20">
              <Stack gap={4}>
                <Text variant="mono" size="xs" weight="font-bold" color="brand">FEATURED GEAR</Text>
                <Box display="flex" flexWrap="wrap" gap={4}>
                  {affiliateLinks.map((link) => link && (
                    <Box
                      key={link.id}
                      as="a"
                      href={affiliateManager.resolveUrl(link.id)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 px-4 py-2 bg-surface border border-line hover:border-accent transition-colors"
                    >
                      <Stack gap={1}>
                        <Text variant="mono" size="xs" weight="font-bold">{link.name}</Text>
                        <Text variant="mono" size="micro" color="dim" className="max-w-xs line-clamp-1">{link.description}</Text>
                      </Stack>
                      <ExternalLink className="w-3 h-3 text-accent" />
                    </Box>
                  ))}
                </Box>
              </Stack>
            </Box>
          )}

          <Box className="prose prose-sm md:prose-base prose-slate max-w-none w-full overflow-hidden break-words prose-headings:font-display prose-p:font-sans prose-p:text-text-dim prose-strong:text-text-main">
            <ReactMarkdown
              components={{
                a: ({node, ...props}) => <a {...props} rel="noopener noreferrer" target="_blank" />
              }}
            >
              {resource.content}
            </ReactMarkdown>
          </Box>

          <Box border="t" paddingTop={12} display="flex" justify="between" align="center">
            <Stack gap={2}>
              <Text variant="mono" size="micro" color="dim">REVIEWED BY</Text>
              <Text variant="mono" size="xs" weight="font-bold">Ariel</Text>
            </Stack>
          </Box>
        </Stack>
      </Stack>
    </Box>
  );
}
