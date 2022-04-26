import express from "express";
import * as User from "../controllers/user";

const router = express();

router.post("/signup", User.signUp);

export default router;