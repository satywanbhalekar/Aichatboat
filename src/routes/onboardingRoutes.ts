// src/routes/onboardingRoutes.ts
import { Router } from 'express';
import { OnboardingController } from '../controllers/OnboardingController';
import { authenticateToken } from '../middlewares/authenticateToken';

const router = Router();

router.post('/login', OnboardingController.login); // login or signup
router.post('/signup',authenticateToken, OnboardingController.signup); 
router.post('/', OnboardingController.handleMessage); // conversational steps

export default router;
