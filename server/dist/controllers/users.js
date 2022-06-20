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
exports.signup = exports.signin = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const endpoints_config_1 = __importDefault(require("../endpoints.config"));
const user_1 = __importDefault(require("../models/user"));
const signin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const existingUser = yield user_1.default.findOne({ email });
        if (!existingUser) {
            return res.status(404).json({ message: 'Something went wrong!' });
        }
        const isPasswordCorrect = yield bcryptjs_1.default.compare(password, existingUser.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: 'Something went wrong' });
        }
        const token = jsonwebtoken_1.default.sign({ email: existingUser.email, id: existingUser._id }, endpoints_config_1.default.secret, { expiresIn: '1h' });
        return res.status(200).json({ result: existingUser, token });
    }
    catch (error) {
        res.status(400).json({ message: 'Something went wrong' });
    }
});
exports.signin = signin;
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, firstName, lastName, confirmPassword } = req.body;
    try {
        const existingUser = yield user_1.default.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exist' });
        }
        if (password !== confirmPassword) {
            return res.status(400).json({ message: 'Password dont match' });
        }
        const hashedPassword = yield bcryptjs_1.default.hash(password, 12);
        const result = yield user_1.default.create({
            email,
            password: hashedPassword,
            name: `${firstName} ${lastName}`
        });
        const token = jsonwebtoken_1.default.sign({ email: result.email, id: result._id }, endpoints_config_1.default.secret, {
            expiresIn: '1h'
        });
        return res.status(200).json({ result, token });
    }
    catch (error) {
        res.status(400).json({ message: 'Something went wrong' });
        console.log(error);
    }
});
exports.signup = signup;
