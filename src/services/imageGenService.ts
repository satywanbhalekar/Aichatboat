
// import axios from 'axios';

// const HF_TOKEN = process.env.HF_TOKEN;

// // ✅ Updated URL - this is the correct format for Hugging Face Inference API
// const modelURL = 'https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-2-1';

// export async function generateImageFromPrompt(prompt: string): Promise<Buffer> {
//   try {
//     console.log('[ImageGenService] Generating image for prompt:', prompt);
    
//     const response = await axios.post(
//       modelURL,
//       { inputs: prompt },
//       {
//         headers: {
//           Authorization: `Bearer ${HF_TOKEN}`,
//           'Content-Type': 'application/json',
//         },
//         responseType: 'arraybuffer',
//         timeout: 30000, // 30 second timeout
//       }
//     );

//     console.log('[ImageGenService] Image generated successfully');
//     return Buffer.from(response.data);
//   } catch (error: any) {
//     console.error('[ImageGenService] Error details:', {
//       status: error.response?.status,
//       statusText: error.response?.statusText,
//       url: modelURL
//     });

//     // ✅ Better error handling for different response types
//     if (error.response?.data) {
//       if (error.response.data instanceof ArrayBuffer) {
//         const errorText = Buffer.from(error.response.data).toString('utf-8');
//         console.error('[HuggingFace API Error]', errorText);
        
//         // Handle specific HF API errors
//         if (errorText.includes('Model') && errorText.includes('is currently loading')) {
//           throw new Error('Model is currently loading. Please try again in a few moments.');
//         }
//         if (errorText.includes('estimated_time')) {
//           throw new Error('Model is warming up. Please try again in a minute.');
//         }
//       } else {
//         console.error('[HuggingFace API Error]', error.response.data);
//       }
//     } else {
//       console.error('[Network/Other Error]', error.message);
//     }

//     throw new Error('Image generation failed. Please try again.');
//   }
// }

// // ✅ Alternative function using a different model if the above doesn't work
// export async function generateImageFromPromptAlt(prompt: string): Promise<Buffer> {
//   // Alternative models you can try:
//   const alternativeModels = [
//     'https://api-inference.huggingface.co/models/runwayml/stable-diffusion-v1-5',
//     'https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0',
//     'https://api-inference.huggingface.co/models/CompVis/stable-diffusion-v1-4'
//   ];

//   for (const modelUrl of alternativeModels) {
//     try {
//       console.log(`[ImageGenService] Trying model: ${modelUrl}`);
      
//       const response = await axios.post(
//         modelUrl,
//         { inputs: prompt },
//         {
//           headers: {
//             Authorization: `Bearer ${HF_TOKEN}`,
//             'Content-Type': 'application/json',
//           },
//           responseType: 'arraybuffer',
//           timeout: 30000,
//         }
//       );

//       console.log('[ImageGenService] Image generated successfully with alternative model');
//       return Buffer.from(response.data);
//     // eslint-disable-next-line @typescript-eslint/no-unused-vars
//     } catch (error) {
//       console.log(`[ImageGenService] Model ${modelUrl} failed, trying next...`);
//       continue;
//     }
//   }

//   throw new Error('All image generation models failed. Please try again later.');
// }



//deepshake
// src/services/imageGenService.ts
// import axios from 'axios';

// const DEEP_AI_KEY = process.env.DEEP_AI_KEY;
// const DEEP_AI_ENDPOINT = 'https://api.deepai.org/api/text2img';

// export async function generateImageFromPrompt(prompt: string): Promise<string> {
//   try {
//     const response = await axios.post(
//       DEEP_AI_ENDPOINT,
//       new URLSearchParams({ text: prompt }),
//       {
//         headers: {
//           'Api-Key': DEEP_AI_KEY || '',
//           'Content-Type': 'application/x-www-form-urlencoded',
//         },
//       }
//     );

//     // DeepAI returns a URL to the generated image
//     return response.data.output_url;
//   } catch (error: any) {
//     console.error('[DeepAI API Error]', error.response?.data || error.message);
//     throw new Error('Image generation failed.');
//   }
// }

// src/services/imageGenService.ts
import axios from 'axios';

const REPLICATE_API_TOKEN = process.env.REPLICATE_API_TOKEN;

interface ReplicatePrediction {
  id: string;
  status: 'starting' | 'processing' | 'succeeded' | 'failed' | 'canceled';
  output?: string[] | null;
  error?: string;
  urls: {
    get: string;
  };
}

// Model configurations
const MODELS = {
  // Free models (no billing required)
  'stable-diffusion-v1-5': {
    version: "ac732df83cea7fff18b8472768c88ad041fa750ff7682a21affe81863cbe77e4",
    maxSize: 512,
    free: true
  },
  'stable-diffusion-v2-1': {
    version: "f178fa7a1ae43a9a9af01b833b9363a0cf11eed5a6b83e0e6b9de3e5abe6d6a",
    maxSize: 512,
    free: true
  },
  // Paid models (billing required)
  'sdxl': {
    version: "39ed52f2a78e934b3ba6e2a89f5b1c712de7dfea535525255b1aa35c5565e08b",
    maxSize: 1024,
    free: false
  }
};

export async function generateImageFromPrompt(
  prompt: string, 
  modelName: keyof typeof MODELS = 'stable-diffusion-v1-5'
): Promise<Buffer> {
  try {
    const model = MODELS[modelName];
    if (!model) {
      throw new Error(`Model ${modelName} not found`);
    }

    console.log(`[Replicate] Starting image generation with ${modelName} for:`, prompt);

    // Step 1: Create prediction
    const response = await axios.post<ReplicatePrediction>(
      'https://api.replicate.com/v1/predictions',
      {
        version: model.version,
        input: { 
          prompt,
          width: model.maxSize,
          height: model.maxSize,
          num_outputs: 1,
          num_inference_steps: 20,
          guidance_scale: 7.5
        }
      },
      {
        headers: {
          Authorization: `Token ${REPLICATE_API_TOKEN}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const predictionId = response.data.id;
    const statusUrl = `https://api.replicate.com/v1/predictions/${predictionId}`;
    
    console.log('[Replicate] Prediction created:', predictionId);

    // Step 2: Poll for completion
    let prediction: ReplicatePrediction;
    let attempts = 0;
    const maxAttempts = 60; // 5 minutes max

    do {
      await new Promise(resolve => setTimeout(resolve, 5000)); // Wait 5 seconds
      
      const statusResponse = await axios.get<ReplicatePrediction>(statusUrl, {
        headers: {
          Authorization: `Token ${REPLICATE_API_TOKEN}`,
        }
      });

      prediction = statusResponse.data;
      console.log(`[Replicate] Status check ${attempts + 1}: ${prediction.status}`);
      
      attempts++;
      
      if (attempts >= maxAttempts) {
        throw new Error('Image generation timed out');
      }
      
    } while (prediction.status === 'starting' || prediction.status === 'processing');

    // Step 3: Handle result
    if (prediction.status === 'succeeded' && prediction.output && prediction.output.length > 0) {
      const imageUrl = prediction.output[0];
      console.log('[Replicate] Image generated successfully:', imageUrl);
      
      // Download the image
      const imageResponse = await axios.get(imageUrl, {
        responseType: 'arraybuffer'
      });
      
      return Buffer.from(imageResponse.data);
    } else {
      throw new Error(`Image generation failed: ${prediction.error || 'Unknown error'}`);
    }

  } catch (error: any) {
    // Handle billing error specifically
    if (error?.response?.status === 402) {
      console.error('[Replicate] Billing required for this model. Trying free alternative...');
      
      // If it's a paid model and billing is required, try free alternative
      if (modelName !== 'stable-diffusion-v1-5') {
        console.log('[Replicate] Falling back to free model...');
        return generateImageFromPrompt(prompt, 'stable-diffusion-v1-5');
      }
    }
    
    console.error('[Replicate API Error]', error?.response?.data || error.message);
    throw new Error('Image generation failed.');
  }
}

// ✅ Simple function that always uses free model
export async function generateImageFromPromptFree(prompt: string): Promise<Buffer> {
  return generateImageFromPrompt(prompt, 'stable-diffusion-v1-5');
}

// ✅ Function to try premium model with fallback
export async function generateImageFromPromptPremium(prompt: string): Promise<Buffer> {
  try {
    // Try SDXL first
    return await generateImageFromPrompt(prompt, 'sdxl');
  } catch (error: any) {
    console.log('[Replicate] Premium model failed, falling back to free model');
    return await generateImageFromPrompt(prompt, 'stable-diffusion-v1-5');
  }
}

// ✅ Async version for immediate response
export async function generateImageFromPromptAsync(
  prompt: string, 
  modelName: keyof typeof MODELS = 'stable-diffusion-v1-5'
): Promise<string> {
  try {
    const model = MODELS[modelName];
    if (!model) {
      throw new Error(`Model ${modelName} not found`);
    }

    console.log(`[Replicate Async] Starting image generation with ${modelName} for:`, prompt);

    const response = await axios.post<ReplicatePrediction>(
      'https://api.replicate.com/v1/predictions',
      {
        version: model.version,
        input: { 
          prompt,
          width: model.maxSize,
          height: model.maxSize,
          num_outputs: 1
        }
      },
      {
        headers: {
          Authorization: `Token ${REPLICATE_API_TOKEN}`,
          'Content-Type': 'application/json'
        }
      }
    );

    return response.data.urls.get;
  } catch (error: any) {
    console.error('[Replicate API Error]', error?.response?.data || error.message);
    throw new Error('Image generation failed.');
  }
}

// ✅ Test function to verify connection
export async function testReplicateConnection(): Promise<boolean> {
  try {
    const response = await axios.get('https://api.replicate.com/v1/account', {
      headers: {
        Authorization: `Token ${REPLICATE_API_TOKEN}`,
      },
      timeout: 10000
    });
    
    console.log('[Replicate Test] Connection successful:', response.data.username);
    return true;
  } catch (error: any) {
    console.error('[Replicate Test] Connection failed:', error?.response?.data || error.message);
    return false;
  }
}

// ✅ Get model info
export function getModelInfo() {
  return MODELS;
}