import { Resolver, ObjectType, Field, Query, Mutation, ID, Arg } from "type-graphql";
import { User } from "./user";


@ObjectType()
export class Post {
    @Field(type => ID)
    id!: string;

    @Field()
    content!: string;

    @Field(type => [String])
    comments!: string[];

    user!: User;
}

@Resolver()
export class PostResolver {
    private postCount = 0;
    private data: Post[] = [];

    @Query(returns => [Post])
    async posts(): Promise<Post[]> {
        return await this.data;
    }

    @Mutation(returns => Post)
    createPost( user: User, @Arg('content') content: string): Post {
        const post = {
            id: `${this.postCount++}`,
            content: content,
            comments: [],
            user
        } as Post;
        this.data.push(post);
        return post;
    }
}
