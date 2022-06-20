"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const posts_1 = require("../controllers/posts");
const router = express_1.default.Router();
const auth_1 = __importDefault(require("../middlewares/auth"));
router.get('/', posts_1.getPosts);
router.get('/single/:id', posts_1.getPost);
router.get('/search', posts_1.getPostsBySearch);
router.post('/', auth_1.default, posts_1.createPost);
router.patch('/:id', auth_1.default, posts_1.updatePost);
router.delete('/:id', auth_1.default, posts_1.deletePost);
router.patch('/:id/likePost', auth_1.default, posts_1.likePost);
exports.default = router;
