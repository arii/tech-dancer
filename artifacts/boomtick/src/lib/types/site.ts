import firstComp from "@assets/first_comp_1777789859021.jpg";
import roboticist from "@assets/roboticist_1777789859029.jpg";
import monterey from "@assets/monterey_1777789859029.jpg";
import madJam from "@assets/mad_jam_ari_1777789859029.jpg";
import glowBunny from "@assets/glow_bunny_1777789859030.jpg";
import wwwAri from "@assets/www_ari_1777789859030.jpg";
import { Bot, Clock3, Code2, Github, Globe, Instagram, Linkedin, MapPin, Megaphone, Sparkles } from "lucide-react";

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
    text: "Robot software engineering and architecture for scalable systems, including perception, motion planning, custom visualization tools, AWS IoT telemetry, and dependable CI/CD pipelines.",
  },
  {
    icon: Bot,
    title: "AI Strategy",
    text: "Generative AI tools for internal workflows and content management. Examples include boomtick.blog and a heartrate-monitoring WebBluetooth fitness system.",
  },
  {
    icon: Megaphone,
    title: "Digital Presence & Management",
    text: "Websites, merch stores, SEO, booking tools, and content workflows for artists and niche brands. I handle the technical logistics so you can stay focused on your craft.",
  },
];
