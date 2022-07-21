import { 
    Entity, 
    PrimaryGeneratedColumn, 
    Column,
    CreateDateColumn,
    OneToMany
} from "typeorm"
import { Post } from "./post";

@Entity({ name:  'users' })
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ unique: true })
    email: string

    @Column()
    name: string

    @Column()
    password: string;

    @OneToMany(
        (type) => Post,
        (post) => post.writer,
    )
    post!: Post[];

    @CreateDateColumn({ name: 'createdAt'})
    createdAt: Date;
};
