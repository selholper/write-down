import jwt from 'jsonwebtoken';
import { User } from 'db/models';

export const newAccessToken = (user: User): string => {
    return jwt.sign(
        { id: user.id, name: user.name, email: user.email },
        process.env.ACCESS_KEY!,
        { expiresIn: '5m' }
    );
};

export const newRefreshToken = (user: User): string => {
    return jwt.sign(
        { id: user.id },
        process.env.REFRESH_KEY!,
        { expiresIn: '30d' }
    );
};