import {
    Column, 
    Entity, 
    PrimaryGeneratedColumn,
    CreateDateColumn,
    OneToMany
} from "typeorm";
import { Board } from "./board";

@Entity({ name: "users"})
export class User {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    email!: string;

    @Column()
    name!: string;

    @Column()
    password!: string;

    @OneToMany(
        (type) => Board, 
        (board) => board.writer,
        )
    board!: Board[];

    @CreateDateColumn({ name: 'created_at' })
    createdAt!: Date;
}