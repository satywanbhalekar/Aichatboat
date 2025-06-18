import { Request, Response } from 'express';
import { ChatbotService } from '../services/chatbotService';

export class ChatbotController {
  static async generatePost(req: Request, res: Response) {
    try {
      const userId = req.body.user_id;
      const input = req.body.input;
 // Log inputs
 console.log("Received userId:", userId);
 console.log("Received input:", input);
      const result = await ChatbotService.generatePost(userId, input);
      res.status(201).json(result);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  static async provideFeedback(req: Request, res: Response) {
    try {
      const { postId, feedback } = req.body;
      await ChatbotService.saveFeedback(postId, feedback);
      res.status(200).json({ message: 'Feedback saved' });
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  static async selectPost(req: Request, res: Response) {
    try {
      const { postId, selectedPost } = req.body;
      await ChatbotService.saveSelectedPost(postId, selectedPost);
      res.status(200).json({ message: 'Post selection saved' });
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }
}
