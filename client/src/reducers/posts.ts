import { actionTypes } from '../constants/actionTypes';
export const posts = (posts = [], action: any) => {
	switch (action.type) {
		case actionTypes.FETCH_ALL:
			return action.payload;
		case actionTypes.CREATE:
			return [...posts, action.payload];

		case actionTypes.UPDATE:
		case actionTypes.LIKE:
			return posts.map((post) =>
				//@ts-ignore
				post._id === action.payload._id ? action.payload : post
			);

		case actionTypes.DELETE:
			//@ts-ignore
			return posts.filter((post) => post._id !== action.payload);
		default:
			return posts;
	}
};
