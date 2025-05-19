import { Response as Res } from 'express';
import { User } from 'db/models';
import { newAccessToken, newRefreshToken } from './token';

export class Cookie {
    constructor(
        public readonly name: string, 
        public readonly value: string
    ) { }
}

export const withCookie = (res: Res, cookie: Cookie): Res => {
    return res.cookie(cookie.name, cookie.value, {
        httpOnly: true, secure: process.env.NODE_ENV == 'production'
    });
};

export const withAccessToken = (res: Res, user: User): Res => {
    return withCookie(res, new Cookie('access_token', newAccessToken(user)));
};

export const withRefreshToken = async (res: Res, user: User): Promise<Res> => {
    const refreshToken = newRefreshToken(user);
    await user.update({refreshToken});
    return withCookie(res, new Cookie('refresh_token', refreshToken));
};

export const withTokens = async (res: Res, user: User): Promise<Res> => {
    return await withRefreshToken(withAccessToken(res, user), user);
};