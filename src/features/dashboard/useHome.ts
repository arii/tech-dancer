import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getPosts, Post } from '@/lib/content';
import { Home as HomeIcon } from 'lucide-react';
import { useResearch } from '../research/useResearch';

export const upcomingEvents = [
  { name: 'Mission City Swing', date: 'Every Wednesday', status: 'Local Regular', icon: HomeIcon },
];

export function useHome() {
  const navigate = useNavigate();
  const [recentPosts, setRecentPosts] = useState<Post[]>([]);
  const { tools } = useResearch();

  useEffect(() => {
    const allPosts = getPosts();
    setRecentPosts(allPosts.slice(0, 3));
  }, []);

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
    tools: tools.slice(0, 6),
    dancerPaths,
    hirePaths,
    handleNavigateToBlog,
    handleNavigateToPost,
    handleNavigate
  };
}
