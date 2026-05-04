import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getPosts } from '@/lib/content';

export const upcomingEvents = [
  { name: "Mission City Swing", location: "San Jose, CA", cadence: "Every Wednesday" },
  { name: "US Open Swing Dance Championships", location: "Burbank, CA", cadence: "November" },
  { name: "Swing Diego", location: "San Diego, CA", cadence: "January" },
];

export const tagColors: Record<string, string> = {
  Tech: "text-primary border-primary/40",
  Travel: "text-secondary border-secondary/40",
  "Dance Research": "text-accent border-accent/40",
  "Travel/Lifestyle": "text-secondary border-secondary/40",
  "Gear Reviews": "text-primary border-primary/40",
  "Data & Dev Lab": "text-accent border-accent/40",
  Gear: "text-primary border-primary/40",
};

export const homeHeroLinks = [
  [
    { label: "WCS Training →", href: "/blog" },
    { label: "Competition tips →", href: "/blog" },
    { label: "Gear reviews →", href: "/gear" },
  ],
  [
    { label: "Travel guides →", href: "/blog" },
    { label: "Event calendar →", href: "/research" },
    { label: "Packing lists →", href: "/gear" },
  ],
];

export function useHome() {
  const navigate = useNavigate();
  // Using the actual posts rather than hardcoded ones
  const { data: recentPosts = [] } = useQuery({
    queryKey: ['posts', 'recent'],
    queryFn: () => getPosts().slice(0, 5),
  });

  const handleNavigateToBlog = () => navigate('/blog');
  const handleNavigateToPost = (slug: string) => navigate(`/blog/${slug}`);
  const handleNavigate = (path: string) => navigate(path);

  return { 
    recentPosts, 
    upcomingEvents,
    homeHeroLinks,
    tagColors,
    handleNavigateToBlog,
    handleNavigateToPost,
    handleNavigate
  };
}
