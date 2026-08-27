import { ProfileData } from './types';
import { SOCIAL_LINKS } from '@/config/constants';
import firstComp from '@/assets/first_comp.jpg';
import glowBunny from '@/assets/glow_bunny.jpg';
import madJamAri from '@/assets/mad_jam_ari.jpg';
import monterey from '@/assets/monterey.jpg';
import wwwAri from '@/assets/www_ari.jpg';

const PROFILE_DATA: ProfileData = {
  name: "Ariel Anders, PhD",
  role: "West Coast Swing Dancer · Community Builder · Live Web Experiments",
  sections: [
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
    { label: "Portfolio", value: "arii.github.io", url: "https://arii.github.io" },
    { label: "Resume", value: "View Resume", url: "https://boomtick.blog/ariel-anders-resume.pdf" }
  ]
};

export function useProfile(): { bio: ProfileData } {
  return { bio: PROFILE_DATA };
}
