import express from "express";
import user from "./user";
import mailer from "./mailer";
 
const router = express();

router.use("/user", user);
router.use("/mail", mailer);

export default router;