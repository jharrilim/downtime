import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, CreateDateColumn } from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";
import { User } from "./user";
import { Lazy } from ".";

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
    @CreateDateColumn()
    dateCreated!: Date;

    @Field(type => User)
    @ManyToOne(type => User, { lazy: true })
    author!: Lazy<User>;
}
