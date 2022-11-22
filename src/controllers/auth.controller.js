import usersModel from '../models/users.model';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const maxAge = 3 * 24 * 60 * 60 * 1000;

const createToken = id => {
	return jwt.sign({ id }, 'JeSuisLaCleSecrete', { expiresIn: maxAge });
};

export const register = async (req, res) => {
	const { firstname, lastname, email, password } = req.body;
	try {
		const existingUser = await usersModel.findOne({
			email: email,
		});

		if (existingUser) throw new Error('Cet email est déjà utilisé');
		const hashedPassword = await bcrypt.hash(password, 10);
		const user = await usersModel.create({
			firstname: firstname,
			lastname: lastname,
			email: email,
			password: hashedPassword,
		});
		res.status(200).json({
			user: {
				firstname: user.firstname,
				lastname: user.lastname,
				email: user.email,
				createdAt: user.createdAt,
				updatedAt: user.updatedAt,
			},
		});
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

export const login = async (req, res) => {
	const { email, password } = req.body;
	try {
		const user = await usersModel.findOne({
			email: email,
		});
		if (!user) {
			return res.status(400).json({ message: "L'utilisateur n'existe pas" });
		}
		const isPasswordValid = await bcrypt.compare(password, user.password);
		if (isPasswordValid) {
			const token = createToken(user._id);
			res.cookie('jwt', token, { httpOnly: true, maxAge });
			res.status(200).json({
				_id: user._id,
				firstname: user.firstname,
				lastname: user.lastname,
				email: user.email,
				token: token,
			});
		} else {
			return res.status(400).json({ user: false });
		}
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

export const logout = (req, res) => {
	res.cookie('jwt', '', { maxAge: 1 });
	res.status(200).json({ token: 'Token expired' });
};
