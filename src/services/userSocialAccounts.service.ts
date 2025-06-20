import { UserSocialAccountsDao } from "../dao/userSocialAccounts.dao";
import { UserSocialAccount } from "../interface/index.interface";
export class UserSocialAccountsService {
  static async connectAccount(accountData: UserSocialAccount): Promise<UserSocialAccount> {
    return await UserSocialAccountsDao.connectAccount(accountData);
  }

  static async getAccountsByUser(user_id: string): Promise<UserSocialAccount[]> {
    return await UserSocialAccountsDao.getAccountsByUser(user_id);
  }
}