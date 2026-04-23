import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getPosts } from '@/lib/content';
import { Home as HomeIcon } from 'lucide-react';
import { tools } from '@/lib/tools';

export const upcomingEvents = [
  { name: 'Mission City Swing', date: 'Every Wednesday', status: 'Local Regular', icon: HomeIcon },
];

export function useHome() {
  const navigate = useNavigate();
  const { data: recentPosts = [] } = useQuery({
    queryKey: ['posts', 'recent'],
    queryFn: () => getPosts().slice(0, 3),
  });

  const handleNavigateToBlog = () => navigate('/blog');
  const handleNavigateToPost = (slug: string) => navigate(`/blog/${slug}`);
  const handleNavigate = (path: string) => navigate(path);

  return { 
    recentPosts, 
    upcomingEvents,
    tools: tools.slice(0, 6),
    handleNavigateToBlog,
    handleNavigateToPost,
    handleNavigate
  };
}
