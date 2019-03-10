import { Post } from './post';
import { User } from './user';

export type Lazy<T extends object> = Promise<T> | T;

const models = [
    Post,
    User
];

export default models;
