export type SocialPlatform = 'instagram' | 'linkedin' | 'github' | 'twitter' | 'youtube';

interface SocialLink {
  platform: SocialPlatform;
  url: string;
}

interface ProfileDetail {
  label: string;
  value: string;
}

interface ProfileSection {
  id: string;
  title: string;
  content: string;
}

export interface ProfileData {
  name: string;
  role: string;
  sections: ProfileSection[];
  details: ProfileDetail[];
  socialLinks: SocialLink[];
}
