import { Request, Response } from 'express';
import { ProfileService } from '../services/profileService';
import { UserProfile } from '../interface/index.interface';

export class ProfileController {
  static async createProfile(req: Request, res: Response) {
    try {
      const profile: UserProfile = req.body;
      const result = await ProfileService.createUserProfile(profile);
      res.status(201).json(result);
    } catch (err) {
      res.status(500).json({ error: (err as Error).message });
    }
  }

  static async getProfile(req: Request, res: Response) {
    try {
      const { userId } = req.params;
      const result = await ProfileService.getUserProfile(userId);
      res.status(200).json(result);
    } catch (err) {
      res.status(404).json({ error: (err as Error).message });
    }
  }

  static async updateProfile(req: Request, res: Response) {
    try {
      const { userId } = req.params;
      const updates = req.body;
      const result = await ProfileService.updateUserProfile(userId, updates);
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json({ error: (err as Error).message });
    }
  }
}
