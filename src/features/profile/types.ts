export interface ProfileSection {
  id: string;
  title: string;
  content?: string;
  cards?: ProfileCard[];
  items?: ProfileItem[];
  gallery?: ProfileGalleryImage[];
}

export interface ProfileCard {
  title: string;
  content: string;
}

export interface ProfileItem {
  icon: 'star' | 'music' | 'map-pin'; // Standardized icon identifiers
  title: string;
  description: string;
}

export interface ProfileGalleryImage {
  src: string;
  alt: string;
}

export interface ProfileDetail {
  label: string;
  value: string;
}

export interface ProfileLink {
  label: string;
  url: string;
}

export interface ProfileData {
  name: string;
  role: string;
  bio?: string;
  sections: ProfileSection[];
  details: ProfileDetail[];
  links: ProfileLink[];
}
