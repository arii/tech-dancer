import firstComp from '@/assets/first_comp.jpg';
import glowBunny from '@/assets/glow_bunny.jpg';
import madJamAri from '@/assets/mad_jam_ari.jpg';
import monterey from '@/assets/monterey.jpg';
import wwwAri from '@/assets/www_ari.jpg';
import { SOCIAL_LINKS } from '@/config/constants';
import { ProfileData } from './types';

const PROFILE_DATA: ProfileData = {
  name: "Ariel Anders, PhD",
  role: "West Coast Swing dancer & roboticist based in San Francisco. Building scoring tools, packing LED wire for late-night socials, and chasing hotel points.",
  sections: [
    {
      id: "dance-background",
      title: "My Dance Story & Why BoomTick Exists",
      content: "I started in partner dance with Lindy Hop and Fusion in 2019 before finding West Coast Swing at Mission City Swing in San Francisco. WCS hooked me immediately—the improvised elasticity, room for musical humor, and late-night social energy. I built BoomTick to share raw event notes, judges' scoring breakdowns, and practical tools I actually use on the circuit.",
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
      content: "I love bright lines, high-contrast outfits, and theme nights that take themselves just seriously enough. From late-night social sets where I pack an absurd amount of LED wire into costume ears, to competition spotlights where clean lines matter most, visual expression is half the fun on the floor.",
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
      content: "I care most about dancing inside the pocket of the groove. Hitting subtle rhythmic breaks without blowing past your partner's connection is what makes WCS addictive. Give me a heavy blues track or a sparse acoustic breakdown over a wall-of-sound pop remix any day.",
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
      title: "Travel & Hotel Points Strategy",
      content: "Hitting 12+ weekend conventions a year gets expensive fast if you pay rack rates. I obsess over credit card reward redemptions, airline status perks, and hotel point transfers so I can stay on-site at main event hotels and keep my energy focused on dancing.",
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
