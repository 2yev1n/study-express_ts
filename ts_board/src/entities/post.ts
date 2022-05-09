import {
    Column, 
    Entity, 
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn
} from "typeorm";

import { User } from "./user";

@Entity({ name: "posts" })
export class Post{
    @PrimaryGeneratedColumn()
    id!: string;

    @Column()
    title!: string;

    @Column({ type: "text" })
    content!: string;

    @Column()
    image!: string;

    @ManyToOne(
        () => User,
        (user) => user.post,
        { nullable : false }
    )
    @JoinColumn({ name: "writer" })
    writer!: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt!: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt!: Date;
}