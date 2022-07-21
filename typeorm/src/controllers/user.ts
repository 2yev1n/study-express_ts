import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { User } from "../entity/user";
import crypto from "crypto";
import { getManager } from "typeorm";

const salt = process.env.SALT;

export async function signUp(req: Request, res: Response) {
    const userRepository = getManager().getRepository(User);

    const { email, name, password } = req.body;

    try{
        const hashPassword = crypto
            .createHash('sha512')
            .update(password + salt)
            .digest('hex');

        const newUser = userRepository.create({
            email,
            name,
            password: hashPassword
        });

        await userRepository.save(newUser);

        res.status(200).json({
            message: "회원가입 성공"
        });
    } catch(err) {
        console.error(err);
        res.status(409).json({
            message: "이미 가입한 이메일"
        });
    };
};

export async function login(req: Request, res: Response, next: NextFunction) {
    const userRepository = getManager().getRepository(User);

    const { email, password } = req.body;
    const secretKey = req.app.get("jwt-secret");

    const hashPassword = crypto
        .createHash('sha512')
        .update(password + salt)
        .digest('hex')

    try{
        const user = await userRepository.findOne({
            where: {
                email: email
            }
        });

        if(user.password == hashPassword) {
            const accessToken = jwt.sign(
                {
                    email: user?.email,
                    id: user?.id
                }, secretKey,
                {
                    expiresIn: "1h"
                }
            );

            res.status(200).json({
                message: "로그인 성공",
                accessToken
            });
        } else {
            res.status(401).json({
                message: "맞지 않은 비밀번호"
            });
        }
    } catch(err) {
        console.error(err);
        res.status(404).json({
            message: "회원가입 되지 않은 이메일"
        });
    };
 };