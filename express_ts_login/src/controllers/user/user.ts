import { resolveSoa } from "dns";
import { Request, Response, NextFunction } from "express";
import { userInfo } from "os";
import * as query from "./query";
import { access } from "./token";

export const signUp = async(req: Request, res: Response) => {
    const { name, email, password } = req.body;

    const user = await query.findOneEmail(email);

    if(user) throw new Error("이미 가입한 이메일");

    await query.create(name, email, password);

    res.status(200).json({
        message: "회원가입 성공"
    });
};

export const signIn = async(req: Request, res: Response) => {
    const { email, password } = req.body;
    const user = await query.findOneEmail(email);

    if(user.password == password) {
        const accessToken = await access(req, user);
        user.accessToken  = accessToken;

        user.save();

        res.status(200).json({
            message: "로그인 성공",
            accessToken
        });
    }
    else if(user.password !== password) {
        res.status(403).json({
            message: "옳지 않는 비밀번호"
        });
    }
    else {
        res.status(404).json({
            message: "존재하지 않는 이메일"
        });
    };


}