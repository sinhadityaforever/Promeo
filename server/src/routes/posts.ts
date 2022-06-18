import express from 'express';
import {
	createPost,
	getPosts,
	updatePost,
	deletePost,
	likePost,
	getPostsBySearch
} from '../controllers/posts';
const router = express.Router();
import auth from '../middlewares/auth';

router.get('/', getPosts);
router.get('/search', getPostsBySearch);
router.post('/', auth, createPost);
router.patch('/:id', auth, updatePost);
router.delete('/:id', auth, deletePost);
router.patch('/:id/likePost', auth, likePost);
export default router;
