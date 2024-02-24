import mongoose from "mongoose";

const connectDB = async() => {
    try {
       await mongoose.connect("mongodb+srv://richy:richy12345@mycluster.61numx5.mongodb.net/");
       console.log("MongoDB Connected...");
        
    } catch (error) {
        console.error(error.message);
        process.exit(1);
        
    }
}

export default connectDB