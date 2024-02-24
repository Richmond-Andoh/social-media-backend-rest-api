import mongoose, { model } from "mongoose";

const blogSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    }, 

    description: {
        type: String,
        required: true
    },

    image: {
        type: String,
        required: true
    },

    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User', // This is a reference to the User model
        required: true
    },

    createdAt: {
        type: Date,
        default: new Date()
    }
})

const Blog = mongoose.model("Blog", blogSchema)

export default Blog;