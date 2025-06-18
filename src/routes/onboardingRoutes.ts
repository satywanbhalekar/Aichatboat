// src/routes/onboardingRoutes.ts
import { Router } from 'express';
import { OnboardingController } from '../controllers/OnboardingController';

const router = Router();

router.post('/onboard/start', OnboardingController.start); // login or signup
router.post('/onboard', OnboardingController.handleMessage); // conversational steps

export default router;
