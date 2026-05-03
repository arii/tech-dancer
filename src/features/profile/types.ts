export interface ProfileSection {
  id: string;
  title: string;
  content: string;
}

export interface ProfileDetail {
  label: string;
  value: string;
}

export interface ProfileData {
  name: string;
  role: string;
  bio?: string;
  sections: ProfileSection[];
  details: ProfileDetail[];
}
