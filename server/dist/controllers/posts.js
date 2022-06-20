"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.likePost = exports.deletePost = exports.updatePost = exports.createPost = exports.getPostsBySearch = exports.getPost = exports.getPosts = void 0;
const postMessage_1 = __importDefault(require("../models/postMessage"));
const getPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { page } = req.query;
    try {
        const LIMIT = 8;
        const startIndex = (Number(page) - 1) * LIMIT;
        const total = yield postMessage_1.default.countDocuments({});
        const posts = yield postMessage_1.default.find()
            .sort({ _id: -1 })
            .limit(LIMIT)
            .skip(startIndex);
        res.status(200).json({
            data: posts,
            currentPage: Number(page),
            numberOfPages: Math.ceil(total / LIMIT)
        });
    }
    catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
});
exports.getPosts = getPosts;
const getPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('endpoint hit');
    const { id } = req.params;
    try {
        const post = yield postMessage_1.default.findById(id);
        res.status(200).json(post);
    }
    catch (error) {
        console.log(error);
        res.status(404).json({ message: 'Problem loading post' });
    }
});
exports.getPost = getPost;
const getPostsBySearch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('endPoint hit');
    const { searchQuery, tags } = req.query;
    console.log(`searchQuery: ${searchQuery} and tags: ${tags}`);
    try {
        const title = new RegExp(searchQuery, 'i');
        const posts = yield postMessage_1.default.find({
            $or: [{ title }, { tags: { $in: tags.split(',') } }]
        });
        res.json({ data: posts });
    }
    catch (error) {
        console.log('error hit');
        console.log(error);
        res.status(404).json({ message: error });
    }
});
exports.getPostsBySearch = getPostsBySearch;
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const post = req.body;
    const newPost = new postMessage_1.default(Object.assign(Object.assign({}, post), { creator: req.userId }));
    try {
        yield newPost.save();
        res.status(201).json(newPost);
    }
    catch (error) {
        console.log(error);
        res.status(409).json({
            message: error.message
        });
    }
});
exports.createPost = createPost;
const updatePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id: _id } = req.params;
    const post = req.body;
    try {
        const updatedPost = yield postMessage_1.default.findByIdAndUpdate(_id, post, {
            new: true
        });
        return res.json(updatedPost);
    }
    catch (error) {
        console.log(error);
        return res.status(404).send('No post with that id');
    }
});
exports.updatePost = updatePost;
const deletePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        yield postMessage_1.default.findByIdAndRemove(id);
        return res.json({ message: 'Post Deleted successfully' });
    }
    catch (error) {
        console.log(error);
        return res.status(404).send('No post with that id');
    }
});
exports.deletePost = deletePost;
const likePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!req.userId) {
        return res.json({ message: 'Unauthenticated' });
    }
    try {
        const post = yield postMessage_1.default.findById(id);
        const index = post.likes.findIndex((id) => id === String(req.userId));
        if (index === -1) {
            //like
            post.likes.push(req.userId);
        }
        else {
            //dislike
            post.likes = post.likes.filter((id) => id !== String(req.userId));
        }
        const updatedPost = yield postMessage_1.default.findByIdAndUpdate(id, post, {
            new: true
        });
        res.json(updatedPost);
    }
    catch (error) {
        console.log(error);
        res.status(400).json({ message: 'Failed' });
    }
});
exports.likePost = likePost;
