import { lazy, Suspense } from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { Box, Stack, Text, Grid } from '@/layouts/Primitives';
import { useHome } from './useHome';
import { SEO } from '@/components/SEO';
import { PageHeader, SectionHeader } from '@/components/ui/PageHeader';
import PathSelector from '@/components/ui/PathSelector';
          <Grid
            cols={{ base: 1, sm: 2, lg: 4 }}
            gap={4}
            as={motion.div}
            variants={motionTokens.staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-50px" }}
          >
            {recentPosts.map((post) => (
              <Box
                key={post.slug}
                as={motion.div}
                variants={motionTokens.staggerItem}
              >
                <ContentCard
                  {...post}
                  basePath="/blog"
                  aspect="video"
                />
              </Box>
            ))}

            {/* Upcoming Events Mini-Cards */}
            {upcomingEvents.map((event) => (
              <Box
                key={event.name}
                as={motion.div}
                variants={motionTokens.staggerItem}
              >
                <EventCard {...event} />
              </Box>
            ))}
          </Grid>
          </Grid>
        </Stack>
      </Stack>
    </Box>
  );
}

function RecentPostsSkeleton() {
  return (
    <>
      {[1, 2, 3].map((i) => (
        <ContentCardSkeleton key={i} />
      ))}
    </>
  );
}
