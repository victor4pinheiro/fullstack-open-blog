import mongoose from "mongoose";

mongoose.set("strictQuery", false);

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "title required"],
  },
  author: {
    type: String,
    required: [true, "author required"],
  },
  url: String,
  likes: Number,
});

const Blog = mongoose.model("Blog", blogSchema);

export default Blog;
