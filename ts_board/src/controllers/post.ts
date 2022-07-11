import { Post } from "../models/post";
import { Request, Response, NextFunction } from "express";

export const wirtePost = async (req: Request, res: Response, next: NextFunction) => {

    const { title, content } = req.body;
    const image = req.file;
    const writer = (<any>req).decoded.id;

    console.log(title, content, writer, image);

    try {
        
        const newPost = Post.create({
            title,
            content,
            writer,
            image: (<any>image)?.location
        });

        res.status(200).json({
            message: "글 작성 성공"
        }); 

    } catch(err) {
        console.error(err);
        res.status(400).json({
            message: "글 작성 실패",
        });
    }
};

export const readPost = async (req: Request, res: Response, next: NextFunction) => {

    const id = req.params.id;

    try{
        const post = await Post.findOne({
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
            message: "해당 게시글 찾을 수 없음",
        });
    }
};

export const readAllPost = async(req: Request, res: Response) => {
    try{
        const posts = await Post.findAll();

        if(posts == null) {
            throw Error;
        };

        res.status(200).json({
            message: "게시물 조회 성공",
            posts
        });

    } catch(err) {
        console.error(err);
        res.status(404).json({
            message: "게시물 찾을 수 없음"
        })
    }
}

export const readMyPost = async (req: Request, res: Response, next: NextFunction) => {

    const writer = (<any>req).decoded.id;
    console.log(writer);
    try{
        const posts = await Post.findAll({
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
            message: "나의 게시글 찾을 수 없음",
        });
    }
};

export const updatePost = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const { title, content } = req.body;
    const writer = (<any>req).decoded.id;
    
    try{
        
        const post = await Post.findOne({
            where: {
                id: id,
                writer: writer
            }
        });

        if(post == null){
            throw Error;
        } else {
            await post.update({
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

export const deletePost = async(req: Request, res: Response, next: NextFunction) => {

    const id = req.params.id;
    const writer = (<any>req).decoded.id;

    try{
        const post = await Post.findOne({
            where: {
                id: id,
                writer: writer,
            }
        });

        if(post == null) {
            throw Error;
        } else {
            await post.destroy();
            
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
};