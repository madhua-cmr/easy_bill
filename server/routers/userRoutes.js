import express from "express";
import { loginUser, logoutUser, signupUser } from "../controllers/user.controller.js";

const router=express.Router();

router.post("/login",loginUser);
router.post("/signup",signupUser);
router.get("/logout",logoutUser);

export default router;