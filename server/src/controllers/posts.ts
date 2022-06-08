import mongoose from 'mongoose';
import PostMessage from '../models/postMessage';
export const getPosts = async (req: any, res: any) => {
	try {
		const postMessages = await PostMessage.find();
		res.status(200).json(postMessages);
	} catch (error: any) {
		res.status(400).json({
			message: error.message
		});
	}
};

export const createPost = async (req: any, res: any) => {
	const post = req.body;
	const newPost = new PostMessage(post);
	try {
		await newPost.save();
		res.status(201).json(newPost);
	} catch (error: any) {
		res.status(409).json({
			message: error.message
		});
	}
};

export const updatePost = async (req: any, res: any) => {
	const { id: _id } = req.params;
	const post = req.body;
	if (mongoose.Types.ObjectId.isValid(_id)) {
		return res.status(404).send('No post with that id');
	}
	const updatedPost = await PostMessage.findByIdAndUpdate(_id, post, {
		new: true
	});
	res.json(updatedPost);
};
