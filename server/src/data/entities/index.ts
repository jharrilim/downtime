import { Post } from './post';
import { User } from './user';
import { Role } from './role';
import { Category } from './category';
import { Topic } from './topic';

export type Lazy<T extends object> = Promise<T> | T;

const entities = [
    Post,
    User,
    Role,
    Category,
    Topic
];

export default entities;
