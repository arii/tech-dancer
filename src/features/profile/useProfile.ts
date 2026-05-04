import { ProfileData } from './types';
import firstComp from '@/assets/first_comp.jpg';
import glowBunny from '@/assets/glow_bunny.jpg';
import madJamAri from '@/assets/mad_jam_ari.jpg';
import monterey from '@/assets/monterey.jpg';
import roboticist from '@/assets/roboticist.jpg';
import wwwAri from '@/assets/www_ari.jpg';

const PROFILE_DATA: ProfileData = {
  name: "Ariel Anders, PhD",
  role: "MIT Roboticist // WCS Tech-Dancer",
  sections: [
    {
      id: "dance-background",
      title: "My Dance Background",
      content: "I started in partner dance in 2019 with Lindy Hop and Fusion. After a pause from 2020 through 2022, I moved to San Francisco and got back into dancing at Lindy in the Park. A Mission City Swing series introduced me to West Coast Swing, and it clicked quickly — the music, the connection, and the creative feel of the dance made it easy to care deeply about. WCS became my main focus because it combines artistry, athleticism, and a genuinely welcoming community."
    },
    {
      id: "professional",
      title: "What I Do Professionally",
      content: "I provide high-level technical consulting for startups and project-based digital execution for niche brands.",
      cards: [
        {
          title: "Robotics & Engineering",
          content: "My background is in robot software engineering and architecture, helping startups build scalable, production-ready systems. My specialized skillsets include perception, motion planning, custom visualization tools, AWS IoT telemetry, and robust CI/CD and DevOps pipelines to keep autonomous fleets reliable and mission-ready."
        },
        {
          title: "AI Strategy (DevAI)",
          content: "I implement generative AI tools to automate internal developer tasks and content management. Products built with these DevAI tools include boomtick.blog and a heartrate-monitoring WebBluetooth fitness system. The underlying agentic workflows and internal tools are visible on my GitHub at github.com/arii."
        },
        {
          title: "Digital Presence & Management",
          content: "I help artists and niche brands build the infrastructure they need to grow — from functional websites and merch stores to SEO, booking tools, and content workflows. I handle the technical logistics from start to finish so you can stay focused on your craft."
        }
      ]
    },
    {
      id: "why-built",
      title: "Why I Built This Site",
      content: "boomtick.blog is where I share the systems behind a sustainable WCS lifestyle: practical travel advice, gear that helps, event tips, and the small optimizations that make a big difference over a season of dancing."
    },
    {
      id: "wcs-love",
      title: "What I Love About WCS",
      items: [
        {
          icon: 'star',
          title: "Style",
          description: "Bright outfits, clean lines, and personal expression."
        },
        {
          icon: 'music',
          title: "Timing",
          description: "Musicality and precision matter just as much as flash."
        },
        {
          icon: 'map-pin',
          title: "Travel",
          description: "Every weekend is a chance to see new floors, new people, and new ideas."
        }
      ]
    },
    {
      id: "financial-strategies",
      title: "Financial Strategies for WCS",
      content: "I love maximizing credit card perks and hotel benefits, which helps me make the WCS event lifestyle both high-end and feasible. The goal is to spend more energy dancing and less energy stressing over the logistics."
    },
    {
      id: "education-focus",
      items: [
        {
          title: "Education",
          description: "PhD in Computer Science, MIT"
        },
        {
          title: "Focus",
          description: "Robotics // AI // Data Analytics"
        },
        {
          title: "Dance Level",
          description: "Competitive Intermediate Follow"
        }
      ]
    },
    {
      id: "gallery",
      eyebrow: "Photo Gallery",
      title: "WCS Moments",
      gallery: [
        { src: firstComp, alt: "West Coast Swing competition moment" },
        { src: monterey, alt: "West Coast Swing stage pose" },
        { src: madJamAri, alt: "West Coast Swing social dance" },
        { src: glowBunny, alt: "Glow bunny dance costume" },
        { src: wwwAri, alt: "West Coast Swing floor connection" },
        { src: roboticist, alt: "Portrait photo" }
      ]
    },
    {
      id: "connect",
      eyebrow: "Connect & Networking",
      links: [
        { label: 'Instagram', url: 'https://instagram.com/' },
        { label: 'LinkedIn', url: 'https://linkedin.com/in/arianders' },
        { label: 'GitHub', url: 'https://github.com/arii' },
        { label: 'Portfolio', url: 'https://arii.github.io/' }
      ]
    }
  ],
  details: [
    { label: "LOCATION", value: "San Francisco, CA" },
    { label: "STYLE", value: "West Coast Swing + Lindy Hop" },
    { label: "DANCE LEVEL", value: "Competitive Intermediate Follow" }
  ],
  links: [
    { label: 'Instagram', url: 'https://instagram.com/' },
    { label: 'LinkedIn', url: 'https://linkedin.com/in/arianders' },
    { label: 'GitHub', url: 'https://github.com/arii' },
    { label: 'Portfolio', url: 'https://arii.github.io/' }
  ]
};
export function useProfile(): { bio: ProfileData } {
  return { bio: PROFILE_DATA };
}
