// // src/controllers/imageGenController.ts
// import { Request, Response } from 'express';
// import { generateImageFromPrompt } from '../services/imageGenService';

// export const generateImageController = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const { prompt, user_id } = req.body;
    
//     if (!prompt || !user_id) {
//       res.status(400).json({ error: 'prompt and user_id are required' });
//       return;
//     }
    
//     const imageBuffer = await generateImageFromPrompt(prompt);
    
//     // Optional: Save image prompt and return image URL (not storing file, for now)
//     // await ImageDao.savePrompt(user_id, prompt, 'not_stored'); // You can use Supabase storage if needed
    
//     res.setHeader('Content-Type', 'image/png');
//     res.send(imageBuffer);
//   } catch (error: any) {
//     console.error('[ImageGenController]', error.message);
//     res.status(500).json({ error: 'Image generation failed' });
//   }
// };


// src/controllers/imageGenController.ts
import { Request, Response } from 'express';
import { generateImageFromPromptFree, generateImageFromPromptAsync, testReplicateConnection } from '../services/imageGenService';

export const generateImageController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { prompt, user_id } = req.body;
    
    if (!prompt || !user_id) {
      res.status(400).json({ error: 'prompt and user_id are required' });
      return;
    }
    
    const imageBuffer = await generateImageFromPromptFree(prompt);
    
    // Optional: Save image prompt and return image URL (not storing file, for now)
    // await ImageDao.savePrompt(user_id, prompt, 'not_stored'); // You can use Supabase storage if needed
    
    res.setHeader('Content-Type', 'image/png');
    res.send(imageBuffer);
  } catch (error: any) {
    console.error('[ImageGenController]', error.message);
    res.status(500).json({ error: 'Image generation failed' });
  }
};

// ✅ Alternative async controller that returns a prediction URL instead of waiting
export const generateImageAsyncController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { prompt, user_id } = req.body;
    
    if (!prompt || !user_id) {
      res.status(400).json({ error: 'prompt and user_id are required' });
      return;
    }
    
    const predictionUrl = await generateImageFromPromptAsync(prompt);
    
    res.json({ 
      message: 'Image generation started',
      prediction_url: predictionUrl,
      user_id 
    });
  } catch (error: any) {
    console.error('[ImageGenController]', error.message);
    res.status(500).json({ error: 'Image generation failed' });
  }
};

// ✅ Controller to check prediction status
export const checkPredictionStatus = async (req: Request, res: Response): Promise<void> => {
  try {
    const { prediction_id } = req.params;
    
    if (!prediction_id) {
      res.status(400).json({ error: 'prediction_id is required' });
      return;
    }
    
    const axios = require('axios');
    const statusResponse = await axios.get(
      `https://api.replicate.com/v1/predictions/${prediction_id}`,
      {
        headers: {
          Authorization: `Token ${process.env.REPLICATE_API_TOKEN}`,
        }
      }
    );
    
    res.json(statusResponse.data);
  } catch (error: any) {
    console.error('[CheckPredictionStatus]', error.message);
    res.status(500).json({ error: 'Failed to check prediction status' });
  }
};

// ✅ Test controller to verify Replicate connection
export const testConnectionController = async (req: Request, res: Response): Promise<void> => {
  try {
    const isConnected = await testReplicateConnection();
    
    if (isConnected) {
      res.json({ 
        status: 'success',
        message: 'Replicate API connection is working'
      });
    } else {
      res.status(500).json({ 
        status: 'error',
        message: 'Replicate API connection failed'
      });
    }
  } catch (error: any) {
    console.error('[TestConnection]', error.message);
    res.status(500).json({ 
      status: 'error',
      message: 'Connection test failed',
      error: error.message
    });
  }
};