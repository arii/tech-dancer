import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getPosts } from '@/lib/content';
import { Calendar, MapPin } from 'lucide-react';

/** Matches `artifacts/boomtick/index.html` “Where Dancers Go” cards (venue + location + cadence). */
export const upcomingEvents = [
  { name: 'Mission City Swing', date: 'San Jose, CA', status: 'Every Wednesday', icon: MapPin },
  { name: 'US Open Swing Dance Championships', date: 'Burbank, CA', status: 'November', icon: Calendar },
  { name: 'Swing Diego', date: 'San Diego, CA', status: 'January', icon: Calendar },
];

export function useHome() {
  const navigate = useNavigate();
  const { data: recentPosts = [] } = useQuery({
    queryKey: ['posts', 'recent'],
    queryFn: () => getPosts().slice(0, 3),
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
    upcomingEvents,
    dancerPaths,
    hirePaths,
    handleNavigateToBlog,
    handleNavigateToPost,
    handleNavigate
  };
}
