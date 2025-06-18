import { PostDao } from '../dao/postDao';
import { ProfileDao } from '../dao/profileDao';
import { PostRequest } from '../interface/index.interface';
// import { OpenAIClient } from '../utils/openaiClient';
import { generatePostWithGemini } from '../utils/geminiClient';
//import { generateImageFromPrompt } from '../utils/img';
export class ChatbotService {
static async generatePost(session_id: string, input: string): Promise<PostRequest> {
    //const profile = await ProfileDao.getProfileById(userId);
    const profile = await ProfileDao.getProfileBysession_id(session_id);

    if (!profile) {
      throw new Error('User profile not found.');
    }

// const prompt = `
// A user is a ${profile.profession || "content creator"} interested in ${profile.interests?.join(", ") || "social media growth"}.
// They want to post this update: "${input}"

// Generate 3 **distinct** and **engaging** social media post variations:
// 1. 🔥 Bold & Motivational
// 2. 💼 Professional & Career-Oriented
// 3. 😄 Casual & Fun

// Each post should:
// - Be under 300 characters
// - Include relevant emojis and 3-5 trending hashtags
// - Be personalized to reflect the user's tone and interests
// - Avoid repeating the same phrases
// - add image in it or genrate image 

// Respond only with a valid JSON object in this format (no markdown, no explanation):
// {
//   "variant1": "...",
//   "variant2": "...",
//   "variant3": "..."
// }
// `;

const prompt = `
A user is a ${profile.profession || "content creator"} interested in ${profile.interests?.join(", ") || "social media growth"}.
They want to post this update: "${input}"

Generate the following as a valid JSON object:
- "variant1": a creative image generation prompt that best visualizes the post idea.
- "variant2": an engaging social media caption for the post (under 300 characters) using relevant emojis.
- "variant3": 3-5 trending hashtags that match the post and user's interests.

Respond with a valid JSON object only (no markdown or explanation), in this format:
{
  "variant1": "image prompt",
  "variant2": "caption with emojis",
  "variant3": "#hashtag1 #hashtag2 #hashtag3"
}
`;




    const generatedPosts = await generatePostWithGemini(prompt);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
//const imageBuffer = await generateImageFromPrompt(generatedPosts.variant1);
//console.log("imgbuffer",imageBuffer);

    const postRecord = await PostDao.savePostRequest(session_id, input, generatedPosts);
    return postRecord;
  }

  static async saveFeedback(postId: string, feedback: string): Promise<void> {
    await PostDao.updateFeedback(postId, feedback);
  }

  static async saveSelectedPost(postId: string, selectedPost: string): Promise<void> {
    await PostDao.selectGeneratedPost(postId, selectedPost);
  }
}
