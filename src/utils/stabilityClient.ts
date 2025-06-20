// // utils/stabilityClient.ts
// import axios from 'axios';

// const STABILITY_API_URL = 'https://api.stability.ai/v1/generation/stable-diffusion-xl-1024-v1-0/text-to-image';
// //const STABILITY_API_URL = 'https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0/text-to-image';
// const API_KEY = process.env.STABILITY_API_KEY;

// // eslint-disable-next-line @typescript-eslint/no-unused-vars
// export async function generateImageFromStability(prompt: string, p0: { width: number; height: number; steps: number; guidance_scale: number; negative_prompt: string; }): Promise<Buffer> {
//   if (!API_KEY) {
//     throw new Error('STABILITY_API_KEY not set in environment');
//   }

//   const response = await axios.post(
//     STABILITY_API_URL,
//     {
//       text_prompts: [
//         { text: prompt, weight: 1 },
//         { text: "blurry, bad quality, distorted", weight: -1 },
//       ],
//       cfg_scale: 7,
//       height: 1024,
//       width: 1024,
//       steps: 30,
//       samples: 1,
//     },
//     {
//       headers: {
//         'Content-Type': 'application/json',
//         Accept: 'application/json',
//         Authorization: `Bearer ${API_KEY}`,
//       },
//     }
//   );

//   const base64Image = response.data.artifacts?.[0]?.base64;
//   if (!base64Image) {
//     throw new Error('Image not returned from Stability AI');
//   }

//   return Buffer.from(base64Image, 'base64');
// }


// import axios from 'axios';

// const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-preview-image-generation:generateContent';
// const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

// export async function generateImageFromGemini(prompt: string): Promise<Buffer> {
//   if (!GEMINI_API_KEY) {
//     throw new Error('GEMINI_API_KEY is not set in environment');
//   }

//   const response = await axios.post(
//     `${GEMINI_API_URL}?key=${GEMINI_API_KEY}`,
//     {
//       contents: [
//         {
//           parts: [{ text: prompt }]
//         }
//       ],
//       generationConfig: {
//         responseModalities: ["TEXT", "IMAGE"]
//       }
//     },
//     {
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     }
//   );

//   // Check response structure
//   const imageBase64 = response.data?.candidates?.[0]?.image?.base64;

//   if (!imageBase64) {
//     throw new Error('Image not returned from Gemini');
//   }

//   return Buffer.from(imageBase64, 'base64');
// }

import axios from 'axios';

const GEMINI_IMAGE_API = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-preview-image-generation:generateContent';
const API_KEY = process.env.GEMINI_API_KEY!;

export async function generateImageFromGemini(prompt: string): Promise<Buffer> {
  const response = await axios.post(
    `${GEMINI_IMAGE_API}?key=${API_KEY}`,
    {
      contents: [{
        parts: [
          { text: prompt }
        ]
      }],
      generationConfig: {
        responseModalities: ["TEXT", "IMAGE"]
      }
    },
    {
      headers: { 'Content-Type': 'application/json' }
    }
  );

  const data = response.data;

  const parts = data?.candidates?.[0]?.content?.parts;

  if (!parts || parts.length < 2 || !parts[1].inlineData?.data) {
    console.error("⚠️ Unexpected Gemini image response structure:", JSON.stringify(data, null, 2));
    throw new Error("Image not returned from Gemini.");
  }

  const base64Image = parts[1].inlineData.data;
  return Buffer.from(base64Image, 'base64');
}
