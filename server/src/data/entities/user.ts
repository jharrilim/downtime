import { ObjectType, Field, ID, } from "type-graphql";
import { Post } from "./post";
import { PrimaryGeneratedColumn, Column, OneToMany, Entity } from "typeorm";

@Entity()
@ObjectType()
export class User {
    @Field(type => ID)
    @PrimaryGeneratedColumn()
    readonly id!: number;

    @Field()
    @Column()
    username!: string;

    @Field()
    @Column()
    email!: string;

    @Field(type => [Post], { nullable: true })
    @OneToMany(type => Post, post => post.author, { nullable: true })
    posts?: Post[]
}
