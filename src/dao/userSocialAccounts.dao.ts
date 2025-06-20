import { supabase } from "../config/db";
import { UserSocialAccount } from "../interface/index.interface";

export class UserSocialAccountsDao {
  static async connectAccount(data: UserSocialAccount): Promise<UserSocialAccount> {
    const { data: result, error } = await supabase
      .from("user_social_accounts")
      .insert([data])
      .select()
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return result as UserSocialAccount;
  }

  static async getAccountsByUser(user_id: string): Promise<UserSocialAccount[]> {
    const { data, error } = await supabase
      .from("user_social_accounts")
      .select("*")
      .eq("user_id", user_id);

    if (error) {
      throw new Error(error.message);
    }

    return data as UserSocialAccount[];
  }
}