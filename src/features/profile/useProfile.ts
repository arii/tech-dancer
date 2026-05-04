import { Sparkles, Clock3, MapPin, Instagram, Linkedin, Github, Globe, Code2, Bot, Megaphone } from "lucide-react";
import roboticist from "@/assets/roboticist_hero.webp";
import dancer from "@/assets/dancer_hero.webp";

export const aboutPillars = [
  { icon: Sparkles, title: "Style", text: "Bright outfits, clean lines, and personal expression." },
  { icon: Clock3, title: "Timing", text: "Musicality and precision matter just as much as flash." },
  { icon: MapPin, title: "Travel", text: "Every weekend is a chance to see new floors, new people, and new ideas." },
];

export const photos = [
  { src: dancer, alt: "West Coast Swing connection moment" },
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

export function useProfile() {
  return {
    aboutPillars,
    photos,
    aboutConnectItems,
    aboutServiceCards
  };
}
