import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getPosts, Post } from '@/lib/content';
import { Home as HomeIcon } from 'lucide-react';

export function useHome() {
  const navigate = useNavigate();
  const [recentPosts, setRecentPosts] = useState<Post[]>([]);

  useEffect(() => {
    const allPosts = getPosts();
    setRecentPosts(allPosts.slice(0, 3));
  }, []);

  const upcomingEvents = [
    { name: 'Mission City Swing', date: 'Every Wednesday', status: 'Local Regular', icon: HomeIcon },
  ];

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
