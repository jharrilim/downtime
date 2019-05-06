import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, CreateDateColumn } from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";
import { User } from "./user";
import { Lazy } from ".";

@Entity()
@ObjectType()
export class Category {
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
    @ManyToOne(type => User, user => user.id, { lazy: true })
    creator!: Lazy<User>;
}
