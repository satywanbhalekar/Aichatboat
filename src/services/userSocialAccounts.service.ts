import { UserSocialAccountsDao } from "../dao/userSocialAccounts.dao";
import { UserSocialAccount } from "../interface/index.interface";
export class UserSocialAccountsService {
  static async connectAccount(accountData: UserSocialAccount): Promise<UserSocialAccount> {
    console.log('Service received data:', accountData); // ADD THIS
    console.log('Service user_id:', accountData.user_id); // ADD THIS
    return await UserSocialAccountsDao.connectAccount(accountData);
  }

  static async getAccountsByUser(user_id: string): Promise<UserSocialAccount[]> {
    return await UserSocialAccountsDao.getAccountsByUser(user_id);
  }
}