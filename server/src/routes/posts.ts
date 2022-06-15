import express from 'express';
import {
	createPost,
	getPosts,
	updatePost,
	deletePost,
	likePost
} from '../controllers/posts';
const router = express.Router();
import auth from '../middlewares/auth';

router.get('/', getPosts);
router.post('/', auth, createPost);
router.patch('/:id', auth, updatePost);
router.delete('/:id', auth, deletePost);
router.patch('/:id/likePost', auth, likePost);
export default router;
