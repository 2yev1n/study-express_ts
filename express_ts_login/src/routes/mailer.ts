import express from "express";
import { mailSender } from "../controllers/mailer/mailer";

const router = express();

router.get("/mail", (req, res) => {
    const { email } = req.body;

    try{
        let emailParam = {
            toEmail: email,
            subject: "nodemailer 연습!",
            text: email + "님께 사랑합니다~ㅎㅎ 오늘도 좋은 하루 보내세요. 스펨이메일 아닙니다. 이것은 이예빈의 연습용 nodemailer이라고요!!!!!"
        };
    
        mailSender.sendGamil(emailParam);

        res.status(200).send("이메일 보내기 성공");
    } catch(err) {
        console.error(err);
        
        res.status(400).json({
            message: "이메일 보내기 실패"
        })
    }
})

export default router;