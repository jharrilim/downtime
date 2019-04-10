import { InputType, Field } from "type-graphql";

@InputType()
export class LoginWithPasswordInput {
    @Field()
    usernameOrEmail!: string;
    @Field()
    password!: string;
}