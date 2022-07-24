import { Request, Response, NextFunction } from "express";
import { Post } from "../entity/post";
import { getManager } from "typeorm";

export async function createPost(req: Request, res: Response) {
    const postRepository =  getManager().getRepository(Post);

    const { title, content } = req.body;
    const writer = (<any>req).decoded.id;

    console.log(title, content, writer);

    try{
        const newPost = postRepository.create({
            title,
            content,
            writer,
        })
        await postRepository.save(newPost);

        res.status(200).json({
            message: "게시글 작성 성공",
            newPost
        });
    } catch(err) {
        console.error(err);

        res.status(400).json({
            message: "게시글 작성 실패"
        });
    }
};

export async function updatePost(req: Request, res: Response) {
    const postRepository = getManager().getRepository(Post);

    const { title, content } = req.body;
    const id = req.params.id;
    const writer = (<any>req).decoded.id;

    try{
        const post = postRepository.findOne({
            where: {
                id,
                writer
            }
        });

        if(post == null) {
            throw Error;
        } else {
            await postRepository.update({
                id,
                writer
            }, {
                title,
                content
            });

            res.status(200).json({
                message: "게시글 수정 성공",
            });
        }
    } catch(err) {
        console.error(err);

        res.status(403).json({
            message: "게시글 수정 실패"
        })
    }
};

export async function deletePost(req: Request, res: Response) {
    const postRepository = getManager().getRepository(Post);

    const id = req.params.id;
    const writer = (<any>req).decoded.id;

    try{
        const post = await postRepository.findOne({
            where: {
                id
            }
        });

        if(post.writer == writer) {
            postRepository.delete({
                id: id
            });

            res.status(200).json({
                message: "게시물 삭제 성공"
            });

        } else throw Error;
    } catch(err) {
        console.error(err);

        res.status(403).json({
            message: "게시물 삭제 실패"
        })
    }
};

export async function readOnePost(req: Request, res: Response) {
    const postRepository = getManager().getRepository(Post);

    const id = req.params.id;

    try{
        const post = postRepository.findOne({
            where: {
                id: id
            }
        });
        if(post == null) throw Error;

        res.status(200).json({
            post
        });
    } catch(err) {
        console.error(err);
        res.status(404).json({
            message: "해당 게시물 없음"
        });
    };
};