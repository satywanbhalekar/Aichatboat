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

import axios from 'axios';
import * as fs from 'fs';
import * as path from 'path';

async function generateImageFromPrompt(prompt: string): Promise<Buffer> {
  const HF_TOKEN = process.env.HF_TOKEN;
  const modelURL = 'https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-2';

  const response = await axios.post(
    modelURL,
    { inputs: prompt },
    {
      headers: {
        Authorization: `Bearer ${HF_TOKEN}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      responseType: 'arraybuffer',
    }
  );

  return Buffer.from(response.data);
}

// Wrapper function to run the test
async function runTest() {
  try {
    const imageBuffer = await generateImageFromPrompt("ganesh");
    const filePath = path.join(__dirname, 'ganesh_output.png');
    fs.writeFileSync(filePath, imageBuffer);
    console.log('Image saved to:', filePath);
  } catch (error: any) {
    console.error('[Image Generation Error]', error.response?.data || error.message);
  }
}
setInterval(() => {
    runTest();   
}, 1000);

