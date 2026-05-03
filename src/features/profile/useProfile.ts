import { ProfileData } from './types';

const PROFILE_DATA: ProfileData = {
    name: "Ariel Anders, PhD",
    role: "MIT Roboticist // Boom Tick",
    sections: [
      {
        id: "dance-background",
        title: "My Dance Background",
      content: "I started in partner dance in 2019 with Lindy Hop and Fusion. After a pause from 2020 through 2022, I moved to San Francisco and got back into the swing of things at Lindy in the Park. Seeking a new challenge, I signed up for a series at Mission City Swing—and realized it wasn't Lindy Hop! The music, like 'In Da Club' by 50 Cent, was so much fun that I started dancing both styles. Attending West Coast Swing (WCS) events became a fantastic way for me to travel again after the pandemic. WCS gradually became my primary focus, but you can still find me Lindy Hopping to live Swing music in SF. I'm a competitive Intermediate-level follow (and an occasional lead!) who focuses on weight transfer, clean lines, and timing. I create Boom Tick to share that dance journey alongside practical gear, travel, and training notes."
      },
      {
        id: "phd-matters",
        title: "Why My PhD Matters",
      content: "I believe in building things that actually work. Since 2010, I have dedicated myself to creating robotic systems that stay reliable even in complex situations. From my PhD at MIT to my industry experience, I don't just study data—I engineer real-world systems that deliver results. I consider myself a pragmatic roboticist: I use machine learning, traditional AI, and solid software design to build systems that are functional, robust, and ready to complete the task at hand. Recent work includes autonomous forklifts at Civ Robotics, motion planning at Waymo, and long-running research at MIT CSAIL."
      },
      {
        id: "why-built",
        title: "Why I Built This Site",
      content: "People often ask me, 'Where did you get that outfit?' and 'How can you afford to travel to so many events?' I am fortunate to have a strong career, but I have always focused on making my lifestyle as financially efficient as possible. This site is how I share the 'stacks' I've built—everything from curated gear reviews to my travel-hacking systems. I also keep it as a place to organize useful links, experiments, and lessons learned as creator at arii.github.io."
      },
      {
        id: "financial-strategies",
        title: "Financial Strategies for WCS",
      content: "I love maximizing credit card perks and hotel benefits, which helps me make the WCS Events lifestyle both high-end and entirely feasible. I'm known for my bright, fun outfits and my optimized travel philosophy. That same systems mindset carries into how I build, travel, and plan projects."
      }
    ],
    details: [
      { label: "EDUCATION", value: "PhD & SM in Computer Science, MIT" },
      { label: "FOCUS", value: "Robotics // AI // Data Analytics" },
      { label: "DANCE LEVEL", value: "Competitive Intermediate Follow" },
    ]
};

export function useProfile(): { bio: ProfileData } {
  return { bio: PROFILE_DATA };
}
