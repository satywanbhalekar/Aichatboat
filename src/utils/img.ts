// import axios from 'axios';

// export async function generateImageFromPrompt(prompt: string): Promise<Buffer> {
//   const HF_TOKEN = process.env.HF_TOKEN;
//   const modelURL = 'https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-2';

//   const response = await axios.post(
//     modelURL,
//     { inputs: prompt },
//     {
//       headers: {
//         Authorization: `Bearer ${HF_TOKEN}`,
//         Accept: 'application/json',
//         'Content-Type': 'application/json',
//       },
//       responseType: 'arraybuffer',
//     }
//   );

//   return Buffer.from(response.data);
// }

// generateImageFromPrompt("ganesh")



