import { OnboardingDao } from '../dao/OnboardingDao';
export class OnboardingService {

    static async startSession(email: string, full_name: string) {
        const existing = await OnboardingDao.findSessionByEmail(email);
    
        if (existing && existing.step === 'complete') {
          return {
            session_id: existing.session_id,
            message: `Welcome back, ${existing.full_name || 'User'}! You’re already onboarded.`
          };
        }
    
        if (existing) {
          return {
            session_id: existing.session_id,
            message: `Welcome back, ${existing.full_name || 'User'}! Let’s continue onboarding. Your current step is: ${existing.step}`
          };
        }
    
        const newSessionId = await OnboardingDao.createSessionWithEmail(email, full_name);
        return {
          session_id: newSessionId,
          message: `Welcome ${full_name}! Let’s begin your onboarding. What's your profession?`
        };
      }

    static async handleInput(sessionId: string | null, input: string) {
      let session;
  
      if (!sessionId) {
        const newSessionId = await OnboardingDao.createSession();
        return {
          session_id: newSessionId,
          message: "Welcome! Let's get you set up. What's your profession?"
        };
      }
  
      // eslint-disable-next-line prefer-const
      session = await OnboardingDao.getSession(sessionId);
      const { step } = session;
  
      if (step === "profession") {
        await OnboardingDao.updateSession(sessionId, {
          profession: input,
          step: "interests"
        });
        return { message: "Great! What are your interests?" };
      }
  
      if (step === "interests") {
        const interests = input.split(",").map(i => i.trim());
        await OnboardingDao.updateSession(sessionId, {
          interests,
          step: "hobbies"
        });
        return { message: "Awesome! What are your hobbies?" };
      }
  
      if (step === "hobbies") {
        const hobbies = input.split(",").map(i => i.trim());
        await OnboardingDao.updateSession(sessionId, {
          hobbies,
          step: "preferred_themes"
        });
        return { message: "Nice! What kind of content themes do you prefer?" };
      }
  
      if (step === "preferred_themes") {
        const themes = input.split(",").map(i => i.trim());
        await OnboardingDao.updateSession(sessionId, {
          preferred_themes: themes,
          step: "complete"
        });
        return { message: "All set! Your profile is complete 🎉" };
      }
  
      return { message: "You're already onboarded. You can now generate posts!" };
    }
  }
  