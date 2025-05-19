import { Request as Req, Response as Res, NextFunction as Next } from 'express';
import bcrypt from 'bcrypt';
import { User } from 'db/models';
import { withTokens, withAccessToken } from 'utils/response';

export const signUp = async (req: Req, res: Res, next: Next): Promise<Res | void> => {
    try {
        const { name, email, password } = req.body;
        if (!password)
            return res.status(400).send('User password cannot be empty.');
        const passwordHash = await bcrypt.hash(password, 5);
        const user = await User.create({ name, email, password: passwordHash });
        return (await withTokens(res, user)).json({ name: user.name, message: 'Successfully singed up.' });
    }
    catch (err) {
        if (err.errors)
            return res.status(400).send(err.errors[0].message);
        else
            return next(err);
    }
};

export const signIn = async (req: Req, res: Res): Promise<Res> => {
    const { name, email, password } = req.body;
    if (!password)
        return res.status(400).send('User password cannot be empty.');

    const user = 
        name ? await User.findOne({ where: { name }}) :
            email ? await User.findOne({ where: { email }}) :
                undefined;
    if (!user)
        return res.status(400).send('Wrong username/email specified.');
    if (!bcrypt.compareSync(password, user.password))
        return res.status(400).send('Wrong password specified.');
    
    return (await withTokens(res, user)).json({ name: user.name, message: 'Successfully signed in.' });
};

export const signOut = async (req: Req, res: Res): Promise<Res> => {
    return res.clearCookie('access_token').clearCookie('refresh_token').send('Successfully signed out.');
};

export const updateAccessToken = async (req: Req, res: Res): Promise<Res> => {
    return withAccessToken(res, req.user!).json({ name: req.user!.name, message: 'Successfully authorized.' });
};