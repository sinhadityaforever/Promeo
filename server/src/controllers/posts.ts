import mongoose from 'mongoose';
import PostMessage from '../models/postMessage';
export const getPosts = async (req: any, res: any) => {
	const { page } = req.query;

	try {
		const LIMIT = 8;
		const startIndex = (Number(page) - 1) * LIMIT;
		const total = await PostMessage.countDocuments({});
		const posts = await PostMessage.find()
			.sort({ _id: -1 })
			.limit(LIMIT)
			.skip(startIndex);
		res
			.status(200)
			.json({
				data: posts,
				currentPage: Number(page),
				numberOfPages: Math.ceil(total / LIMIT)
			});
	} catch (error: any) {
		res.status(400).json({
			message: error.message
		});
	}
};

export const getPostsBySearch = async (req: any, res: any) => {
	const { searchQuery, tags } = req.query;
	try {
		const title = new RegExp(searchQuery, 'i');
		const posts = await PostMessage.find({
			$or: [{ title }, { tags: { $in: tags.split(',') } }]
		});
		res.json({ data: posts });
	} catch (error) {
		console.log(error);
		res.status(404).json({ message: error });
	}
};

export const createPost = async (req: any, res: any) => {
	const post = req.body;
	const newPost = new PostMessage({
		...post,
		creator: req.userId
	});
	try {
		await newPost.save();
		res.status(201).json(newPost);
	} catch (error: any) {
		console.log(error);

		res.status(409).json({
			message: error.message
		});
	}
};

export const updatePost = async (req: any, res: any) => {
	const { id: _id } = req.params;

	const post = req.body;
	try {
		const updatedPost = await PostMessage.findByIdAndUpdate(_id, post, {
			new: true
		});
		return res.json(updatedPost);
	} catch (error) {
		console.log(error);

		return res.status(404).send('No post with that id');
	}
};

export const deletePost = async (req: any, res: any) => {
	const { id } = req.params;
	try {
		await PostMessage.findByIdAndRemove(id);
		return res.json({ message: 'Post Deleted successfully' });
	} catch (error) {
		console.log(error);
		return res.status(404).send('No post with that id');
	}
};

export const likePost = async (req: any, res: any) => {
	const { id } = req.params;
	if (!req.userId) {
		return res.json({ message: 'Unauthenticated' });
	}
	try {
		const post = await PostMessage.findById(id);
		const index = post.likes.findIndex(
			(id: string) => id === String(req.userId)
		);
		if (index === -1) {
			//like
			post.likes.push(req.userId);
		} else {
			//dislike
			post.likes = post.likes.filter((id: string) => id !== String(req.userId));
		}
		const updatedPost = await PostMessage.findByIdAndUpdate(id, post, {
			new: true
		});
		res.json(updatedPost);
	} catch (error) {
		console.log(error);
		res.status(400).json({ message: 'Failed' });
	}
};
