import { InputType, Field } from "type-graphql";
import { Post } from "../../entities/post";

@InputType()
export class PostInput implements Partial<Post> {
    @Field()
    content!: string;
    @Field()
    title!: string;
}