import { motion } from 'motion/react';
import { NavLink } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useHome } from './useHome';
import { SectionHeader } from '@/components/ui/PageHeader';
import PathSelector from '@/components/ui/PathSelector';
import { ContentCard } from '@/components/ui/ContentCard';
import { EventCard } from './EventCard';

export default function Home() {
  const { recentPosts, upcomingEvents } = useHome();

  return (
    <section>
      <div className="flex flex-col gap-24">
        <div className="flex flex-col gap-12 pt-12">
          <div className="flex flex-col gap-4">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-display font-bold uppercase tracking-tighter leading-tight text-5xl md:text-7xl text-accent-navy max-w-4xl"
            >
              The Roboticist&apos;s Guide to the West Coast Swing
            </motion.h1>
            <p className="font-sans leading-relaxed text-text-body text-xl text-text-dim max-w-3xl">
              Tools, travel hacks, and comp data to maximize your WCS weekends. Providing the systems, travel hacks, and informed competition analysis you need to maximize your WCS (West Coast Swing) lifestyle.
            </p>
            <p className="font-sans leading-relaxed text-text-body text-base text-text-dim max-w-2xl mt-2">
              Welcome to tech-dancer. Enjoy the west coast swing content or dive into the technical details.
            </p>
          </div>
        </div>

        <PathSelector />

        <div className="flex flex-col gap-12">
          <SectionHeader label="LATEST UPDATES" title="Recent Blog Posts">
            <NavLink
              to="/blog"
              className="flex items-center gap-3 text-text-dim hover:text-accent transition-colors"
            >
              <span className="font-mono tracking-widest uppercase text-xs font-bold">View full repository</span>
              <ArrowRight className="w-4 h-4" />
            </NavLink>
          </SectionHeader>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {recentPosts.map((post) => (
              <ContentCard 
                key={post.slug}
                {...post}
                basePath="/blog"
                aspect="video"
              />
            ))}

            {/* Upcoming Events Mini-Cards */}
            {upcomingEvents.map((event) => (
              <EventCard key={event.name} {...event} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
