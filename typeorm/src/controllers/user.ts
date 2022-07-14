import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { User } from "../entity/User";
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