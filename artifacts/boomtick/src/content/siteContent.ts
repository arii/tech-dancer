import firstComp from "@assets/first_comp_1777789859021.jpg";
import roboticist from "@assets/roboticist_1777789859029.jpg";
import monterey from "@assets/monterey_1777789859029.jpg";
import madJam from "@assets/mad_jam_ari_1777789859029.jpg";
import glowBunny from "@assets/glow_bunny_1777789859030.jpg";
import wwwAri from "@assets/www_ari_1777789859030.jpg";
import { Calendar, Clock3, Code2, Globe, Github, Instagram, Linkedin, MapPin, Megaphone, Search, ShoppingBag, Sparkles, Bot, Mail } from "lucide-react";

export const blogPosts = [
  {
    tag: "Tech",
    date: "2026-04-20",
    title: "Stop Wasting Vercel Credits: Deploy Every Branch to GitHub Pages",
    excerpt: "Time is your most precious commodity. Narrow the gap between coding and seeing your changes by deploying every branch to GitHub Pages.",
    href: "https://boomtick.blog/blog/2026-04-20-stop-wasting-vercel-credits-deploy-every-branch-to-github-pages",
  },
  {
    tag: "Travel",
    date: "2026-04-19",
    title: "The WCS Travel Pack: 3 Essentials You're Forgetting",
    excerpt: "Loop earplugs, industrial travel steamers, and portable sound. Why these three pieces of gear are the secret to a better dance weekend.",
    href: "https://boomtick.blog/blog/2026-04-19-gear-essentials",
  },
  {
    tag: "Dance Research",
    date: "2026-04-18",
    title: "Coming Soon: WCS Competition Data Scraper",
    excerpt: "Announcing a new tool for objective, ethical analysis of West Coast Swing competition data.",
    href: "https://boomtick.blog/blog/2026-04-18-competition-metrics",
  },
  {
    tag: "Travel/Lifestyle",
    date: "2026-04-18",
    title: "Coming Soon: The Comprehensive Financial Strategy Guide for Dancers",
    excerpt: "A deep dive into financial literacy for dancers: maximizing travel perks while maintaining a responsible lifestyle.",
    href: "https://boomtick.blog/blog/2026-04-18-financial-literacy-dancers",
  },
  {
    tag: "Tech",
    date: "2026-04-18",
    title: "How I used GitHub Actions to power this site",
    excerpt: "Automated deployments and CI/CD pipelines for a tech-forward dance blog.",
    href: "https://boomtick.blog/blog/2026-04-18-github-actions",
  },
  {
    tag: "Gear Reviews",
    date: "2026-04-18",
    title: "Halloween costumes you can dance in",
    excerpt: "How to stay thematic without sacrificing your spin or frame. Featuring the pumpkin outfit stress-test.",
    href: "https://boomtick.blog/blog/2026-04-18-halloween-costumes",
  },
  {
    tag: "Gear Reviews",
    date: "2026-04-18",
    title: "Make any shoe a dance shoe",
    excerpt: "Suede your dance shoes with a $15 DIY hack. A comparison of sticker coverage and traction response.",
    href: "https://boomtick.blog/blog/2026-04-18-make-shoe-dance",
  },
  {
    tag: "Data & Dev Lab",
    date: "2026-04-18",
    title: "The majority of above average dancers don’t make it to finals",
    excerpt: "A statistical look at competition heat density and judge variance, explaining why placement is a poor metric for progress.",
    href: "https://boomtick.blog/blog/2026-04-18-why-finals-are-hard",
  },
];

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
  { icon: ShoppingBag, label: "Gear Reviews", href: "/gear" },
  { icon: Calendar, label: "Data & Development Lab", href: "/research" },
  { icon: Megaphone, label: "Blog Posts", href: "/blog" },
  { icon: Globe, label: "About", href: "/about" },
  { icon: Mail, label: "Contact", href: "/contact" },
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