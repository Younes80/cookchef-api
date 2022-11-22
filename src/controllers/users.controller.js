import usersModel from '../models/users.model';
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';

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
			.populate({
				path: 'favoris',
				populate: {
					path: 'author',
					select: ['firstname', 'lastname'],
				},
			})
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

export const updateUserImage = async (req, res, next) => {
	const id = req.params.id;

	if (!mongoose.Types.ObjectId.isValid(id))
		return res.status(404).json(`Pas d'utilisateur correspondant à l'id ${id}`);
	if (req.file) {
		const pathName = req.file.path.replace(/\\/g, '/');
		const options = { new: true };

		const user = await usersModel.findById(id);
		if (user.profilePicture !== undefined) {
			fs.unlink(user.profilePicture, err => {
				if (err) {
					console.error(err);
					return;
				}
			});
		}
		const updateUserImage = await usersModel.findByIdAndUpdate(
			id,
			{ profilePicture: pathName },
			options
		);
		return res.status(200).json(updateUserImage);
	}
};
