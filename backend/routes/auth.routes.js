import express from "express";
import { register, login, me, logout } from "../controllers/auth.controller.js";
const authRouter = express.Router();

// Register new user
authRouter.post("/register", register);

// Login user
authRouter.post("/login", login);

// Get current user info
authRouter.get("/me", me);

// Logout
authRouter.post("/logout", logout);

export default authRouter;
