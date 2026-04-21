import { motion } from 'motion/react';
import { Box, Stack, Grid } from '@/layouts/Primitives';
import { PageHeader } from '@/components/ui/PageHeader';
import { useProfile } from './useProfile';
import ProfileSidebar from './ProfileSidebar';
import BioContent from './BioContent';

export default function ArielProfile() {
  const { bio } = useProfile();

  return (
    <Box as="section" maxWidth="screen-2xl" marginX="auto">
      <Stack gap={12}>
        <PageHeader 
          label="ABOUT TECH-DANCER"
          title={bio.name}
          description={bio.role}
        />

        <Grid cols={{ base: 1, lg: "1fr 2fr" }} gap={{ base: 8, lg: 20 }}>
          <Box
            as={motion.div}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} // ease-out-expo
          >
            <ProfileSidebar data={bio} />
          </Box>

          <Box
            as={motion.div}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }} // ease-out-expo
          >
            <BioContent data={bio} />
          </Box>
        </Grid>
      </Stack>
    </Box>
  );
}
