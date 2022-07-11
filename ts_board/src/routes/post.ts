import express from "express";
import * as controller from "../controllers/post";
import { authMiddleware } from "../middleware/auth";
import { upload } from "../middleware/upload";

const router = express();

router.post("/", authMiddleware, upload.single('image'),  controller.wirtePost);
router.get("/", controller.readAllPost);
router.get("/mypage", authMiddleware, controller.readMyPost);
router.get("/:id", controller.readPost);
router.patch("/:id", authMiddleware, controller.updatePost);
router.delete("/:id", authMiddleware, controller.deletePost);

export default router;
