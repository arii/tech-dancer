import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getPosts, Post } from '@/lib/content';

export function useHome() {
  const navigate = useNavigate();
  const [recentPosts, setRecentPosts] = useState<Post[]>([]);

  useEffect(() => {
    const allPosts = getPosts();
    setRecentPosts(allPosts.slice(0, 3));
  }, []);

  const dancerPaths = [
    { label: "Lifestyle blog posts", path: "/blog?category=lifestyle" },
    { label: "Gear reviews", path: "/gear" }
  ];

  const hirePaths = [
    { label: "Tech blog posts", path: "/blog?category=tech" },
    { label: "Data and Development Lab", path: "/research" },
    { label: "About/Contact page", path: "/about" }
  ];

  const handleNavigateToBlog = () => navigate('/blog');
  const handleNavigateToPost = (slug: string) => navigate(`/blog/${slug}`);
  const handleNavigate = (path: string) => navigate(path);

  return { 
    recentPosts, 
    dancerPaths,
    hirePaths,
    handleNavigateToBlog,
    handleNavigateToPost,
    handleNavigate
  };
}
