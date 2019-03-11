import { Service } from "typedi";
import { Resolver, Query, Arg, Int, Mutation } from "type-graphql";
import { User } from "../entities/user";
import { InjectRepository } from "typeorm-typedi-extensions";
import { Repository } from "typeorm";
import { UserInput } from "./types/user-input";

@Service()
@Resolver(User)
export class UserResolver {

    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>
    ) { }

    @Query(returns => User, { nullable: true })
    async user(@Arg('userId', type => Int) userId: number): Promise<User | undefined> {
        return await this.userRepository.findOne(userId);
    }

    @Query(returns => [User])
    async users(): Promise<User[]> {
        return await this.userRepository.find();
    }

    @Mutation(returns => User)
    async createUser(@Arg('userInput') userInput: UserInput): Promise<User> {
        return await this.userRepository.save({
            email: userInput.email,
            username: userInput.username || userInput.email
        });
    }
}
