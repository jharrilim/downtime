import { randomBytes, createHmac } from "crypto";

export function encryptPassword(password: string) {
    const salt = randomBytes(16).toString('hex');
    const hash = createHmac('sha512', salt);
    hash.update(password);
    const passwordHash = hash.digest('hex');
    return { salt, passwordHash };
}
