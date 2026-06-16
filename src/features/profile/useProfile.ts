import { ProfileData } from './types';
import { SOCIAL_LINKS } from '@/config/constants';
import firstComp from '@/assets/first_comp.jpg';
import glowBunny from '@/assets/glow_bunny.jpg';
import madJamAri from '@/assets/mad_jam_ari.jpg';
import monterey from '@/assets/monterey.jpg';
import wwwAri from '@/assets/www_ari.jpg';

const PROFILE_DATA: ProfileData = {
  name: "Ariel Anders, PhD",
  role: "Senior roboticist · DevAI engineer · West Coast Swing",
  sections: [
    {
      id: "professional",
      title: "Professional Summary",
      content: "MIT PhD and former Senior Algorithm Engineer at Civ Robotics, Waymo, and Robust.AI. I bridge the gap between shipping production robotics software and building the agentic engineering workflows that scale robotics teams. Below is a breakdown of my professional experience and independent projects.",
      cards: [
        {
          icon: 'terminal',
          title: "Robotics & Engineering",
          content: "Senior roboticist with production experience at Waymo and Robust.AI. I work across navigation, localization, motion planning, and behavior for autonomous systems. At startups, that means owning the full stack — from algorithm to Docker to deployment. Stack: ROS1/ROS2, C++, Python."
        },
        {
          icon: 'zap',
          title: "DevAI tooling (independent projects)",
          content: "I build agentic CI/CD pipelines, LLM-assisted code review, and developer tooling as self-directed projects — the tools I wish robotics teams had. Current work: RepoAuditor AI (Gemini-driven PR auditing) and BoomTick.blog (live RAG + LLM testbed in active development). Code at github.com/arii."
        },
        {
          icon: 'globe',
          title: "DevAI for robotics",
          content: "Most DevAI practitioners don't know ROS. Most roboticists aren't building agentic pipelines. I work at that intersection, helping robotics teams adopt AI-assisted engineering practices: automated code review, agentic CI/CD, and LLM tooling built by someone who has shipped production robotics software."
        }
      ],
      availability: "Open to Staff/Senior SWE roles, robotics contracts, and DevAI consulting — especially where robotics and AI-assisted engineering overlap."
    },
    {
      id: "dance-background",
      title: "My Dance Background",
      content: "I started in partner dance in 2019 with Lindy Hop and Fusion. After a pause from 2020 through 2022, I moved to San Francisco and got back into dancing at Lindy in the Park. A Mission City Swing series introduced me to West Coast Swing, and it clicked quickly — the music, the connection, and the creative feel of the dance made it easy to care deeply about. WCS became my main focus because it combines artistry, athleticism, and a genuinely welcoming community.",
      gallery: [
        { src: monterey, alt: "Ariel Anders on stage at a West Coast Swing event in Monterey, California" },
        { src: firstComp, alt: "Ariel Anders performing a West Coast Swing extension during a competition" }
      ]
    },
    {
      id: "wcs-love",
      title: "What I Love About WCS",
      gallery: [
        { src: glowBunny, alt: "Ariel Anders wearing a creative LED light-up bunny costume at a dance event" }
      ],
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
      id: "why-built",
      title: "Why I Built This Site",
      content: "boomtick.blog is where I share the practical side of a WCS lifestyle: practical travel advice, practical tools, event notes, and the small choices that make a big difference over a season of dancing.",
      gallery: [
        { src: madJamAri, alt: "Ariel Anders social dancing at the MADjam West Coast Swing convention" }
      ]
    },
    {
      id: "financial-strategies",
      title: "Financial Strategies for WCS",
      content: "I love maximizing credit card perks and hotel benefits, which helps me make the WCS event lifestyle both high-end and feasible. The goal is to spend more energy dancing and less energy stressing over the logistics.",
      gallery: [
        { src: wwwAri, alt: "Ariel Anders demonstrating athletic connection in a high-energy social dance session" }
      ]
    },
    {
      id: "connect",
      eyebrow: "Connect & Networking",
      links: [
        { label: 'Instagram', url: SOCIAL_LINKS.INSTAGRAM },
        { label: 'LinkedIn', url: SOCIAL_LINKS.LINKEDIN },
        { label: 'GitHub', url: SOCIAL_LINKS.GITHUB }
      ]
    }
  ],
  details: [
    { label: "Location", value: "San Francisco, CA" },
    { label: "Portfolio", value: "View Portfolio", url: "https://boomtick.blog/research" },
    { label: "Resume", value: "View Resume", url: "https://boomtick.blog/ariel-anders-resume.pdf" }
  ]
};

export function useProfile(): { bio: ProfileData } {
  return { bio: PROFILE_DATA };
}
