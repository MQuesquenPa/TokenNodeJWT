import { Router } from 'express';
import { getUsers, login } from '../controllers/authController';
import { authenticateToken } from '../middlewares/authMiddleware';

const router = Router();

router.post('/login', login);

router.get('/users', authenticateToken, getUsers)

export default router;
