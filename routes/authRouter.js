import { Router } from 'express';

import { registerUser, loginUser } from '../controllers/auth.js';
import { deleteUser } from '../controllers/users.js';
import verifyUser from '../middleware/authentication.js';

const router = Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.delete('/', verifyUser, deleteUser);

export default router;
