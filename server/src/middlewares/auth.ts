import jwt from 'jsonwebtoken';
import endpointsConfig from '../endpoints.config';
const auth = async (req: any, res: any, next: any) => {
	try {
		const token = req.headers.Authorization.split(' ')[1];
		const isCustomAuth = token.length < 500;
		let decodedData;
		if (token && isCustomAuth) {
			decodedData = jwt.verify(token, endpointsConfig.secret);
			//@ts-ignore
			req.userId = decodedData?.id;
		} else {
			decodedData = jwt.decode(token);
			req.userId = decodedData?.sub;
		}
		next();
	} catch (error) {
		console.log(error);
	}
};

export default auth;
