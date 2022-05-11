import express from "express";
import * as Post from "../controllers/post";
import { authMiddleware } from "../middleware/auth.";
import { upload } from "../middleware/upload";

const router = express();

router.post("/write", authMiddleware,upload.array('image'),  Post.wirtePost);
router.get("/mypage", authMiddleware, Post.readMyPost);
router.get("/:id", Post.readPost);
router.patch("/:id", authMiddleware, Post.updatePost);
router.delete("/:id", authMiddleware, Post.deletePost);

export default router;
