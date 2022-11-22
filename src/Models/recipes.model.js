import mongoose from 'mongoose';

const DataSchema = mongoose.Schema(
	{
		title: {
			required: true,
			type: String,
		},
		image: {
			required: true,
			type: String,
		},
		liked: {
			type: Boolean,
		},
		author: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'user',
			},
		],
	},
	{ timestamps: true }
);

export default mongoose.model('recipe', DataSchema, 'recipes');
