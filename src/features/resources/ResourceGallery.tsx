import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, ArrowRight, Database, Plane, Scissors, Calendar, ArrowLeft, Activity, Shield, AlertCircle } from 'lucide-react';
import Markdown from 'react-markdown';
import { Box, Stack, Text, Grid } from '@/layouts/Primitives';
import { Resource } from '@/lib/content';
import { useResources } from './useResources';

export default function ResourceGallery() {
  const { resources, selectedResource, handleSelect, handleClear, isLoading, error } = useResources();

  if (error) {
    return (
      <Box as="section" padding="panel" display="flex" align="center" justify="center">
        <Stack gap={4} align="center" textAlign="center">
          <Box display="flex" align="center" justify="center" opacity={20} color="brand">
            <AlertCircle className="w-12 h-12" />
          </Box>
          <Text variant="display" size="2xl">Resource Access Failed</Text>
          <Text variant="mono" size="xs" color="dim">{error}</Text>
        </Stack>
      </Box>
    );
  }

  return (
    <Box as="section" padding="panel">
      <AnimatePresence mode="wait">
        {selectedResource ? (
          <ResourceDetails 
            key="details" 
            resource={selectedResource} 
            onBack={handleClear} 
          />
        ) : (
          <ResourceList 
            key="list" 
            resources={resources} 
            onSelect={handleSelect}
            isLoading={isLoading}
          />
        )}
      </AnimatePresence>
    </Box>
  );
}

function ResourceDetails({ resource, onBack }: { resource: Resource; onBack: () => void }) {
  return (
    <Box as={motion.div} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
      <Box 
        as="button" 
        onClick={onBack}
        display="flex" 
        align="center" 
        gap={2} 
        color="brand" 
        marginBottom={12}
        cursor="pointer"
        className="hover:-translate-x-1 transition-transform"
      >
        <ArrowLeft className="w-4 h-4" />
        <Text variant="mono" size="micro" weight="font-bold">Back to Reviews</Text>
      </Box>

      <Stack gap={16} maxWidth="4xl" marginX="auto">
        <Stack gap={6}>
          <Box display="flex" justify="between" align="center" border="b" paddingBottom={4}>
            <Text variant="mono" weight="font-bold">ITEM: {resource.slug.toUpperCase()}</Text>
            <Stack direction="row" align="center" gap={3}>
              <Calendar className="w-3 h-3 text-text-dim" />
              <Text variant="mono" size="micro" color="dim">{resource.date}</Text>
            </Stack>
          </Box>
          <Stack gap={2}>
            <Text variant="mono" color="brand" weight="font-bold" uppercase>{resource.category}</Text>
            <Text variant="headline" size="8xl">{resource.title}</Text>
          </Stack>
        </Stack>

        <Box className="markdown-body prose prose-sm md:prose-base prose-invert max-w-none w-full overflow-hidden break-words text-text-body space-y-6">
          <Markdown>{resource.content}</Markdown>
        </Box>
      </Stack>
    </Box>
  );
}

function ResourceListSkeleton() {
  return (
    <>
      {Array.from({ length: 4 }).map((_, i) => (
        <Box
          key={i}
          span={{ base: 12, md: i % 2 === 0 ? 7 : 5 }}
          surface="default"
          padding="nav"
          border
          className="animate-pulse"
        >
          <Stack gap={12} height="full">
            <Box width={8} height={8} surface="muted" />
            <Stack gap={6}>
               <Box width={20} height={4} surface="muted" />
               <Box width="full" height={8} surface="muted" />
               <Box width="3/4" height={4} surface="muted" />
            </Stack>
          </Stack>
        </Box>
      ))}
    </>
  );
}

function ResourceListItems({ resources, onSelect }: { resources: Resource[]; onSelect: (resource: Resource) => void }) {
  const getIcon = (category: string) => {
    switch (category) {
      case 'Travel': return Plane;
      case 'Systems': return Database;
      case 'Gear': return Scissors;
      case 'Recovery': return Activity;
      case 'Focus': return Shield;
      default: return BookOpen;
    }
  };

  return (
    <>
      {resources.map((resource, i) => {
        const Icon = getIcon(resource.category);
        const isWide = i % 2 === 0;
        return (
          <Box
            key={resource.slug}
            span={{ base: 12, md: isWide ? 7 : 5 }}
            as={motion.div}
            whileHover={{ x: 2, scale: 1.002 }}
            onClick={() => onSelect(resource)}
            surface="default"
            padding="nav"
            border
            cursor="pointer"
            className="group hover:bg-surface transition-colors"
          >
            <Stack gap={12} height="full">
              <Box display="flex" justify="between" align="start">
                <Icon className="w-8 h-8 stroke-1 text-accent-brand group-hover:scale-110 transition-transform" />
                <Text variant="mono" size="micro" color="dim">REVIEW</Text>
              </Box>
              <Stack gap={6}>
                <Stack direction="row" align="center" gap={3}>
                  <Text variant="mono" color="brand" weight="font-bold">{resource.category}</Text>
                  <Box border className="border-accent-brand/30 px-2 py-0.5">
                    <Text variant="mono" color="brand" weight="font-bold" size="micro">REVIEW</Text>
                  </Box>
                </Stack>
                <Stack gap={2}>
                  <Text variant="display" size="2xl" className="group-hover:text-accent-brand transition-colors">
                    {resource.title}
                  </Text>
                  <Text variant="body" size="sm" color="dim" className="line-clamp-3">
                    {resource.excerpt}
                  </Text>
                </Stack>
              </Stack>
              <Box display="flex" align="center" gap={3} marginTop="auto" color="dim" className="group-hover:text-accent-brand transition-colors">
                <Text variant="mono" size="xs" weight="font-bold">Read Review</Text>
                <ArrowRight className="w-4 h-4" />
              </Box>
            </Stack>
          </Box>
        );
      })}
    </>
  );
}

function ResourceList({ resources, onSelect, isLoading }: { resources: Resource[]; onSelect: (resource: Resource) => void; isLoading: boolean }) {
  return (
    <Box as={motion.div} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <Stack gap={12} marginBottom={24}>
        <Stack gap={4}>
          <Text variant="headline" size="9xl">Reviews.</Text>
          <Text variant="body" size="xl" maxWidth="2xl" color="body">
            Shoes, floor conditions, and equipment. Curated assessments for WCS Events.
          </Text>
        </Stack>
        
        <Box border surface="default" overflow="hidden">
          <Box aspect="video" position="relative" overflow="hidden" backgroundColor="muted">
            <Box position="absolute" inset display="flex" align="center" justify="center">
               <Scissors className="w-24 h-24 text-line stroke-[0.5]" />
            </Box>
          </Box>
          <Stack padding="card" gap={4}>
            <Text variant="display" size="4xl">Verified Equipment.</Text>
            <Text variant="body" size="lg" color="dim" maxWidth="3xl">
              I test equipment on different floor types and competition environments to find what actually works for social dancers and competitors.
            </Text>
          </Stack>
        </Box>
      </Stack>

      <Grid cols={{ base: 1, md: 12 }} border className="bg-line">
        {isLoading ? (
          <ResourceListSkeleton />
        ) : (
          <ResourceListItems resources={resources} onSelect={onSelect} />
        )}
      </Grid>
    </Box>
  );
}
