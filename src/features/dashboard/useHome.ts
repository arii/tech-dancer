import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getPosts, getEvents, getResources } from '@/lib/content';

/** Provides data for the new dashboard layout with HeroSpotlight, GearCarousel, and DevLabTerminal sections. */
export function useHome() {
  const navigate = useNavigate();

  const { data: allPosts = [] } = useQuery({
    queryKey: ['posts', 'all'],
    queryFn: () => getPosts(),
    initialData: () => getPosts(),
  });

  const { data: gearItems = [] } = useQuery({
    queryKey: ['resources', 'gear'],
    queryFn: () => getResources().slice(0, 6),
    initialData: () => getResources().slice(0, 6),
  });

  const { data: upcomingEvents = [] } = useQuery({
    queryKey: ['events', 'upcoming'],
    queryFn: () => getEvents().slice(0, 3),
    initialData: () => getEvents().slice(0, 3),
  });

  // Split posts by category
  const dancePosts = allPosts.filter(p => !p.category?.toLowerCase().includes('tech') && !p.category?.toLowerCase().includes('data') && !p.category?.toLowerCase().includes('research'));
  const devPosts = allPosts.filter(p => p.category?.toLowerCase().includes('tech') || p.category?.toLowerCase().includes('data') || p.category?.toLowerCase().includes('research'));

  // Prefer dance content for the hero; fall back to the latest post so homepage sections always render
  const featuredPost = dancePosts[0] ?? allPosts[0];
  const heroPool = dancePosts.length > 0 ? dancePosts : allPosts;
  const recentPosts = heroPool.filter(post => post.slug !== featuredPost?.slug).slice(0, 3);

  const handleNavigateToBlog = () => navigate('/blog');
  const handleNavigateToPost = (slug: string) => navigate(`/blog/${slug}`);
  const handleNavigate = (path: string) => navigate(path);

  return { 
    featuredPost,
    recentPosts,
    gearItems,
    devPosts: devPosts.slice(0, 4),
    upcomingEvents: upcomingEvents.map(event => ({
      slug: event.slug,
      title: event.title,
      location: event.location,
      schedule: event.schedule,
    })),
    handleNavigateToBlog,
    handleNavigateToPost,
    handleNavigate
  };
}
