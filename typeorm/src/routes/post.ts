import express from "express";
import * as controller from "../controllers/post";
import { authMiddleware } from "../middleware/token";

const router = express();

router.post("/", authMiddleware, controller.createPost);
router.patch("/:id", authMiddleware, controller.updatePost);

export default router;