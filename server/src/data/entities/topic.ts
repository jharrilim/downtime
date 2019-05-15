import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, CreateDateColumn, OneToMany, ManyToMany, JoinTable } from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";
import { User } from "./user";
import { Lazy } from ".";
import { Post } from "./post";
import { Category } from "./category";

@Entity()
@ObjectType()
export class Topic {
    @Field(type => ID)
    @PrimaryGeneratedColumn()
    readonly id!: number;

    @Field(type => String)
    @Column({ unique: true })
    name!: string;

    @Field(type => Date)
    @CreateDateColumn()
    readonly dateCreated!: Date;

    @Field(type => User)
    @ManyToOne(type => User, user => user.createdTopics, { lazy: true })
    creator!: Lazy<User>;

    @Field(type => Category)
    @ManyToOne(type => Category, { lazy: true })
    category!: Lazy<Category>;

    @Field(type => [Post])
    @OneToMany(type => Post, post => post.topic, { lazy: true })
    posts!: Lazy<Post>;

    @Field(type => [User], { nullable: 'items' })
    @ManyToMany(type => User, user => user.adminTopics, { lazy: true, nullable: true })
    @JoinTable()
    admins!: Lazy<User[]>;
}
