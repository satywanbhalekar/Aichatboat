import {supabase} from '../config/db';
import { SocialAccount } from '../interface/index.interface';

export class SocialAccountDao {
  static async addOrUpdate(account: SocialAccount): Promise<void> {
    const { error } = await supabase
      .from('social_accounts')
      .upsert(account, { onConflict: 'id' });

    if (error) throw new Error(error.message);
  }

  static async getByUser(userId: string): Promise<SocialAccount[]> {
    const { data, error } = await supabase
      .from('social_accounts')
      .select('*')
      .eq('user_id', userId);

    if (error) throw new Error(error.message);
    return data as SocialAccount[];
  }
}
