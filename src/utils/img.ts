import axios from 'axios';

export async function generateImageFromPrompt(prompt: string): Promise<Buffer> {
  const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

  // ✅ Correct Model URL
  const modelURL = 'https://generativelanguage.googleapis.com/v1beta2/models/imagegenerator:generate';

  const response = await axios.post(
    `${modelURL}?key=${GEMINI_API_KEY}`, // Append your API key
    {
      prompt: {
        text: prompt,
      },
    },
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      responseType: 'arraybuffer',
    }
  );

  return Buffer.from(response.data);
}

// Usage example:
generateImageFromPrompt("ganesh")
  .then((imgBuffer) => {
    console.log("Image Buffer received:", imgBuffer);
  })
  .catch((error) => {
    console.error(error);
  });



