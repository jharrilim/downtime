import { InputType, Field } from "type-graphql";

@InputType()
export class OrderInput {
    @Field()
    order!: string;
}