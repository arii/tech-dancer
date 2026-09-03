import firstComp from '@/assets/first_comp.jpg';
import glowBunny from '@/assets/glow_bunny.jpg';
import madJamAri from '@/assets/mad_jam_ari.jpg';
import monterey from '@/assets/monterey.jpg';
import wwwAri from '@/assets/www_ari.jpg';
import { SOCIAL_LINKS } from '@/config/constants';
import { ProfileData } from './types';

const PROFILE_DATA: ProfileData = {
  name: "Ariel Anders, PhD",
  role: "West Coast Swing dancer and roboticist based in San Francisco, sharing practical competition insights, travel hacks, and web experiments.",
  sections: [
    {
      id: "dance-background",
      title: "My Dance Background",
      eyebrow: "Dance Journey",
      content: "I started in partner dance in 2019 with Lindy Hop and Fusion. After moving to San Francisco, I got back into social dancing at Lindy in the Park. A Mission City Swing series introduced me to West Coast Swing, and it clicked immediately — the music, the connection, and the creative feel of the dance made it easy to care deeply about. WCS became my main focus because it combines artistry, athleticism, and a welcoming community.",
      gallery: [
        {
          src: firstComp,
          alt: "Ariel Anders performing a West Coast Swing extension during a competition",
          caption: "First WCS Competition • San Francisco, CA"
        }
      ]
    },
    {
      id: "style-expression",
      title: "Style & Visual Expression",
      eyebrow: "Pillar: Style",
      content: "West Coast Swing gives dancers the freedom to showcase personal expression through clean lines, bright outfits, and theme-night creativity. From late-night social sessions with light-up gear to competition spotlights, finding your visual identity brings energy to the floor.",
      gallery: [
        {
          src: glowBunny,
          alt: "Ariel Anders wearing a creative LED light-up bunny costume at a dance event",
          caption: "Late Night Social • LED Bunny Ears"
        }
      ]
    },
    {
      id: "timing-musicality",
      title: "Timing & Musicality",
      eyebrow: "Pillar: Timing",
      content: "Musicality and connection matter just as much as dynamic movement. Dancing in the pocket of the groove, hitting subtle rhythmic breaks, and actively listening to your partner create the effortless flow that makes West Coast Swing addictive.",
      gallery: [
        {
          src: madJamAri,
          alt: "Ariel Anders social dancing at the MADjam West Coast Swing convention",
          caption: "MADjam Floor • Precision & Groove"
        }
      ]
    },
    {
      id: "why-built",
      title: "Why I Built This Site",
      eyebrow: "Behind The Blog",
      content: "boomtick.blog is where I share the practical side of a WCS lifestyle: practical travel advice, scoring and judge breakdown tools, event notes, and the small choices that make a big difference over a season of dancing.",
      gallery: [
        {
          src: monterey,
          alt: "Ariel Anders on stage at a West Coast Swing event in Monterey, California",
          caption: "Monterey Swingfest • Monterey, CA"
        }
      ]
    },
    {
      id: "financial-strategies",
      title: "Travel & Sustainable Logistics",
      eyebrow: "Pillar: Travel",
      content: "Traveling for dance conventions every month requires smart planning. I maximize credit card rewards, airline perks, and hotel points to make frequent weekend trips feasible and sustainable, keeping energy focused on dancing rather than travel stress.",
      gallery: [
        {
          src: wwwAri,
          alt: "Ariel Anders demonstrating athletic connection in a high-energy social dance session",
          caption: "Weekend Socials • Community & Travel"
        }
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
