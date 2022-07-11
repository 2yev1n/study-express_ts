import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { User } from "../models/user";
import crypto from "crypto";

const salt = process.env.SALT;

export const signUp = async (req: Request, res: Response) => {
    const { email, name, password } = req.body;

    try{
        const hashPassword = crypto
        .createHash('sha512')
        .update(password + salt)
        .digest('hex');

        const newUser = await User.create({
            email,
            name,
            password: hashPassword
        });

        res.status(200).json({
            message: "회원가입 성공",
        });
    } catch(err) {
        res.status(409).json({
            message: "이미 있는 이메일"
        });
        console.error(err);
    }
};

export const signIn = async (req: Request, res: Response) => {

    const { email, password } = req.body;
    const secretKey = req.app.get("jwt-secret")

    const hashPassword = crypto
        .createHash('sha512')
        .update(password + salt)
        .digest('hex')

    try{
        const user = await User.findOne({
            where: {
                email: email
            }
        });
        
        if(user == undefined) throw Error;

        if(user?.password == hashPassword) {
            const accessToken = jwt.sign(
                {
                    email: user?.email,
                    id: user?.id
                }, secretKey,
                {
                    expiresIn: "1h",
                }
            )
            res.status(200).json({
                message: "로그인 성공",
                accessToken
            });
        } else {
            res.status(401).json({
                message: "비밀번호 틀림"
            });
        }
    } catch(err) {
        console.error(err);
        res.status(404).json({
            message: "찾을 수 없는 이메일"
        });
    }
};