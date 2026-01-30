import Post from "../models/Post.js";

export const post = {
  getPosts: async (req, res) => {
    try {
      const posts = await Post.find().sort({ createdAt: -1 });
      res.status(200).json({
        success: true,
        count: posts.length,
        posts: posts,
      });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },
};
