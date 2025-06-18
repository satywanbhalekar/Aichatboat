import { Router } from 'express';
import { ChatbotController } from '../controllers/chatbotController';

const router = Router();

router.post('/generate', ChatbotController.generatePost);
router.post('/feedback', ChatbotController.provideFeedback);
router.post('/select', ChatbotController.selectPost);

export default router;
