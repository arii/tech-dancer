import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getPosts, getEvents, getSiteConfig } from '@/lib/content';
import { Home as HomeIcon } from 'lucide-react';

export function useHome() {
  const navigate = useNavigate();
  const { data: recentPosts = [] } = useQuery({
    queryKey: ['posts', 'recent'],
    queryFn: () => getPosts().slice(0, 3),
  });

  const { data: siteConfig } = useQuery({
    queryKey: ['site-config'],
    queryFn: getSiteConfig,
  });

  const { data: events = [] } = useQuery({
    queryKey: ['events'],
    queryFn: getEvents,
  });

  const upcomingEvents = events.map(event => ({
    name: event.title,
    date: event.schedule,
    status: event.city,
    icon: HomeIcon
  }));

  const handleNavigateToBlog = () => navigate('/blog');
  const handleNavigateToPost = (slug: string) => navigate(`/blog/${slug}`);
  const handleNavigate = (path: string) => navigate(path);

  return { 
    recentPosts, 
    upcomingEvents,
    siteConfig,
    handleNavigateToBlog,
    handleNavigateToPost,
    handleNavigate
  };
}
