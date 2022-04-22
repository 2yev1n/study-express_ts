import { text } from "stream/consumers";
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

@Entity({ name: "boards" })
export class Board{
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    title!: string;

    @Column({ type: "text" })
    content!: string;

    @ManyToOne(
        () => User,
        (user) => user.board,
        { nullable : false }
    )
    @JoinColumn({ name: "writer" })
    writer!: number;

    @CreateDateColumn({ name: 'created_at' })
    createdAt!: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt!: Date;
}