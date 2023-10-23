import { type } from 'os';
import { Post } from 'src/posts/entity/post.entity';
import { Column, OneToMany } from 'typeorm';
import { PrimaryGeneratedColumn } from 'typeorm';
import { Entity } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true})
    username: string;

    @Column({select: false})
    password: string;

    @Column()
    name: string;

    @Column({ default: true })
    isActive: boolean;

    @OneToMany(() => Post, (post) => post.user)
    posts: Post[];
}