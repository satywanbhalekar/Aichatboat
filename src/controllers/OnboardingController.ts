import { Request, Response } from 'express';
import { OnboardingService } from '../services/OnboardingService';
export class OnboardingController {
    // static async handleMessage(req: Request, res: Response) {
    //   try {
    //     const { input, session_id } = req.body;
    //     console.log(input,session_id);
        
    //     const result = await OnboardingService.handleInput(session_id || null, input);
    //     res.json(result);
    //   } catch (err) {
    //     res.status(500).json({ error: (err as Error).message });
    //   }
    // }

    static async handleMessage(req: Request, res: Response) {
      try {
        const { session_id, input, profession, interests, hobbies, preferred_themes } = req.body;
    
        // 👇 Decide what to pass as input
        const finalInput =
          input ?? // step-by-step text
          (profession && interests && hobbies && preferred_themes
            ? { profession, interests, hobbies, preferred_themes }
            : undefined);
    
        console.log("📥 Final input to service:", finalInput);
        console.log("🔑 Session ID:", session_id);
    
        const result = await OnboardingService.handleInput(session_id || null, finalInput);
    
        res.json(result);
      } catch (err) {
        console.error("❌ Onboarding error:", err);
        res.status(500).json({ error: (err as Error).message });
      }
    }
    

    static async start(req: Request, res: Response) {
        try {
          const { email, full_name,password } = req.body;
          console.log("email full_name",full_name,email,password);
          
          // if (!email || !full_name || !password) {
          //    res.status(400).json({ error: "email and full_name ,password are required" });
          // }
    
          const result = await OnboardingService.startSession(email, full_name,password);
          res.json(result);
        } catch (err) {
          res.status(500).json({ error: (err as Error).message });
        }
      }
  }
  