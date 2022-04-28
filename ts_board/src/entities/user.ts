import {
    Column, 
    Entity, 
    PrimaryGeneratedColumn,
    CreateDateColumn,
    OneToMany
} from "typeorm";
import { Post } from "./post";

@Entity({ name: "users"})
export class User {
    @PrimaryGeneratedColumn()
    id!: string;

    @Column({ unique: true })
    email!: string;
    

    @Column()
    name!: string;

    @Column()
    password!: string;

    @OneToMany(
        (type) => Post, 
        (post) => post.writer,
        )
    post!: Post[];

    @CreateDateColumn({ name: 'created_at' })
    createdAt!: Date;
}