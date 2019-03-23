import { InputType, Field } from "type-graphql";
import { User } from "../../entities/user";

@InputType()
export class UserInput implements Partial<User> {
    @Field()
    email!: string;

    @Field(type => String, { nullable: true })
    username?: string;

    @Field(type => String)
    password!: string;
}
