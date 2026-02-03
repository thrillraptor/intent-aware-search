import PostChunk from "../models/PostChunk.js";
import Post from "../models/Post.js";
import { ChunkingService } from "../services/chunking.service.js";
import { EmbeddingService } from "../services/embedding.service.js";
import connectDatabase from "../config/db.config.js";
import env from "../config/env.config.js";

let uri = env.URI;

async function generateEmbeddings() {
  try {
    await connectDatabase(uri);

    await PostChunk.deleteMany({});
    console.log("Old embeddings cleared");

    const posts = await Post.find({});
    console.log(`Found ${posts.length} posts`);

    for (const post of posts) {
      const chunks = await ChunkingService(post);

      for (const chunk of chunks) {
        const embeddedChunk = await EmbeddingService(chunk);

        if (!embeddedChunk) {
          continue;
        }

        await PostChunk.create(embeddedChunk);
      }
    }
    console.log("Embedding generation completed");
    process.exit(0);
  } catch (error) {
    console.error("Embedding generation failed:", error);
    process.exit(1);
  }
}

generateEmbeddings();
