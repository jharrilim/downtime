import { ObjectType, Field, ID } from "type-graphql";
import { PrimaryGeneratedColumn, Column, Entity, ManyToMany } from "typeorm";
import { User } from './user';
import { Lazy } from ".";

@Entity()
@ObjectType()
export class Role {
    @Field(type => ID)
    @PrimaryGeneratedColumn()
    readonly id!: number;

    @Field(type => String)
    @Column()
    readonly name!: string;

    @Field(type => [User])
    @ManyToMany(type => User, user => user.roles, { lazy: true })
    readonly users!: Lazy<User[]>;
}
