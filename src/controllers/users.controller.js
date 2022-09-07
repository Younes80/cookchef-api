import usersModel from '../models/users.model';
import bcrypt from 'bcryptjs';
import recipesModel from '../models/recipes.model';

export const getUsers = async (req, res) => {
	try {
		const users = await usersModel.find();
		res.status(200).json(users);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

export const getUser = async (req, res) => {
	const userId = req.params.id;
	try {
		await usersModel
			.findById(userId)
			.populate('favoris')
			.exec((err, user) => {
				res.status(200).json(user);
			});
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

export const updateUser = async (req, res) => {
	const { firstname, lastname, email, password } = req.body;
	const options = { new: true };
	const userId = req.params.id;

	try {
		const user = await usersModel.findById(userId);
		const hashedPassword = await bcrypt.hash(password, 10);

		const currentUser = await user.updateOne(
			{
				firstname: firstname,
				lastname: lastname,
				email: email,
				password: hashedPassword,
			},
			options
		);

		if (!currentUser) res.status(404).json({ message: 'Utilisateur invalide' });
		return res.status(200).json({ message: 'Utilisateur modifié' });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

export const deleteUser = async (req, res) => {
	const userId = req.params.id;
	try {
		const user = await usersModel.findByIdAndDelete(userId);
		if (!user) res.status(404).json({ message: 'Utilisateur invalide' });
		return res.status(200).json({ message: 'Utilisateur supprimé' });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};
