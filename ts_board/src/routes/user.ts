import express from "express";
import * as controller from "../controllers/user";

const router = express();

router.post("/", controller.signUp);
router.post("/login", controller.signIn)

export default router;