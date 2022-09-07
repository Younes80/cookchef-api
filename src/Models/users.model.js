import mongoose from 'mongoose';

const UserSchema = mongoose.Schema(
	{
		firstname: {
			type: String,
			required: true,
		},
		lastname: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
		},
		password: {
			type: String,
			required: true,
		},
		favoris: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'recipe',
			},
		],
	},
	{ timestamps: true }
);

export default mongoose.model('user', UserSchema, 'users');
