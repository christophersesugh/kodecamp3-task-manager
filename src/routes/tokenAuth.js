import express from 'express';
import { login, me, register } from '../controllers/tokenAuth.js';
import { tokenAuth } from '../middleware/tokenAuth.js';
import {
  loginAuthValidationRegister,
  registerAuthValidationRegister,
  validateAuth,
} from '../middleware/authValidator.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', tokenAuth, me);

export default router;
