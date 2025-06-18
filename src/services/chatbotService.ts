import { PostDao } from '../dao/postDao';
import { ProfileDao } from '../dao/profileDao';
import { PostRequest } from '../interface/index.interface';
// import { OpenAIClient } from '../utils/openaiClient';
import { generatePostWithGemini } from '../utils/geminiClient';

export class ChatbotService {
//   static async generatePost(userId: string, input: string): Promise<PostRequest> {
//     const profile = await ProfileDao.getProfileById(userId);

//     // Generate prompt based on input + profile
//     const prompt = `Create 3 engaging social media post variations for a user with the following details:
//     Profession: ${profile.profession}
//     Interests: ${profile.interests?.join(', ')}
//     Input: ${input}`;

//     const aiResponse = await OpenAIClient.generatePost(prompt);

//     const generatedPosts: Record<string, string> = {
//         variant1: aiResponse.choices[0]?.message?.content ?? '',
//         variant2: aiResponse.choices[1]?.message?.content ?? '',
//         variant3: aiResponse.choices[2]?.message?.content ?? '',
//       };
      

//     const postRecord = await PostDao.savePostRequest(userId, input, generatedPosts);
//     return postRecord;
//   }

static async generatePost(userId: string, input: string): Promise<PostRequest> {
    const profile = await ProfileDao.getProfileById(userId);

    if (!profile) {
      throw new Error('User profile not found.');
    }

    // Construct prompt with user profile context
//     const prompt = `Create 3 engaging social media post variations for a user with the following details:
// Profession: ${profile.profession}
// Interests: ${profile.interests?.join(', ') || 'N/A'}
// Input: "${input}"`;

const prompt = `
A user is a ${profile.profession || "content creator"} interested in ${profile.interests?.join(", ") || "social media growth"}.
They want to post this update: "${input}"

Generate 3 **distinct** and **engaging** social media post variations:
1. 🔥 Bold & Motivational
2. 💼 Professional & Career-Oriented
3. 😄 Casual & Fun

Each post should:
- Be under 300 characters
- Include relevant emojis and 3-5 trending hashtags
- Be personalized to reflect the user's tone and interests
- Avoid repeating the same phrases
- add image in it or genrate image 

Respond only with a valid JSON object in this format (no markdown, no explanation):
{
  "variant1": "...",
  "variant2": "...",
  "variant3": "..."
}
`;


    const generatedPosts = await generatePostWithGemini(prompt);

    const postRecord = await PostDao.savePostRequest(userId, input, generatedPosts);
    return postRecord;
  }

  static async saveFeedback(postId: string, feedback: string): Promise<void> {
    await PostDao.updateFeedback(postId, feedback);
  }

  static async saveSelectedPost(postId: string, selectedPost: string): Promise<void> {
    await PostDao.selectGeneratedPost(postId, selectedPost);
  }
}
