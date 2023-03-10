import mongoose from "mongoose";
import BlogInterface from "../interfaces/blog";

mongoose.set("strictQuery", false);

const blogSchema = new mongoose.Schema<BlogInterface>({
  title: {
    type: String,
    required: [true, "title required"],
  },
  author: {
    type: String,
    required: [true, "author required"],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  url: String,
  likes: Number,
});

blogSchema.set("toJSON", {
  transform(_doc, ret: BlogInterface) {
    ret.id = ret._id;
    delete ret._id;
  },
});

const Blog = mongoose.model("Blog", blogSchema);

export default Blog;
