import { Resolver, ObjectType, Field, Query, ID, Mutation } from "type-graphql";
import { Post } from "./post";


@ObjectType()
export class User {
    @Field(type => ID)
    id!: string;

    @Field()
    username!: string;

    @Field()
    email!: string;

    @Field(type => [Post])
    posts!: Post[]
}

@Resolver()
export class UserResolver {
    private userCount = 0;
    private data: User[] = [{ id: '1', username: 'hello', email: 'hello@mail.com', posts: [] }];
    
    @Query(returns => [User])
    users(): User[] {
        return this.data;
    }

    @Mutation(returns => User)
    createUser(email: string, username?: string) {
        const user = {
            id: `${this.userCount++}`,
            email,
            username: username || email,
            posts: []
        } as User;
        this.data.push(user);
        return user;
    }
}
