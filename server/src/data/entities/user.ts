import { ObjectType, Field, ID, } from "type-graphql";
import { Post } from "./post";
import { PrimaryGeneratedColumn, Column, OneToMany, Entity } from "typeorm";
import { Lazy } from ".";

@Entity()
@ObjectType()
export class User {
    @Field(type => ID)
    @PrimaryGeneratedColumn()
    readonly id!: number;

    @Field(type => String)
    @Column()
    username!: string;

    @Field(type => String)
    @Column()
    email!: string;

    @OneToMany(type => Post, post => post.author, { lazy: true })
    @Field(type => [Post])
    posts!: Lazy<Post[]>;
}
