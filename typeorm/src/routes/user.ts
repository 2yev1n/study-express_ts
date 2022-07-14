import express from "express";
import * as controller from "../controllers/user";

const router = express();

router.post("signup", controller.signUp);

export default router;