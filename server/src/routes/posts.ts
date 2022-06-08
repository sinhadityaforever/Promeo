import express from 'express';
import { createPost, getPosts, updatePost } from '../controllers/posts';
const router = express.Router();

router.get('/', getPosts);
router.post('/', createPost);
router.patch('/:id', updatePost);
export default router;
