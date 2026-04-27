export type SocialPlatform = 'instagram' | 'linkedin' | 'github' | 'twitter' | 'youtube';

export interface SocialLink {
  platform: SocialPlatform;
  url: string;
}

export interface ProfileDetail {
  label: string;
  value: string;
}

export interface ProfileSection {
  id: string;
  title: string;
  content: string;
}

export type TimelineBadgeType = 'pivotal' | 'site' | 'events';

export interface TimelineItem {
  year: string;
  event: string;
  detail: string;
  badge: {
    text: string;
    type: TimelineBadgeType;
  } | null;
  future?: boolean;
}

export interface SkillGroup {
  label: string;
  skills: { name: string; strong?: boolean }[];
}

export interface CompetitionProfile {
  level: string;
  levelProgress: number; // 1 to 5
  homeVenue: string;
  homeVenueDetail: string;
  focusAreas: string[];
  eventsCircuit: string[];
}

export interface ProfileStats {
  yearsDancing: string;
  eventsPerYear: string;
  phdYear: string;
  primaryStyle: string;
}

export interface FeaturedPost {
  slug: string;
  title: string;
  eyebrow: string;
}

export interface ProfileData {
  name: string;
  role: string;
  bio: string;
  sections: ProfileSection[];
  details: ProfileDetail[];
  socialLinks: SocialLink[];
  stats: ProfileStats;
  timeline: TimelineItem[];
  skills: SkillGroup[];
  competitions: CompetitionProfile;
  featuredSlugs: string[];
  featuredPosts?: FeaturedPost[];
}
