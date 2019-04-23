import { Mutation, Arg, Resolver } from "type-graphql";
import { LoginWithPasswordInput } from "./types/login-with-password-input";
import { encryptPassword, tokenifyUser } from "../../security";
import { InjectRepository } from "typeorm-typedi-extensions";
import { User } from "../entities/user";
import { Repository } from "typeorm";
import { Service } from "typedi";

@Service()
@Resolver()
export class AuthResolver {
    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>
    ) { }

    @Mutation(returns => String)
    async loginWithPassword(
        @Arg('loginWithPasswordInput')
        { usernameOrEmail, password }: LoginWithPasswordInput
    ): Promise<String> {
        const user = await this.userRepository.findOne({
            where: [
                { username: usernameOrEmail },
                { email: usernameOrEmail }
            ],
            select: ['id', 'email', 'passwordHash', 'username', 'salt', 'roles'],
            // todo: don't select circular objects
        });

        if (!user)
            throw new Error('User not found: ' + usernameOrEmail);

        const { passwordHash } = encryptPassword(password, user.salt);
        if(passwordHash === user.passwordHash) {
            const token = await tokenifyUser(user);
            return token;
        }

        throw new Error('Invalid Credentials for user: ' + usernameOrEmail);
    }
}
