import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import endpointsConfig from '../endpoints.config';
import User from '../models/user';

export const signin = async (req: any, res: any) => {
	const { email, password } = req.body;
	try {
		const existingUser = await User.findOne({ email });
		if (!existingUser) {
			return res.status(404).json({ message: 'Something went wrong! Code 3' });
		}
		const isPasswordCorrect = await bcrypt.compare(
			password,
			existingUser.password
		);
		if (!isPasswordCorrect) {
			return res.status(400).json({ message: 'Something went wrong. Code 2' });
		}
		const token = jwt.sign(
			{ email: existingUser.email, id: existingUser._id },
			endpointsConfig.secret,
			{ expiresIn: '1h' }
		);
		return res.status(200).json({ result: existingUser, token });
	} catch (error) {
		res.status(400).json({ message: 'Something went wrong. Code 1', error });
	}
};

export const signup = async (req: any, res: any) => {
	const { email, password, firstName, lastName, confirmPassword } = req.body;
	try {
		const existingUser = await User.findOne({ email });
		if (existingUser) {
			return res.status(400).json({ message: 'User already exist' });
		}
		if (password !== confirmPassword) {
			return res.status(400).json({ message: 'Password dont match' });
		}

		const hashedPassword = await bcrypt.hash(password, 12);
		const result = await User.create({
			email,
			password: hashedPassword,
			name: `${firstName} ${lastName}`
		});
		const token = jwt.sign(
			{ email: result.email, id: result._id },
			endpointsConfig.secret,
			{
				expiresIn: '1h'
			}
		);
		return res.status(200).json({ result, token });
	} catch (error) {
		res.status(400).json({ message: 'Something went wrong' });
		console.log(error);
	}
};
