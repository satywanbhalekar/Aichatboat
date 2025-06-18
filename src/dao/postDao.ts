import {supabase} from '../config/db';
import { PostRequest } from '../interface/index.interface';

export class PostDao {
  static async savePostRequest(
    userId: string,
    input: string,
    generatedPosts: Record<string, string>
  ): Promise<PostRequest> {
    const { data, error } = await supabase
      .from('post_requests')
      .insert([
        {
          user_id: userId,
          raw_input: input,
          generated_posts: generatedPosts,
        },
      ])
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data as PostRequest;
  }

  static async updateFeedback(postId: string, feedback: string): Promise<void> {
    const { error } = await supabase
      .from('post_requests')
      .update({ feedback })
      .eq('id', postId);

    if (error) throw new Error(error.message);
  }

  static async selectGeneratedPost(postId: string, selectedPost: string): Promise<void> {
    const { error } = await supabase
      .from('post_requests')
      .update({ selected_post: selectedPost })
      .eq('id', postId);

    if (error) throw new Error(error.message);
  }
}
