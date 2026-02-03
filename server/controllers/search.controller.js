import { validationResult } from "express-validator";
import { embed } from "../libs/model-loader.js";
import PostChunk from "../models/PostChunk.js";
import Post from "../models/Post.js";
import { SimilaritySearch } from "../services/search.service.js";

export const search = {
  searchPost: async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(404).json({ error: errors.array() });
      }

      const { searchQuery, topK = 5 } = req.body;

      const queryEmbedding = await embed(searchQuery);

      if (!Array.isArray(queryEmbedding)) {
        throw new Error("Query embedding generation failed");
      }

      const chunks = await PostChunk.find(
        {},
        {
          postId: 1,
          contentChunk: 1,
          embedding: 1,
        },
      ).lean();

      const rankedChunks = SimilaritySearch({
        queryEmbedding,
        documents: chunks,
        topK: 50,
      });

      const postScoreMap = new Map();

      for (const chunk of rankedChunks) {
        const postId = chunk.postId.toString();

        if (
          !postScoreMap.has(postId) ||
          chunk.score > postScoreMap.get(postId).score
        ) {
          postScoreMap.set(postId, {
            score: chunk.score,
            snippet: chunk.contentChunk,
          });
        }
      }

      const postIds = Array.from(postScoreMap.keys());
      const posts = await Post.find(
        {
          _id: { $in: postIds },
        },
        { title: 1, content: 1 },
      ).lean();

      const rankedPosts = posts
        .map((post) => ({
          ...post,
          score: postScoreMap.get(post._id.toString()).score,
          //   snippet: postScoreMap.get(post._id.toString()).snippet,
        }))
        .sort((a, b) => b.score - a.score)
        .slice(0, topK);

      return res.status(200).json({
        count: rankedPosts.length,
        results: rankedPosts,
      });
    } catch (error) {
      console.error("Semantic search failed:", error);
      return res.status(500).json({ error: "Semantic search failed" });
    }
  },
};
