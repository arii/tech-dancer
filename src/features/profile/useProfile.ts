import firstComp from '@/assets/first_comp.jpg';
import glowBunny from '@/assets/glow_bunny.jpg';
import madJamAri from '@/assets/mad_jam_ari.jpg';
import monterey from '@/assets/monterey.jpg';
import wwwAri from '@/assets/www_ari.jpg';
import { SOCIAL_LINKS } from '@/config/constants';
import { ProfileData } from './types';

const PROFILE_DATA: ProfileData = {
  name: "Ariel Anders, PhD",
  role: "West Coast Swing dancer & roboticist based in San Francisco. Building web tools, designing floor-ready merch, and publishing event guides.",
  sections: [
    {
      id: "dance-background",
      title: "My Dance Story & Why BoomTick Exists",
      content: "I started partner dancing in 2019 with Lindy Hop and Fusion before discovering West Coast Swing at Mission City Swing in San Francisco. The partner connection, footwork freedom, and late-night socials drew me in right away. I built BoomTick to combine software engineering with dance culture—developing web resources, practical gear guides, and custom apparel designed specifically for the community.",
      gallery: [
        {
          src: firstComp,
          alt: "Ariel Anders performing a West Coast Swing extension in competition",
          caption: "First WCS Competition • Los Angeles, CA"
        }
      ]
    },
    {
      id: "style-expression",
      title: "Style & Visual Expression",
      content: "Clean lines, high-contrast silhouettes, and playful theme-night outfits shape how I present on the floor. That visual focus drives the BoomTick merch line, where I design apparel and accessories made for movement, social comfort, and weekend conventions.",
      gallery: [
        {
          src: glowBunny,
          alt: "Ariel Anders wearing a custom LED light-up bunny costume at a dance event",
          caption: "Late Night Social Set • Custom LED Bunny Ears"
        }
      ]
    },
    {
      id: "timing-musicality",
      title: "Timing & Musicality",
      content: "I focus on settling into the pocket of the groove and letting the rhythm drive the connection. Rather than rushing accents, I prioritize partnering clarity across blues, acoustic arrangements, and funk tracks.",
      gallery: [
        {
          src: madJamAri,
          alt: "Ariel Anders social dancing on the MADjam floor",
          caption: "MADjam Social Floor • Late Night Groove"
        }
      ]
    },
    {
      id: "financial-strategies",
      title: "Travel & Event Logistics",
      content: "Attending weekend events across the country takes serious planning. To take the friction out of conflicting workshop schedules and competition timelines, I built an AI scheduling tool that organizes chaotic weekend agendas so dancers can spend less time planning and more time dancing.",
      gallery: [
        {
          src: wwwAri,
          alt: "Ariel Anders demonstrating athletic connection in a social dance session",
          caption: "Weekend Socials • High-Energy Extension"
        },
        {
          src: monterey,
          alt: "Ariel Anders on stage at Monterey Swingfest in California",
          caption: "Monterey Swingfest • Stage Spotlight"
        }
      ]
    },
    {
      id: "connect",
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
