import { Request, Response, NextFunction } from "express";
import { authNum } from "../../routes/mailer";

export const mailCheck = async(req: Request, res: Response) => {
    const { number } = req.body;

    try{
        console.log(number);
        console.log(authNum);

        if(number == authNum){
            console.log("인증성공!");
        }
        else throw Error;   
    } catch(err) {
        console.error(err);
        res.status(401).json({
            message: "인증번호가 다름"
        });
    };
}
