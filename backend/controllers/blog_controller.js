import mongoose from "mongoose";
import Blog from "../modules/Blog.js";
import User from "../modules/User.js";

export const getAllBlogPosts = async(req, res, next) => {
    try {
        const blogs = await Blog.find();
        return res.status(500).json(blogs);
    } catch (error) {
        console.error(error)
        return res.status(500).json({ message: 'Server Error, No post available' });
    }
}

export const addPost = async(req, res, next) => {
    try {
        const {title, description, image, user } = req.body;

        const existingUser = await User.findById(user)
        if(!existingUser){
            return res.status(400).json({Message: "No user with such id found"})
        }
   
        const post = new Blog({title, description, image, user})
        const session = await mongoose.startSession()
        session.startTransaction();
        await post.save({ session })
        existingUser.blogs.push(post)
        await existingUser.save({session : session})
        await session.commitTransaction(session)
        // Return the newly created post
        return res.status(201).json(post)

    } catch (error) {
        console.error(error)
    }
}

export const updatePost = async(req, res, next) => {
    try {
        const {title, description, image } = req.body;
        const blogId = req.params.id;
        // const blog = await Blog.findById(blogId)
        const blog = await Blog.findByIdAndUpdate(blogId, { title, description, image })
        if (!blog) {           
            return res.status(500).json({Message: "Cannot update post"})
        }
        else {
            return res.status(200).json(blog)
        }
        // if(!blog){
        //     throw new Error("There is no post to update")
        // }
        // else {
        //     blog.title = req.body.title || blog.title,
        //     blog.description = req.body.description || blog.description,
        //     blog.image =  req.body.image ? req.body.image : blog.image,
        //     blog.author = req.body.author || blog.author

        //     const  updatedBlog = await blog.save()
        //     res.status(200).json(updatedBlog)
        // }
    } catch (error) {
        console.error(error);
        
    }
}

export const deletePost = async(req, res, next) => {
   try {
       const postId = req.params.id;
       const deletePost = await Blog.findByIdAndDelete(postId).populate("user")
       await deletePost.user.blogs.pull(deletePost)
       await deletePost.user.save();
       if(!deletePost) {
        return res.status(404).json({ Message: 'No Post Found'})
       }else{
        res.status(200).json({"Post deleted successfully": deletePost})
       }
    } catch (error) {
      console.error(error)
      res.status(500).send('Server error')
    }
}

export const getPostById = async(req, res, next) => {
    try {
        const postId = req.params.id;

        const getSinglePost = await Blog.findById(postId)
        if(!getSinglePost){
            return res.status(404).json({Message: "Post with such id not found"})
        }
        res.status(201).json(getSinglePost)
        
    } catch (error) {
        console.error(error)
        res.status(500).send("Internal Server error")
    }
}

export const getPostByUserId = async(req, res, next) => {
    const userId = req.params.id;

    try {
        const userPosts = await User.findById(userId).populate("blogs")
        if(!userPosts){
            return res.status(404).json({Message: "No post found  for this user."})
        }
        res.status(200).json({blogs: userPosts})
    } catch (error) {
        
    }
}