import { Router } from 'express';
const router = Router();

router.post('/', async (req, res) => {
	console.log('Add Recipe');
	res.json('Add Recipes');
});

router.get('/', async (req, res) => {
	console.log('Get Recipes');
	res.json('Get Recipes');
});

router.get('/:id', async (req, res) => {
	console.log('Get Recipe by id');
	const id = req.params.id;
	res.json('Get recipe ' + id);
});

router.patch('/update/:id', async (req, res) => {
	console.log('update Recipe');
});

router.delete('/delete/:id', async (req, res) => {
	console.log('Delete Recipe');
});

export default router;
