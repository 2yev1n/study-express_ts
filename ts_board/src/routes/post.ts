import express from "express";
import * as Post from "../controllers/post";
import { authMiddleware } from "../middleware/auth.";
const router = express();

router.post("/write", authMiddleware, Post.wirtePost);
router.get("/:id", Post.readPost);

export default router;