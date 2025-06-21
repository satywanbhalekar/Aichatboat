// import { PostDao } from '../dao/postDao';
// import { ProfileDao } from '../dao/profileDao';
// import { PostRequest } from '../interface/index.interface';
// // import { OpenAIClient } from '../utils/openaiClient';
// import { generatePostWithGemini } from '../utils/geminiClient';
// import { generateImageFromGemini } from '../utils/stabilityClient';
// //import { generateImageFromPrompt } from '../utils/img';
// export class ChatbotService {
// static async generatePost(session_id: string, input: string): Promise<PostRequest> {
//     //const profile = await ProfileDao.getProfileById(userId);
//     const profile = await ProfileDao.getProfileBysession_id(session_id);

//     if (!profile) {
//       throw new Error('User profile not found.');
//     }

// const prompt = `
// A user is a ${profile.profession || "content creator"} interested in ${profile.interests?.join(", ") || "social media growth"}.
// They want to post this update: "${input}"

// Generate the following as a valid JSON object:
// - "variant1": a creative image generation prompt that best visualizes the post idea.
// - "variant2": an engaging social media caption for the post (under 300 characters) using relevant emojis.
// - "variant3": 3-5 trending hashtags that match the post and user's input.

// Respond with a valid JSON object only (no markdown or explanation), in this format:
// {
//   "variant1": "image prompt",
//   "variant2": "caption with emojis",
//   "variant3": "#hashtag1 #hashtag2 #hashtag3"
// }
// `;
// const generatedPosts = await generatePostWithGemini(prompt);

// // After generating post content...
// console.log("🔍 Image Prompt:", generatedPosts.variant1);
// console.log("🧪 Gemini Output:", generatedPosts);

// //const imageBuffer = await generateImageFromStability(generatedPosts.variant1);
// const imageBuffer = await generateImageFromStability(input, {
//   width: 1024,
//   height: 1024,
//   steps: 30,
//   guidance_scale: 7,
//   negative_prompt: "blurry, low quality, distorted"
// });

// console.log("imgbuffer",imageBuffer);
//     const postRecord = await PostDao.savePostRequest(session_id, input, generatedPosts,imageBuffer);
//     return postRecord;
// }

//   static async saveFeedback(postId: string, feedback: string): Promise<void> {
//     await PostDao.updateFeedback(postId, feedback);
//   }

//   static async saveSelectedPost(postId: string, selectedPost: string): Promise<void> {
//     await PostDao.selectGeneratedPost(postId, selectedPost);
//   }
// }


import { PostDao } from "../dao/postDao";
import { OnboardingDao } from "../dao/OnboardingDao";
import { PostRequest } from "../interface/index.interface";
import { generatePostWithGemini } from "../utils/geminiClient"; // Text generation
import { generateImageFromGemini } from "../utils/stabilityClient"; // New Gemini Image generation

export class ChatbotService {
  static async generatePost(session_id: string, input: string): Promise<PostRequest> {
    const profile = await OnboardingDao.getProfileBysession_id(session_id);

    if (!profile) {
      throw new Error("User profile not found.");
    }

    const prompt = `
A user is a ${profile.profession || "content creator"} interested in ${profile.interests?.join(", ") || "social media growth"}.
They want to post this update: "${input}"

Generate the following as a valid JSON object:
- "variant1": a creative image generation prompt that best visualizes the post idea.
- "variant2": an engaging social media caption for the post (under 300 characters) using relevant emojis.
- "variant3": 3-5 trending hashtags that match the post and user's input.

Respond with a valid JSON object only (no markdown or explanation), in this format:
{
  "variant1": "image prompt",
  "variant2": "caption with emojis",
  "variant3": "#hashtag1 #hashtag2 #hashtag3"
}
`;

    const generatedPosts = await generatePostWithGemini(prompt);

    console.log("🔍 Image Prompt:", generatedPosts.variant1);
    console.log("🧪 Gemini Output:", generatedPosts);
console.log("input ",input);

    // ✅ Use Gemini image generation
    const imageBuffer = await generateImageFromGemini(input);

    console.log("imgBuffer received:", imageBuffer);

    const postRecord = await PostDao.savePostRequest(session_id, input, generatedPosts, imageBuffer);
    return postRecord;
  }

  static async saveFeedback(postId: string, feedback: string): Promise<void> {
    await PostDao.updateFeedback(postId, feedback);
  }

  static async saveSelectedPost(postId: string, selectedPost: string): Promise<void> {
    await PostDao.selectGeneratedPost(postId, selectedPost);
  }
}
