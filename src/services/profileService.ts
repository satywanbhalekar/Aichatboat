import { ProfileDao } from '../dao/profileDao';
import { UserProfile } from '../interface/index.interface';

export class ProfileService {
  static async createUserProfile(profile: UserProfile): Promise<UserProfile> {
    return await ProfileDao.createProfile(profile);
  }

  static async getUserProfile(userId: string): Promise<UserProfile> {
    return await ProfileDao.getProfileById(userId);
  }

  static async updateUserProfile(userId: string, updates: Partial<UserProfile>): Promise<UserProfile> {
    return await ProfileDao.updateProfile(userId, updates);
  }
}
