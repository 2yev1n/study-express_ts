import { Post } from "../entities/post";
import { Request, Response, NextFunction } from "express";
import { getManager } from "typeorm";

export async function wirtePost(req: Request, res: Response, next: NextFunction) {
    const postRepository = getManager().getRepository(Post);

    const { title, content } = req.body;
    const writer = (<any>req).decoded.id;

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
        });
    }
};

export async function readPost(req: Request, res: Response, next: NextFunction) {
    const postRepository = getManager().getRepository(Post);

    const id = req.params.id;

    try{
        const post = await postRepository.findOne({
            where: {
                id : id
            }
        });

        res.status(200).json({
            post
        });

    } catch(err) {
        console.error(err);
        res.status(404).json({
            message: "해당 게시글 없음",
        });
    }
};

export async function readMyPost(req: Request, res: Response, next: NextFunction) {
    const postRepository = getManager().getRepository(Post);

    const writer = (<any>req).decoded.id;

    try{
        const posts = await postRepository.find({
            where: {
                writer : writer
            }
        });

        if(posts == null) {
            throw Error;
        };

        res.status(200).json({
            posts
        });

    } catch(err) {
        console.error(err);
        res.status(404).json({
            message: "게시글 찾을 수 없음",
        });
    }
};

export async function updatePost(req: Request, res: Response, next: NextFunction) {
    const postRepository = getManager().getRepository(Post);

    const id = req.params.id;
    const { title, content } = req.body;
    const writer = (<any>req).decoded.id;
    
    try{
        
        const post = await postRepository.findOne({
            where: {
                id: id,
                writer: writer
            }
        });

        if(post == null){
            throw Error;
        } else {
            await postRepository.update({
                id: id,
                writer: writer
            }, {
                title: title,
                content: content,
            });
    
            res.status(200).json({
                message: "게시글 수정 성공",
            });
        }
    } catch(err) {
        console.error(err);
        res.status(403).json({
            message: "게시글 수정 실패",
        });
    }
};

export async function deletePost(req: Request, res: Response, next: NextFunction) {
    const postRepository = getManager().getRepository(Post);

    const id = req.params.id;
    const writer = (<any>req).decoded.id;

    try{
        const post = await postRepository.findOne({
            where: {
                id: id,
                writer: writer,
            }
        });

        if(post == null) {
            throw Error;
        } else {
            await postRepository.delete({
                id: id
            });
            
            res.status(200).json({
                message: "게시글 삭제 성공",
            });
        }
    } catch(err) {
        console.error(err);
        res.status(403).json({
            message: "게시글 삭제 실패",
        });
    }
}