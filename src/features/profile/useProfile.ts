import { SITE_METADATA } from "@/config/content";
import { ProfileData } from './types';

const PROFILE_DATA: ProfileData = {
    name: SITE_METADATA.author,
    role: "West Coast Swing Blogger // Data Science Consultant",
    sections: [
      {
        id: "dance-background",
        title: "My Dance Background",
        content: "I started in partner dance in 2019 with Lindy Hop and Fusion. After a pause from 2020 through 2022, I moved to San Francisco and got back into the swing of things at Lindy in the Park. Seeking a new challenge, I signed up for a series at Mission City Swing—and realized it wasn't Lindy Hop! The music, like 'In Da Club' by 50 Cent, was so much fun that I started dancing both styles. Attending West Coast Swing (WCS) events became a great way for me to travel again after the pandemic. WCS gradually became my primary focus, but you can still find me Lindy Hopping to live Swing music in SF. I'm a competitive Intermediate-level follow (and an occasional lead!) who focuses on weight transfer, clean lines, and timing."
      },
      {
        id: "phd-matters",
        title: "The Tech Dancer Perspective",
        content: "With a background in building complex systems, I bring a unique analytical lens to the world of West Coast Swing. I don't just study data—I look for the underlying structures that make dance, travel, and lifestyle systems work. As a consultant, I use data science to optimize every aspect of the dance experience, from movement mechanics to event logistics."
      },
      {
        id: "why-built",
        title: "Why I Built BoomTick.blog",
        content: "People often ask me, 'Where did you get that outfit?' and 'How can you afford to travel to so many events?' I have always focused on making my lifestyle as efficient as possible. This site is how I share the 'stacks' I've built—everything from selected gear reviews to my travel-hacking systems. It's about making the high-end dance lifestyle accessible to everyone through smart optimization."
      },
      {
        id: "financial-strategies",
        title: "Lifestyle & Travel Optimization",
        content: "I love maximizing credit card perks and hotel benefits, which helps me make the WCS Events lifestyle both high-end and entirely feasible. I'm known for my bright, fun outfits and my optimized travel philosophy. On BoomTick.blog, I document these strategies to help fellow dancers spend less time worrying about logistics and more time on the dance floor."
      }
    ],
    details: [
      { label: "IDENTITY", value: "Tech Dancer" },
      { label: "FOCUS", value: "WCS // Travel // Data Science" },
      { label: "DANCE LEVEL", value: "Competitive Intermediate Follow" },
    ]
};

export function useProfile(): { bio: ProfileData } {
  return { bio: PROFILE_DATA };
}
