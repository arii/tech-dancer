import { getPosts } from '@/lib/content';
import { ProfileData } from './types';

const PROFILE_DATA: ProfileData = {
    name: "Ariel Anders, PhD",
    role: "MIT Roboticist // WCS Tech-Dancer",
    bio: "I build reliable systems — in robotics and on the dance floor. This site is where those two worlds collide: gear reviews, travel systems, comp analytics, and the occasional engineering deep-dive.",
    sections: [
      {
        id: "dance-background",
        title: "My Dance Background",
        content: "I started in partner dance in 2019 with Lindy Hop and Fusion. After a pause from 2020 through 2022, I moved to San Francisco and got back into the swing of things at Lindy in the Park. Seeking a new challenge, I signed up for a series at Mission City Swing—and realized it wasn't Lindy Hop! The music, like 'In Da Club' by 50 Cent, was so much fun that I started dancing both styles. Attending West Coast Swing (WCS) events became a fantastic way for me to travel again after the pandemic. WCS gradually became my primary focus, but you can still find me Lindy Hopping to live Swing music in SF. I'm a competitive Intermediate-level follow (and an occasional lead!) who focuses on weight transfer, clean lines, and timing."
      },
      {
        id: "phd-matters",
        title: "Why My PhD Matters",
        content: "I believe in building things that actually work. Since 2010, I have dedicated myself to creating robotic systems that stay reliable even in complex situations. From my PhD at MIT to my industry experience, I don't just study data—I engineer real-world systems that deliver results. I consider myself a pragmatic roboticist: I use machine learning, traditional AI, and solid software design to build systems that are functional, robust, and ready to complete the task at hand."
      },
      {
        id: "why-built",
        title: "Why I Built This Site",
        content: "People often ask me, 'Where did you get that outfit?' and 'How can you afford to travel to so many events?' I am fortunate to have a strong career, but I have always focused on making my lifestyle as financially efficient as possible. This site is how I share the 'stacks' I've built—everything from curated gear reviews to my travel-hacking systems."
      }
    ],
    details: [
      { label: "EDUCATION", value: "PhD in Computer Science, MIT" },
      { label: "FOCUS", value: "Robotics // AI // Data Analytics" },
      { label: "DANCE LEVEL", value: "Competitive Intermediate Follow" },
    ],
    socialLinks: [
      { platform: 'instagram', url: 'https://instagram.com' },
      { platform: 'linkedin', url: 'https://linkedin.com/in/arielanders' },
      { platform: 'github', url: 'https://github.com/arii' },
    ],
    stats: {
      yearsDancing: "6+",
      eventsPerYear: "20+",
      phdYear: "2012",
      primaryStyle: "WCS"
    },
    timeline: [
      { year: '2019', event: 'Started with Lindy Hop and Fusion', detail: 'First partner dance experiences — Lindy in the Park, SF.', badge: null },
      { year: '2020', event: 'Pandemic pause', detail: 'Two years off. Resumed in 2022 after moving to San Francisco.', badge: null },
      { year: '2022', event: 'Discovered West Coast Swing', detail: 'Signed up for a series at Mission City Swing — and never looked back. "In Da Club" changed everything.', badge: { text: 'Pivotal', type: 'pivotal' } },
      { year: '2023', event: 'First competitions, built the travel stack', detail: 'Started the convention circuit. Developed credit card and gear systems to make 20+ events/year sustainable.', badge: { text: '20+ events/yr', type: 'events' } },
      { year: '2024', event: 'Competitive intermediate, launched tech-dancer', detail: 'Built this site to share gear reviews, travel systems, and data analytics with the WCS community.', badge: { text: 'This site', type: 'site' } },
      { year: 'Next', event: 'Advanced division, open-source scoring data', detail: 'Growing the data pipeline and the analytics tooling for the community.', badge: null, future: true },
    ],
    skills: [
      {
        label: "Robotics & AI",
        skills: [
          { name: "Robot perception", strong: true },
          { name: "Motion planning", strong: true },
          { name: "ML systems", strong: true },
          { name: "ROS" },
          { name: "PyTorch" },
          { name: "Sim-to-real" },
        ]
      },
      {
        label: "Software & data",
        skills: [
          { name: "Python", strong: true },
          { name: "TypeScript", strong: true },
          { name: "React" },
          { name: "Vite" },
          { name: "Data pipelines", strong: true },
          { name: "GitHub Actions" },
          { name: "Playwright" },
        ]
      },
      {
        label: "Dance",
        skills: [
          { name: "West Coast Swing", strong: true },
          { name: "Lindy Hop" },
          { name: "Fusion" },
          { name: "Intermediate follow", strong: true },
          { name: "Occasional lead" },
        ]
      }
    ],
    competitions: {
      level: "Intermediate follow",
      levelProgress: 3,
      homeVenue: "Mission City Swing",
      homeVenueDetail: "Wednesdays · San Francisco",
      focusAreas: ["Weight transfer", "Clean lines", "Timing", "Connection", "Phrase musicality"],
      eventsCircuit: ["Jack & Jill O'Rama", "Mission City Swing", "NorCal regional"]
    },
    featuredSlugs: [
      '2026-04-18-github-actions',
      '2026-04-18-financial-literacy-dancers',
    ]
};

export function useProfile(): { bio: ProfileData } {
  const posts = getPosts();
  const featuredPosts = PROFILE_DATA.featuredSlugs.map(slug => {
    const post = posts.find(p => p.slug === slug);
    return {
      slug,
      title: post?.title || "Untitled Post",
      eyebrow: slug.includes('github') ? "Why I built this" : "Financial systems"
    };
  });

  return {
    bio: {
      ...PROFILE_DATA,
      featuredPosts
    }
  };
}
