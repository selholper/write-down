import { Request as Req, Response as Res, NextFunction as Next } from 'express';
import jwt from 'jsonwebtoken';
import { User } from 'db/models';
import { withAccessToken, withRefreshToken } from 'utils/response';

const notAuthorized = (res: Res): Res => res.status(401).send('User not authorized.');

const auth = async (req: Req, res: Res, next: Next): Promise<Res | void> => {
    if (req.method == 'OPTIONS')
        return next();

    try {
        const token = req.cookies.access_token;
        if (!token)
            return notAuthorized(res);
        let user;
        try {
            user = jwt.verify(token, process.env.ACCESS_KEY!) as User;
        }
        catch (err) {
            const token = req.cookies.refresh_token;
            if (!token)
                return notAuthorized(res);
            const decoded = jwt.verify(token, process.env.REFRESH_KEY!) as User;
            user = await User.findByPk(decoded.id);
            if (user === null || token != user.refreshToken)
                return notAuthorized(res);
            await withRefreshToken(res, user);
        }
        withAccessToken(res, user);
        req.user = user;
        return next();
    }
    catch (err) {
        return notAuthorized(res);
    }
}

export default auth;