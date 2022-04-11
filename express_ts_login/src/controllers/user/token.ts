import jwt from "jsonwebtoken";
import { Request } from "express";
import { User } from "../../models/user";

export const access = async(req: Request, user: User) => {
    const secretKey = req.app.get("jwt-secret");
    const token: string = await jwt.sign(
        {
            id: user["id"],
            name: user["name"],
            email: user["email"],
        },
        secretKey,
        {
            expiresIn: "1h",
        }
    );
    return token;
}