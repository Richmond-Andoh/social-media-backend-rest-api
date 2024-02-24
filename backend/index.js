import express from "express";
import connectDB from "./config/dbconnection.js"
import router from "./routes/user_route.js";
import blogRouter from "./routes/blog_route.js";
const app = express()
const PORT = process.env.PORT || 5900

connectDB();

app.use(express.json());
app.use("/api/user", router)
app.use("/api/blog", blogRouter)


app.listen(PORT, () => {
    console.log(`The Application is running on port ${PORT}`)
})