import mongoose from "mongoose";

const postChunkSchema = new mongoose.Schema({
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
    required: true,
    index: true,
  },

  title: {
    type: String,
    required: true,
    trim: true,
  },

  contentChunk: {
    type: String,
    required: true,
    trim: true,
  },

  chunkIndex: {
    type: Number,
    required: true,
  },

  embedding: {
    type: [Number],
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
    index: true,
  },
});

const PostChunk = mongoose.model("PostChunk", postChunkSchema);
export default PostChunk;
