import express from "express"
import { getAllBlogPosts, addPost, updatePost, deletePost, getPostByUserId } from "../controllers/blog_controller.js";

const blogRouter = express.Router();


blogRouter.get("/", getAllBlogPosts)
blogRouter.post("/add", addPost)
blogRouter.put("/update/:id", updatePost)
blogRouter.delete("/:id", deletePost)
blogRouter.get("/user/:id", getPostByUserId)

export default blogRouter