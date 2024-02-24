import mongoose, { model } from "mongoose";

const userSchema = mongoose.Schema({
    username: {
        type: String,
        require: true
    },

    email: {
        type: String,
        require: true,
        unique: true
    },

    password: {
        type: String,
        require: true,
        
    },

    blogs: [
        {
            type: mongoose.Types.ObjectId,
            ref: "Blog", //reference to the blog post
            required: true
        }
    ],
   
    createdAt: {
       type: Date,
       default: new Date() 
    }
})

const User = mongoose.model("User", userSchema)

export default User;