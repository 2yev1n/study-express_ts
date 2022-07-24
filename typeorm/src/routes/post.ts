import express from "express";
import * as controller from "../controllers/post";
import { authMiddleware } from "../middleware/token";

const router = express();

router.post("/", authMiddleware, controller.createPost);
router.get("/:id", controller.readOnePost);
router.patch("/:id", authMiddleware, controller.updatePost);
router.delete("/:id", authMiddleware, controller.deletePost);

export default router;