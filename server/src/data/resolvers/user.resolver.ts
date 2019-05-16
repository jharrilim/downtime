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
    async profile(@Ctx() { user }: Context): Promise<User> {
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
        return await this.userRepository.find();
    }

    @Mutation(returns => User)
    async createUser(@Arg('userInput') { email, password, username }: UserInput): Promise<User> {
        const { salt, passwordHash } = encryptPassword(password);
        try {
            const user = await this.userRepository.create({
                email,
                passwordHash,
                salt,
                username: username || email
            });
            return await this.userRepository.save(user);
        } catch (err) {
            if (err.detail && typeof err.detail === 'string') {
                const r = /^Key \((\w+)\)=\(((?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\]))\)/;
                const groups = r.exec(err.detail);
                if (groups) {
                    throw new Error(`Oops, that ${groups[1]}, '${groups[2]}', already exists.`);
                }
            }
            this._logger.error(err);
            throw new Error('Oops, it seems like there was an error on our side. Please try again.');
        }
    }
}
