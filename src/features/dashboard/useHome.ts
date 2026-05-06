import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getPosts, getEvents } from '@/lib/content';

/** Matches `artifacts/boomtick/index.html` “Where Dancers Go” cards (venue + location + cadence). */
export function useHome() {
  const navigate = useNavigate();
  const { data: recentPosts = [] } = useQuery({
    queryKey: ['posts', 'recent'],
    queryFn: () => getPosts().slice(0, 3),
    initialData: () => getPosts().slice(0, 3),
  });

  const { data: upcomingEvents = [] } = useQuery({
    queryKey: ['events', 'upcoming'],
    queryFn: () => getEvents().slice(0, 3),
    initialData: () => getEvents().slice(0, 3),
  });

  const dancerPaths = [
    { label: "Lifestyle blog posts", path: "/blog?category=Travel/Lifestyle" },
    { label: "Gear reviews", path: "/gear" }
  ];

  const hirePaths = [
    { label: "Tech blog posts", path: "/blog?category=Tech" },
    { label: "Data and Development Lab", path: "/research" },
    { label: "About/Contact page", path: "/about" }
  ];

  const handleNavigateToBlog = () => navigate('/blog');
  const handleNavigateToPost = (slug: string) => navigate(`/blog/${slug}`);
  const handleNavigate = (path: string) => navigate(path);

  return { 
    recentPosts, 
    upcomingEvents: upcomingEvents.map(event => ({
      name: event.title,
      location: event.location,
      schedule: event.schedule,
    })),
    dancerPaths,
    hirePaths,
    handleNavigateToBlog,
    handleNavigateToPost,
    handleNavigate
  };
}
