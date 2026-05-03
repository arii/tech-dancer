import { ProfileData } from './types';
import dancerHero from '@/assets/dancer_hero.webp';
import roboticistHero from '@/assets/roboticist_hero.webp';

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
      content: "boomtick.blog is where I share the systems behind a sustainable WCS lifestyle: practical travel advice, gear that actually helps, event tips, and the small optimizations that make a big difference over a season of dancing."
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
      id: "gallery",
      title: "WCS Moments",
      gallery: [
        { src: dancerHero, alt: "West Coast Swing competition moment" },
        { src: roboticistHero, alt: "West Coast Swing stage pose" },
        { src: dancerHero, alt: "West Coast Swing social dance" },
        { src: roboticistHero, alt: "Glow bunny dance costume" },
        { src: dancerHero, alt: "West Coast Swing floor connection" },
        { src: roboticistHero, alt: "Portrait photo" }
      ]
    }
  ],
  details: [
    { label: "EDUCATION", value: "PhD in Computer Science, MIT" },
    { label: "FOCUS", value: "Robotics // AI // Data Analytics" },
    { label: "DANCE LEVEL", value: "Competitive Intermediate Follow" }
  ],
  links: [
    { label: 'INSTAGRAM', url: 'https://instagram.com/' },
    { label: 'LINKEDIN', url: 'https://linkedin.com/in/arianders' },
    { label: 'GITHUB', url: 'https://github.com/arii' },
    { label: 'PORTFOLIO', url: 'https://arii.github.io/' }
  ]
};

export function useProfile(): { bio: ProfileData } {
  return { bio: PROFILE_DATA };
}
