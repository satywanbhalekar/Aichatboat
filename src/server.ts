import app from "./app";
import env from "./config/env";
import fs from 'fs/promises';

// connectDB();

async function generateWithSD3() {
  const HF_API_TOKEN = process.env.HUGGING_FACE_API_KEY;

  if (!HF_API_TOKEN) {
      console.error('Hugging Face API Token not found. Please set HF_API_TOKEN in your .env file.');
      process.exit(1); // Exit with an error code
  }

  const model = 'stabilityai/stable-diffusion-3.5-large';
  const prompt = 'cinematic photo of a wizard casting a spell that spells out "Magic" in glowing runes, beautiful lighting, highly detailed.';

  console.log(`Sending request to SD3 model for prompt: "${prompt}"`);
  const apiUrl = `https://api-inference.huggingface.co/models/${model}`;

  try {
      const response = await fetch(
          apiUrl,
          {
              method: 'POST',
              headers: {
                  'Authorization': `Bearer ${HF_API_TOKEN}`,
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({ inputs: prompt }),
          }
      );

      if (!response.ok) {
          const errorPayload = await response.json(); // Attempt to parse error as JSON
          switch (response.status) {
              case 503:
                  console.log(`Model is loading, please wait and try again. Estimated time: ${errorPayload.estimated_time}s`);
                  break;
              case 401:
                  console.error(`Authentication error: ${errorPayload.error || response.statusText}. Please check your Hugging Face API Token.`);
                  break;
              case 400:
                  console.error(`Bad request: ${errorPayload.error || response.statusText}. Check your prompt and request body.`);
                  break;
              case 429:
                  console.error(`Rate limit exceeded: ${errorPayload.error || response.statusText}. Please wait before making more requests.`);
                  break;
              default:
                  console.error(`API request failed with status ${response.status}: ${errorPayload.error || response.statusText}`);
          }
          return; 
      }

      const imageBlob = await response.blob();
      const imageBuffer = Buffer.from(await imageBlob.arrayBuffer());

      const outputPath = 'sd3_wizard_nodejs.png';
      await fs.writeFile(outputPath, imageBuffer); // Use await with fs.writeFile

      console.log(`Image saved successfully to ${outputPath}`);

  } catch (error) {
      console.error('An unexpected error occurred:', error);
  }
}

generateWithSD3();

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

app.listen(env.PORT || 3010, () => {
  console.log(`Server running on port ${env.PORT}`);
});
