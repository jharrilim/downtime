import { Service } from "typedi";
import { Resolver, Query, Arg, Int, Mutation } from "type-graphql";
import { Role } from "../entities/role";
import { InjectRepository } from "typeorm-typedi-extensions";
import { Repository } from "typeorm";
import { RoleInput } from "./types/role-input";

@Service()
@Resolver(of => Role)
export class RoleResolver {

    constructor(
        @InjectRepository(Role) private readonly RoleRepository: Repository<Role>
    ) { }

    @Query(returns => Role, { nullable: true })
    async role(@Arg('RoleId', type => Int) RoleId: number): Promise<Role> {
        return (await this.RoleRepository.findOne(RoleId))!;
    }

    @Query(returns => [Role])
    async Roles(): Promise<Role[]> {
        return await this.RoleRepository.find();
    }

    @Mutation(returns => Role)
    async createRole(@Arg('RoleInput') RoleInput: RoleInput): Promise<Role> {
        const Role = await this.RoleRepository.create({...RoleInput});
        return await this.RoleRepository.save(Role);
    }
}
