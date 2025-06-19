// utils/stabilityClient.ts
import axios from 'axios';

const STABILITY_API_URL = 'https://api.stability.ai/v1/generation/stable-diffusion-xl-1024-v1-0/text-to-image';
const API_KEY = process.env.STABILITY_API_KEY;

export async function generateImageFromStability(prompt: string): Promise<Buffer> {
  if (!API_KEY) {
    throw new Error('STABILITY_API_KEY not set in environment');
  }

  const response = await axios.post(
    STABILITY_API_URL,
    {
      text_prompts: [
        { text: prompt, weight: 1 },
        { text: "blurry, bad quality, distorted", weight: -1 },
      ],
      cfg_scale: 7,
      height: 512,
      width: 512,
      steps: 30,
      samples: 1,
    },
    {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${API_KEY}`,
      },
    }
  );

  const base64Image = response.data.artifacts?.[0]?.base64;
  if (!base64Image) {
    throw new Error('Image not returned from Stability AI');
  }

  return Buffer.from(base64Image, 'base64');
}
