import express from "express";
import { mailSender } from "../controllers/mailer/mailer";
import * as Mail from "../controllers/mailer/mailcheck";


const router = express();

export let authNum: string;

router.get("/", (req, res) => {
    const { email } = req.body;

    authNum = Math.random().toString().substr(2,6);

    try{
        let emailParam = {
            toEmail: email,
            subject: "nodemailer 연습!",
            text: email + "님께\n" + "인증번호입니다! ->"+ authNum,
        };
    
        mailSender.sendGamil(emailParam);

        console.log(authNum);
        res.status(200).send("이메일 보내기 성공");
    } catch(err) {
        console.error(err);
        
        res.status(400).json({
            message: "이메일 보내기 실패"
        })
    }
});

router.post("/check", Mail.mailCheck);

export default router;