import { Post } from 'src/posts/entities/post.entity';
import { BeforeInsert, Column, OneToMany } from 'typeorm';
import { PrimaryGeneratedColumn } from 'typeorm';
import { Entity } from 'typeorm';
import * as crypto from 'crypto';
import { Exclude } from 'class-transformer';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true})
    username: string;

    @Column()
    @Exclude()
    password: string;

    // @BeforeInsert()
    // encodePassword() {
    //     this.password = crypto.createHmac('sha256', this.password).digest('hex');
    // }

    @Column()
    name: string;

    @Column({ default: true })
    isActive: boolean;

    @OneToMany(() => Post, (post) => post.user, {
        onDelete: 'CASCADE',
        lazy: true
    })
    posts: Promise<Post[]>;

    // @Column({insert: false, select:false, update: false, nullable: true})
    postCount?: number;
}