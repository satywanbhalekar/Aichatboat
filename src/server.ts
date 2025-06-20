import app from "./app";
import env from "./config/env";
import { generateImageFromPrompt } from "./utils/img";
import { generateImageFromGemini } from "./utils/stabilityClient";

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
// const interval = setInterval(async () => {
//   try {
//     console.log("interval triggered");

//     const imageBuffer = await generateImageFromStability(
//       "a futuristic robot working at a desk in a tech office",
//       {
//         width: 1024,
//         height: 1024,
//         steps: 30,
//         guidance_scale: 7,
//         negative_prompt: "blurry, low quality, distorted",
//       }
//     );

//     console.log("Image generated, buffer size:", imageBuffer.length);
//     // Optionally save to file or further process
//     // fs.writeFileSync('output.png', imageBuffer);

//   } catch (err) {
//     console.error("Image generation error:", (err as Error).message);
//   }
// }, 10000); // ⏱️ safer: call once every 10 seconds to avoid API rate limits

// setInterval(() => {
//   //generateImageFromPrompt("ganesh")
//   generateImageFromGemini("ganesh")
//  .then((imgBuffer) => {
//     console.log("Image Buffer received:", imgBuffer);
//   })
//   .catch((error) => {
//     console.error(error);
//   });
// }, 1000);


app.listen(env.PORT || 3010, () => {
  console.log(`Server running on port ${env.PORT}`);
});
