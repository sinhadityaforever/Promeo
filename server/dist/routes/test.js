"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.get('/', (req, res) => {
    res.status(200).json({ message: 'Test Success' });
});
router.post('/', (req, res) => {
    const { email, password } = req.body;
    try {
        res.status(400).json({ email, password });
    }
    catch (error) {
        res.json(400).json({ message: 'something went wrong' });
    }
});
exports.default = router;
