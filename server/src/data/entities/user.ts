import { ObjectType, Field, ID, Authorized } from "type-graphql";
import { Post } from "./post";
import { PrimaryGeneratedColumn, Column, OneToMany, Entity, ManyToMany, JoinTable, CreateDateColumn } from "typeorm";
import { Lazy } from ".";
import { Role } from "./role";
import { Roles } from "../roles";
import { Category } from "./category";
import { Topic } from "./topic";

@Entity()
@ObjectType()
export class User {
    @Field(type => ID)
    @PrimaryGeneratedColumn()
    readonly id!: number;

    @Field(type => String)
    @Column()
    readonly username!: string;

    @Field(type => Date)
    @CreateDateColumn()
    readonly dateJoined!: Date;

    @Field(type => String)
    @Column({ unique: true })
    email!: string;

    @Authorized([Roles.Admin])
    @Column()
    passwordHash!: string;

    @Authorized([Roles.Admin])
    @Column()
    salt!: string;

    @Field(type => [Role])
    @ManyToMany(type => Role, role => role.users, { eager: true })
    @JoinTable()
    roles!: Role[];

    @Field(type => [Post])
    @OneToMany(type => Post, post => post.author, { lazy: true })
    posts!: Lazy<Post[]>;

    @Field(type => [Category], { nullable: 'items' })
    @OneToMany(type => Category, category => category.creator, { lazy: true, nullable: true })
    createdCategories!: Lazy<Category[]>;

    @Field(type => [Topic], { nullable: 'items' })
    @OneToMany(type => Topic, topic => topic.creator, { lazy: true, nullable: true })
    createdTopics!: Lazy<Topic[]>;

    @Field(type => [Topic], { nullable: 'items' })
    @ManyToMany(type => Topic, topic => topic.admins, { lazy: true, nullable: true })
    adminTopics!: Lazy<Topic[]>;
}
