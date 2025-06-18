// // src/routes/imageGenRoutes.ts
// import { Router } from 'express';
// import { generateImageController } from '../controllers/imageGenController';

// const router = Router();

// router.post('/generate-image', generateImageController);

// export default router;

// src/routes/imageGenRoutes.ts
import { Router } from 'express';
import { 
  generateImageController, 
  generateImageAsyncController, 
  checkPredictionStatus,
  testConnectionController
} from '../controllers/imageGenController';

const router = Router();

// ✅ Synchronous route (waits for image completion)
router.post('/generate-image', generateImageController);

// ✅ Asynchronous route (returns prediction URL immediately)
router.post('/generate-image-async', generateImageAsyncController);

// ✅ Route to check prediction status
router.get('/prediction/:prediction_id', checkPredictionStatus);

// ✅ Test route to verify Replicate connection
router.get('/test-connection', testConnectionController);

export default router;