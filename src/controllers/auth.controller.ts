import { Request, Response } from "express";
import { InstagramOAuth, LinkedInOAuth } from "../services/oauth.service";
import { UserSocialAccountsService } from "../services/userSocialAccounts.service";

export class AuthController {
  
  // Instagram OAuth
  static redirectToInstagram(req: Request, res: Response) {
    const authUrl = InstagramOAuth.getAuthUrl();
    res.redirect(authUrl);
  }

  static async handleInstagramCallback(req: Request, res: Response) {
    try {
      const { code } = req.query;
      const userId = (req as any).user?.id;
      if (!code || !userId) {
         res.status(400).json({ error: 'Missing code or user not authenticated' });
      }

      // Get access token
      const tokenData = await InstagramOAuth.getAccessToken(code as string);
      
      // Get user profile
      const profileData = await InstagramOAuth.getUserProfile(tokenData.access_token);
      
      // Use your existing service
      const result = await UserSocialAccountsService.connectAccount({
        user_id: userId,
        platform: 'instagram',
        access_token: tokenData.access_token,
        account_name: profileData.account_name,
        account_id: profileData.account_id
      });

      res.json({ 
        success: true, 
        message: 'Instagram connected successfully',
        data: result
      });
      
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  // LinkedIn OAuth
  static redirectToLinkedIn(req: Request, res: Response) {
    const authUrl = LinkedInOAuth.getAuthUrl();
    res.redirect(authUrl);
  }

  static async handleLinkedInCallback(req: Request, res: Response) {
    try {
      const { code } = req.query;
      const userId = (req as any).user?.id;
      
      if (!code || !userId) {
         res.status(400).json({ error: 'Missing code or user not authenticated' });
      }

      // Get access token
      const tokenData = await LinkedInOAuth.getAccessToken(code as string);
      
      // Get user profile
      const profileData = await LinkedInOAuth.getUserProfile(tokenData.access_token);
      
      // Use your existing service
      const result = await UserSocialAccountsService.connectAccount({
        user_id: userId,
        platform: 'linkedin',
        access_token: tokenData.access_token,
        account_name: profileData.account_name,
        account_id: profileData.account_id
      });

      res.json({ 
        success: true, 
        message: 'LinkedIn connected successfully',
        data: result
      });
      
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }
}
