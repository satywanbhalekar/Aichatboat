export interface UserProfile {
  id: string;
  name: string;
  profession: string;
  interests?: string[];
  hobbies?: string[];
  preferred_themes?: string[];
  social_accounts?: string[];
  created_at?: string;
}

export interface SocialAccount {
  id: string;
  user_id: string;
  platform: 'instagram' | 'facebook' | 'linkedin' | 'x' | string;
  username: string;
  access_token?: string;
  connected_at?: string;
}

export interface PostRequest {
  id: string;
  user_id: string;
  topic?: string;
  raw_input: string;
  generated_posts: Record<string, string>; // e.g., { variant1: "...", variant2: "..." }
  selected_post?: string;
  feedback?: string;
  created_at?: string;
}
