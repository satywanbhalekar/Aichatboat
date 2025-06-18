import OpenAI from 'openai';
import config from '../config/env';

const openai = new OpenAI({
  apiKey: config.OPENAI_API_KEY, // ✅ Store this in your .env
});

export class OpenAIClient {
  static async generatePost(prompt: string) {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo', // or gpt-4 if available
      messages: [
        {
          role: 'system',
          content: 'You are a helpful assistant that writes social media posts.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.7,
      n: 3, // for 3 variations
    });

    return response;
  }
}
