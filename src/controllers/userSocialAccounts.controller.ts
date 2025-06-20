import { Request, Response } from "express";
import { UserSocialAccountsService } from "../services/userSocialAccounts.service";

export class UserSocialAccountsController {
  static async connectAccount(req: Request, res: Response) {
    try {
      const { user_id, platform, access_token, account_name, account_id } = req.body;

      const result = await UserSocialAccountsService.connectAccount({
        user_id,
        platform,
        access_token,
        account_name,
        account_id,
      });
      
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  static async getAccountsByUser(req: Request, res: Response) {
    try {
      const { user_id } = req.params;
      const result = await UserSocialAccountsService.getAccountsByUser(user_id);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }
}