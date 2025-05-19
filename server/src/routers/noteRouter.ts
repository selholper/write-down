import { Router } from 'express';
import * as note from 'controllers/noteController';
import auth from 'middlewares/authMiddleware';

const router = Router();
router.get('/get', auth, note.get);
router.post('/create', auth, note.create);
router.post('/change', auth, note.change);
router.delete('/delete', auth, note.destroy);

export default router;