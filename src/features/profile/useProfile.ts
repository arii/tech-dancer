import { ProfileData } from './types';
import firstComp from '@/assets/first_comp.jpg';
import glowBunny from '@/assets/glow_bunny.jpg';
import madJamAri from '@/assets/mad_jam_ari.jpg';
import monterey from '@/assets/monterey.jpg';
import wwwAri from '@/assets/www_ari.jpg';

const PROFILE_DATA: ProfileData = {
  name: "Tech Dancer",
  role: "West Coast Swing Blogger // Data Science Consultant",
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
          icon: 'terminal',
          title: "Data Science & Consulting",
          content: "I leverage my background in complex systems to help startups and brands make data-driven decisions. My focus is on providing actionable insights that bridge the gap between technical metrics and real-world impact."
        },
        {
          icon: 'zap',
          title: "Content & Strategy",
          content: "I implement generative AI tools to automate content management and digital workflows. Products built with these tools include boomtick.blog, focusing on delivering high-quality, relevant content to the West Coast Swing community."
        },
        {
          icon: 'globe',
          title: "Digital Presence",
          content: "I help artists and niche brands build the infrastructure they need to grow — from functional websites and SEO to content workflows. I handle the technical logistics from start to finish so you can stay focused on your craft."
        }
      ]
    },
    {
      id: "why-built",
      title: "Why I Built This Site",
      content: "BoomTick.blog is a lifestyle and travel guide to West Coast Swing. I share the systems behind a sustainable WCS lifestyle: practical travel advice, gear that helps, event tips, and the small optimizations that make a big difference over a season of dancing."
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
          title: "Expertise",
          description: "Data Science // AI // Analytics"
        },
        {
          title: "Focus",
          description: "WCS Lifestyle // Travel // Gear"
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
        { src: firstComp, alt: "Tech Dancer performing a West Coast Swing extension at their first competition" },
        { src: monterey, alt: "Tech Dancer posing playfully on stage at a West Coast Swing event in Monterey" },
        { src: madJamAri, alt: "Tech Dancer social dancing with a partner at MADjam West Coast Swing convention" },
        { src: glowBunny, alt: "Tech Dancer dancing in a creative light-up bunny costume at a themed dance event" },
        { src: wwwAri, alt: "Tech Dancer maintaining a strong athletic connection during a high-energy dance session" }
      ]
    },
    {
      id: "connect",
      eyebrow: "Connect & Networking",
      links: [
        { label: 'Instagram', url: 'https://instagram.com/' },
        { label: 'LinkedIn', url: 'https://linkedin.com/in/arianders' },
        { label: 'GitHub', url: 'https://github.com/arii' }
      ]
    }
  ],
  details: [
    { label: "LOCATION", value: "San Francisco, CA" },
    { label: "STYLE", value: "West Coast Swing // Lifestyle" },
    { label: "DANCE LEVEL", value: "Competitive Intermediate Follow" }
  ],
  links: [
    { label: 'Instagram', url: 'https://instagram.com/' },
    { label: 'LinkedIn', url: 'https://linkedin.com/in/arianders' },
    { label: 'GitHub', url: 'https://github.com/arii' }
  ]
};
export function useProfile(): { bio: ProfileData } {
  return { bio: PROFILE_DATA };
}
