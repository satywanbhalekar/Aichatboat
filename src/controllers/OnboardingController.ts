import { Request, Response } from 'express';
import { OnboardingService } from '../services/OnboardingService';
export class OnboardingController {
    static async handleMessage(req: Request, res: Response) {
      try {
        const { input, session_id } = req.body;
        console.log(input,session_id);
        
        const result = await OnboardingService.handleInput(session_id || null, input);
        res.json(result);
      } catch (err) {
        res.status(500).json({ error: (err as Error).message });
      }
    }

    static async start(req: Request, res: Response) {
        try {
          const { email, full_name } = req.body;
          console.log("email full_name",full_name,email);
          
          if (!email || !full_name) {
             res.status(400).json({ error: "email and full_name are required" });
          }
    
          const result = await OnboardingService.startSession(email, full_name);
          res.json(result);
        } catch (err) {
          res.status(500).json({ error: (err as Error).message });
        }
      }
  }
  