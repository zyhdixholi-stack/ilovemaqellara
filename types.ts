export enum PostStatus {
  Pending = 'pending',
  Approved = 'approved',
  Archived = 'archived',
}

export interface Post {
  id: string;
  villageName?: string;
  author: string;
  comment?: string;
  imageUrl?: string;
  videoUrl?: string;
  status: PostStatus;
}

export interface Village {
  name: string;
  lat: number;
  lng: number;
  imageUrl: string;
}

export interface NotablePerson {
  name: string;
  bio: string;
  imageUrl: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  imageUrl: string;
}

export interface ContactInfo {
  nameKey: string;
  number: string;
}

export interface Tradition {
  nameKey: string;
  imageUrl: string;
}

export interface Food {
  nameKey: string;
  imageUrl: string;
}


export enum Page {
  Home = 'home',
  Villages = 'villages',
  Personalities = 'personalities',
  Diaspora = 'diaspora',
  Events = 'events',
  Contacts = 'contacts',
  Admin = 'admin',
  TermsOfService = 'terms',
  PrivacyPolicy = 'privacy',
  Traditions = 'traditions',
}

export interface ChatMessage {
  role: 'user' | 'model';
  content: string;
}

export type Language = 'standard' | 'dibran';