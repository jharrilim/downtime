import { Post } from './post';
import { User } from './user';
import { Role } from './role';

export type Lazy<T extends object> = Promise<T> | T;

const entities = [
    Post,
    User,
    Role
];

export default entities;
