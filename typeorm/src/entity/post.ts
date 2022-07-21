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

@Entity({ name: 'posts' })
export class Post{
    @PrimaryGeneratedColumn()
    id!: string;

    @Column({ nullable: false })
    title!: string;

    @Column({ type: 'text', nullable: false })
    content!: string;

    @Column({ nullable: true })
    image!: string;

    @ManyToOne(
        () => User,
        (user) => user.post,
        { nullable: false }
    )
    @JoinColumn({ name: 'writer' })
    writer!: string;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updateAt!: Date;
};