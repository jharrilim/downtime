import { ObjectType, Field, ID } from "type-graphql";
import { User } from "./user";
import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from "typeorm";
import { Lazy } from ".";

@Entity()
@ObjectType()
export class Post {
    @Field(type => ID)
    @PrimaryGeneratedColumn({ name: 'postId' })
    readonly id!: number;

    @Field()
    @Column()
    content!: string;

    @Field(type => User)
    @ManyToOne(type => User, { lazy: true })
    author!: Lazy<User>;
}
