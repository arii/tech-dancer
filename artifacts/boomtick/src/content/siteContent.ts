import firstComp from "@assets/first_comp_1777789859021.jpg";
import roboticist from "@assets/roboticist_1777789859029.jpg";
import monterey from "@assets/monterey_1777789859029.jpg";
import madJam from "@assets/mad_jam_ari_1777789859029.jpg";
import glowBunny from "@assets/glow_bunny_1777789859030.jpg";
import wwwAri from "@assets/www_ari_1777789859030.jpg";
import { Calendar, Clock3, Code2, Globe, Github, Instagram, Linkedin, MapPin, Megaphone, Search, ShoppingBag, Sparkles, Bot } from "lucide-react";

export const blogPosts = [
  {
    tag: "Travel",
    date: "2026-04-19",
    title: "The WCS Travel Pack: 3 Essentials You're Forgetting",
    excerpt: "Loop earplugs, industrial travel steamers, and portable sound. Why these three pieces of gear are the secret to a better dance weekend.",
    href: "https://boomtick.blog/blog/2026-04-19-gear-essentials",
  },
  {
    tag: "Training",
    date: "2026-04-18",
    title: "Focus on Results, Not Scores",
    excerpt: "How shifting your mindset from placements to personal growth changes the way you compete — and how you feel at the end of a weekend.",
    href: "https://boomtick.blog/blog",
  },
  {
    tag: "Data Lab",
    date: "2026-04-18",
    title: "Coming Soon: WCS Competition Data Scraper",
    excerpt: "Announcing a new tool for objective, ethical analysis of West Coast Swing competition data.",
    href: "https://boomtick.blog/blog/2026-04-18-competition-metrics",
  },
];

export const upcomingEvents = [
  { name: "Mission City Swing", location: "San Jose, CA", cadence: "Every Wednesday" },
  { name: "US Open Swing Dance Championships", location: "Burbank, CA", cadence: "November" },
  { name: "Swing Diego", location: "San Diego, CA", cadence: "January" },
];

export const tagColors: Record<string, string> = {
  Travel: "text-secondary border-secondary/40",
  Training: "text-primary border-primary/40",
  "Data Lab": "text-accent border-accent/40",
  Gear: "text-primary border-primary/40",
};

export const aboutPillars = [
  { icon: Sparkles, title: "Style", text: "Bright outfits, clean lines, and personal expression." },
  { icon: Clock3, title: "Timing", text: "Musicality and precision matter just as much as flash." },
  { icon: MapPin, title: "Travel", text: "Every weekend is a chance to see new floors, new people, and new ideas." },
];

export const photos = [
  { src: firstComp, alt: "West Coast Swing competition moment" },
  { src: monterey, alt: "West Coast Swing stage pose" },
  { src: madJam, alt: "West Coast Swing social dance" },
  { src: glowBunny, alt: "Glow bunny dance costume" },
  { src: wwwAri, alt: "West Coast Swing floor connection" },
  { src: roboticist, alt: "Portrait photo" },
];

export const sidebarNavItems = [
  { icon: Search, label: "Search", href: "/" },
  { icon: ShoppingBag, label: "Gear Reviews", href: "/" },
  { icon: Calendar, label: "Events", href: "/" },
  { icon: Megaphone, label: "Data Lab", href: "/" },
  { icon: Globe, label: "About", href: "/about" },
];

export const aboutConnectItems = [
  { label: "Instagram", icon: Instagram, href: "https://instagram.com/" },
  { label: "LinkedIn", icon: Linkedin, href: "https://linkedin.com/in/arianders" },
  { label: "GitHub", icon: Github, href: "https://github.com/arii" },
  { label: "Portfolio", icon: Globe, href: "https://arii.github.io/" },
];

export const aboutServiceCards = [
  {
    icon: Code2,
    title: "Robotics & Engineering",
    text: "Robot software engineering and architecture for scalable, production-ready systems — including perception, motion planning, custom visualization tools, AWS IoT telemetry, and reliable CI/CD and DevOps pipelines.",
  },
  {
    icon: Bot,
    title: "AI Strategy (DevAI)",
    text: "Generative AI tools for internal developer workflows and content management. Built examples include boomtick.blog and a heartrate-monitoring WebBluetooth fitness system, with the underlying agentic workflows visible on GitHub at github.com/arii.",
  },
  {
    icon: Megaphone,
    title: "Digital Presence & Management",
    text: "Websites, merch stores, SEO, booking tools, and content workflows for artists and niche brands. I handle the technical logistics from start to finish so you can stay focused on your craft.",
  },
];