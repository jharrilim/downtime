import { Service, Inject } from "typedi";
import { Resolver, Query, Arg, Int, Mutation, Authorized, Ctx } from "type-graphql";
import { User } from "../entities/user";
import { InjectRepository } from "typeorm-typedi-extensions";
import { Repository } from "typeorm";
import { UserInput } from "./types/user-input";
import { encryptPassword } from "../../security";
import { Roles } from "../roles";
import { Context } from "./types/context";
import { LoggerFactory } from "../../logging";
import { Logger } from "winston";

@Service()
@Resolver(of => User)
export class UserResolver {
    private _logger: Logger;
    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>,
        @Inject(type => LoggerFactory) readonly loggerFactory: LoggerFactory
    ) {
        this._logger = loggerFactory.get();
        this._logger.debug('Logger injected in UserResolver');
     }

    @Authorized([Roles.General])
    @Query(returns => User)
    async self(@Ctx() { user }: Context): Promise<User> {
        if (!user) {
            throw Error('User must be logged in');
        }
        return (await this.userRepository.findOne({
            where: {
                id: user.id
            }
        }))!;
    }

    @Authorized([Roles.Admin])
    @Query(returns => User, { nullable: true })
    async user(@Arg('userId', type => Int) userId: number): Promise<User> {
        return (await this.userRepository.findOne(userId))!;
    }

    @Authorized([Roles.Admin])
    @Query(returns => [User])
    async users(): Promise<User[]> {
        this._logger.debug('Users called');
        return await this.userRepository.find();
    }

    @Mutation(returns => User)
    async createUser(@Arg('userInput') { email, password, username }: UserInput): Promise<User> {
        const { salt, passwordHash } = encryptPassword(password);
        const user = await this.userRepository.create({
            email,
            passwordHash,
            salt,
            username: username || email
        });
        return await this.userRepository.save(user);
    }
}
