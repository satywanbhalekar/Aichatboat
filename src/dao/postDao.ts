import {supabase} from '../config/db';
import { PostRequest } from '../interface/index.interface';
import { v4 as uuidv4 } from 'uuid';

export class PostDao {
  // static async savePostRequest(
  //   session_id: string,
  //   input: string,
  //   generatedPosts: Record<string, string>
  // ): Promise<PostRequest> {
  //   const { data, error } = await supabase
  //     .from('post_requests')
  //     .insert([
  //       {
  //         session_id: session_id,
  //         raw_input: input,
  //         generated_posts: generatedPosts,
  //       },
  //     ])
  //     .select()
  //     .single();

  //   if (error) throw new Error(error.message);
  //   return data as PostRequest;
  // }



  static async savePostRequest(
    session_id: string,
    input: string,
    generatedPosts: Record<string, string>,
    imageBuffer: Buffer
  ): Promise<PostRequest> {
    // 👇 Set the correct bucket name (use one bucket consistently)
    const bucketName = 'stabal-difiusion';
    const fileName = `${uuidv4()}.png`;
  
    // 1. Upload the image
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from(bucketName)
      .upload(fileName, imageBuffer, {
        contentType: 'image/png',
        upsert: true,
      });
  
    if (uploadError) throw new Error(`Image upload failed: ${uploadError.message}`);
  
    // 2. Get public URL
    const { data: publicUrlData } = supabase
    .storage
    .from(bucketName)
    .getPublicUrl(fileName);
  
  const imageUrl = publicUrlData.publicUrl;
  if (!imageUrl) throw new Error("Failed to get image public URL");
  
    // 3. Save to post_requests
    const { data, error } = await supabase
      .from('post_requests')
      .insert([
        {
          session_id,
          raw_input: input,
          generated_posts: generatedPosts,
          image_url: imageUrl,
        },
      ])
      .select()
      .single();
  
    if (error) throw new Error(`Post insert failed: ${error.message}`);
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
