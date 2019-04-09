import { InputType, Field } from "type-graphql";
import { Role } from "../../entities/role";

@InputType()
export class RoleInput implements Partial<Role> {
    @Field()
    name!: string;
}