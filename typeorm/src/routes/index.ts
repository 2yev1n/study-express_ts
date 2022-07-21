import express from "express";
import User from "./user";
import Post from "./post";

const router = express();

router.use("/post", Post);
router.use("/user", User);

export default router;