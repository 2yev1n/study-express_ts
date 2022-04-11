import express from "express";
import * as User from "../controllers/user/user";

const router = express();

router.post("/signup", User.signUp);
router.post("/login", User.signIn);

export default router;
