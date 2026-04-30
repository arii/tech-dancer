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

export interface ProfileData {
  name: string;
  role: string;
  sections: ProfileSection[];
  details: ProfileDetail[];
  socialLinks: SocialLink[];
}
