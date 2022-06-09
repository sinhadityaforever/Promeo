export const posts = (posts = [], action: any) => {
	switch (action.type) {
		case 'FETCH_ALL':
			return action.payload;
		case 'CREATE':
			return [...posts, action.payload];

		case 'UPDATE':
			return posts.map((post) =>
				//@ts-ignore
				post._id === action.payload._id ? action.payload : post
			);

		case 'DELETE':
			//@ts-ignore
			return posts.filter((post) => post._id !== action.payload);
		default:
			return posts;
	}
};
