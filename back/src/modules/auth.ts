import {User} from '@prisma/client';
import jwt from 'jsonwebtoken'
import * as bcrypt from "bcrypt";

export const createJWT = (user: User) => {
    return jwt.sign({
        id: user.id, username: user.username
    }, process.env.JWT_SECRET as string)
}

export type AuthenticatedUser = Pick<User, 'id' | 'username'>

export const getUser = (token: string): AuthenticatedUser | null => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET as string) as AuthenticatedUser;
    } catch {
        return null
    }
}

export const comparePasswords = (password: string, hash: string): Promise<boolean> => {
    return bcrypt.compare(password, hash);
};

export const hashPassword = (password: string): Promise<string> => {
    return bcrypt.hash(password, 5);
};
