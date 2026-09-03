export interface ProfileSection {
  id: string;
  title?: string;
  eyebrow?: string;
  content?: string;
  cards?: ProfileCard[];
  items?: ProfileItem[];
  gallery?: ProfileGalleryImage[];
  links?: ProfileLink[];
  availability?: string;
}

export interface ProfileCard {
  title: string;
  content: string;
  icon?: string;
}

export interface ProfileItem {
  icon?: string;
  title: string;
  description: string;
  image?: ProfileGalleryImage;
}

export interface ProfileGalleryImage {
  src: string;
  alt: string;
  caption?: string;
  event?: string;
  year?: string;
}

export interface ProfileDetail {
  label: string;
  value: string;
  url?: string;
}

export interface ProfileLink {
  label: string;
  url: string;
}

export interface ProfileData {
  name: string;
  role: string;
  bioSummary?: string;
  heroImage?: ProfileGalleryImage;
  sections: ProfileSection[];
  details: ProfileDetail[];
}
