import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, CreateDateColumn } from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";
import { User } from "./user";
import { Lazy } from ".";
import { Topic } from "./topic";

@Entity()
@ObjectType()
export class Post {
    @Field(type => ID)
    @PrimaryGeneratedColumn()
    readonly id!: number;

    @Field(type => String)
    @Column()
    content!: string;

    @Field(type => String)
    @Column()
    title!: string;

    @Field(type => Date)
    @CreateDateColumn({ readonly: true , type: 'timestamptz'})
    readonly dateCreated!: Date;

    @Field()
    @ManyToOne(type => Topic, topic => topic.posts, { lazy: true })
    topic!: Topic;

    @Field(type => User)
    @ManyToOne(type => User, user => user.posts, { lazy: true })
    author!: Lazy<User>;
}
