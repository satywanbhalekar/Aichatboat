import { Request, Response } from "express";
import { UserSocialAccountsService } from "../services/userSocialAccounts.service";

export class UserSocialAccountsController {
  
  // Keep your existing methods
  static async connectAccount(req: Request, res: Response) {
    try {
        console.log('Request body:', req.body); // ADD THIS
        console.log('User ID received:', req.body.user_id); // ADD THIS
      const { user_id, platform, access_token, account_name, account_id } = req.body;
      console.log('Extracted user_id:', user_id); // ADD THIS
      console.log('All extracted values:', { user_id, platform, access_token, account_name, account_id }); // ADD THIS
  

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

  // ADD: New method to get OAuth URLs for frontend
  static getOAuthUrls(req: Request, res: Response) {
    try {
      res.json({
        instagram: `${process.env.APP_URL}/auth/instagram`,
        linkedin: `${process.env.APP_URL}/auth/linkedin`
      });
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }
}