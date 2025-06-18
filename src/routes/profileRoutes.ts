import { Router } from 'express';
import { ProfileController } from '../controllers/profileController';

const router = Router();

router.post('/', ProfileController.createProfile);
router.get('/:userId', ProfileController.getProfile);
router.put('/:userId', ProfileController.updateProfile);

export default router;
