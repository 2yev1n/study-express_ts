import { Post } from "../entities/post";
import { Request, Response, NextFunction } from "express";
import { getManager } from "typeorm";

export async function wirtePost(req: Request, res: Response, next: NextFunction) {
    const postRepository = getManager().getRepository(Post);

    const { title, content } = req.body;
    const writer = (<any>req)["decoded"].id;

    try {
        const newPost = postRepository.create({
            title,
            content,
            writer,
        });

        await postRepository.save(newPost);

        res.status(200).json({
            message: "글 작성 성공",
            newPost
        }); 

    } catch(err) {
        console.error(err);
        res.status(400).json({
            message: "글 작성 실패",
        })
    }

}