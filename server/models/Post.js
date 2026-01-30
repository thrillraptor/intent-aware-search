import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    minLength: [3, "Title must be at least 3 characters long"], 
    maxLength: [100, "Title cannot exceed 100 characters"], 
  },
  content: {
    type: String,
    required: [true, "Body content is required"], 
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    index: true, 
  },
});

const Post = mongoose.model("Post", postSchema);
export default Post;
