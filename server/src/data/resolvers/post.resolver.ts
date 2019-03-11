import { Resolver, Query, Mutation, Arg, Int, Ctx } from "type-graphql";
import { InjectRepository } from "typeorm-typedi-extensions";
import { Repository } from "typeorm";
import { Context } from "../resolvers/types/context";
import { PostInput } from "../resolvers/types/post-input";
import { Service } from "typedi";
import { Post } from "../entities/post";

@Service()
@Resolver(Post)
export class PostResolver {

    constructor(
        @InjectRepository(Post) private readonly postRepository: Repository<Post>
    ) { }

    @Query(returns => Post, { nullable: true })
    async post(@Arg('postId', type => Int) postId: number): Promise<Post | undefined> {
        return await this.postRepository.findOne(postId);
    }

    @Query(returns => [Post])
    async posts(): Promise<Post[]> {
        return await this.postRepository.find();
    }

    @Mutation(returns => Post)
    async createPost(@Ctx() { user }: Context, @Arg('postInput') { content }: PostInput): Promise<Post> {
        return await this.postRepository.save({
            content,
            author: user
        });
    }
}
