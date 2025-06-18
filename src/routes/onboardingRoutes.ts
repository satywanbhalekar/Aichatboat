// src/routes/onboardingRoutes.ts
import { Router } from 'express';
import { OnboardingController } from '../controllers/OnboardingController';

const router = Router();

router.post('/start', OnboardingController.start); // login or signup
router.post('/', OnboardingController.handleMessage); // conversational steps

export default router;
