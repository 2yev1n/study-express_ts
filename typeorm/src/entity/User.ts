import { 
    Entity, 
    PrimaryGeneratedColumn, 
    Column,
    CreateDateColumn,
    OneToMany
} from "typeorm"

@Entity({ name:  "users" })
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ unique: true })
    email: string

    @Column()
    name: string

    @Column()
    password: string;

    @CreateDateColumn({ name: 'createdAt'})
    createdAt: Date;
};
