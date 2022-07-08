import express from "express";
import * as User from "../controllers/user";

const router = express();

router.post("/", User.signUp);
router.post("/login", User.signIn)

export default router;