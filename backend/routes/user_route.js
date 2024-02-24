import express from "express"
import {deleteUser, getAllUsers, registerUser, userLoggin } from "../controllers/user_controller.js"

const router = express.Router()

router.get("/", getAllUsers)
router.post( "/register", registerUser ).post("/login", userLoggin)
router.delete("/:id", deleteUser)

export default router