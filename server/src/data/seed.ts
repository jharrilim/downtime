import { createConnection, Connection, getRepository } from 'typeorm';
import entities from './entities';
import { User } from './entities/user';
import { encryptPassword } from '../security';
import { Role } from './entities/role';
import { Roles } from './roles';

export async function seed() {
    // Init Roles
    const roleRepository = getRepository(Role);
    const defaultRoles = roleRepository.create([{ name: Roles.General }, { name: Roles.Admin }]);
    await roleRepository.save(defaultRoles);

    // Init Default User
    const userRepository = getRepository(User);
    const { passwordHash, salt } = encryptPassword(process.env.DB_PASSWORD || 'foobar');
    const defaultUser = userRepository.create({
        email: process.env.DEFAULT_MAIL_ADDRESS || 'foo@mail.com',
        username: process.env.DB_USER || 'foo@mail.com',
        passwordHash,
        salt,
        roles: defaultRoles
    });
    await userRepository.save(defaultUser);
    return { defaultUser };
}
