import { supabase } from '../config/db';
import { OnboardingSession, UserProfile } from '../interface/index.interface';

export class ProfileDao {
  static async createProfile(profile: UserProfile): Promise<UserProfile> {
    const { data, error } = await supabase
      .from('profiles')
      .insert([profile])
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data;
  }

  static async getProfileById(userId: string): Promise<UserProfile> {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) throw new Error(error.message);
    return data;
  }


  static async getProfileBysession_id(session_id: string): Promise<OnboardingSession> {
    const { data, error } = await supabase
      .from('onboarding_sessions')
      .select('*')
      .eq('session_id', session_id)
      .single();

    if (error) throw new Error(error.message);
    return data;
  }

  static async updateProfile(userId: string, updates: Partial<UserProfile>): Promise<UserProfile> {
    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', userId)
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data;
  }
}
