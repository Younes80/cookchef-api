import express from 'express';
import { login, logout, register } from '../controllers/auth.controller';
import {
	deleteUser,
	getUser,
	getUsers,
	updateUser,
	updateUserImage,
} from '../controllers/users.controller';
import uploadProfile from '../middleware/uploadProfile';

const router = express.Router();

// Auth
router.post('/register', register);
router.post('/login', login);
router.get('/logout', logout);

// User
router.get('/', getUsers);
router.get('/:id', getUser);
router.patch('/:id', updateUser);
router.delete('/:id', deleteUser);

// Upload image profile
router.patch('/image/:id', uploadProfile, updateUserImage);

export default router;
