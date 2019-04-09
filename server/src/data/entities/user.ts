import { ObjectType, Field, ID } from "type-graphql";
import { Post } from "./post";
import { PrimaryGeneratedColumn, Column, OneToMany, Entity, ManyToMany, JoinTable } from "typeorm";
import { Lazy } from ".";
import { Role } from "./role";

@Entity()
@ObjectType()
export class User {
    @Field(type => ID)
    @PrimaryGeneratedColumn()
    readonly id!: number;

    @Field(type => String)
    @Column()
    readonly username!: string;

    @Field(type => String)
    @Column()
    email!: string;

    @Column()
    passwordHash!: string;

    @Column()
    salt!: string;

    @Field(type => [Post])
    @OneToMany(type => Post, post => post.author, { lazy: true })
    posts!: Lazy<Post[]>;

    @Field(type => [Role])
    @ManyToMany(type => Role, role => role.users)
    @JoinTable()
    roles!: Role[];
}
