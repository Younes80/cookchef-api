import usersModel from '../models/users.model';

export const addFavorisByUser = async (req, res) => {
	const favoris = req.body.favoris;

	const options = { new: true };
	const userId = req.params.id;

	try {
		const user = await usersModel.findById(userId);
		const currentUser = await user.updateOne(
			{
				favoris: [...user.favoris, favoris],
			},
			options
		);

		if (!currentUser) res.status(404).json({ message: 'Utilisateur invalide' });
		return res.status(200).json({ message: 'Utilisateur modifié' });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

export const removeFavorisByUser = async (req, res) => {
	const favoris = req.body;
	const options = { new: true };
	const userId = req.params.id;
	try {
		const user = await usersModel
			.findByIdAndUpdate(userId, { $pull: favoris }, options)
			.clone();
		if (!user) res.status(404).json({ message: 'Utilisateur invalide' });
		return res.status(200).json(user);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};
