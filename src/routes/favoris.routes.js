import { Router } from 'express';
import {
	addFavorisByUser,
	removeFavorisByUser,
} from '../controllers/favoris.controller';

const router = Router();

router.post('/add/:id', addFavorisByUser);
router.post('/delete/:id', removeFavorisByUser);

export default router;
