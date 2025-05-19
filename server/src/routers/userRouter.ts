import { Router } from 'express';
import * as user from 'controllers/userController';
import auth from 'middlewares/authMiddleware';

const router = Router();
router.post('/sign-up', user.signUp);
router.post('/sign-in', user.signIn);
router.post('/sign-out', user.signOut);
router.post('/auth', auth, user.updateAccessToken);

export default router;