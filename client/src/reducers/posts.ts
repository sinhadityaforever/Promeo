import { actionTypes } from '../constants/actionTypes';
export const posts: any = (
	state = { isLoading: true, posts: [] },
	action: any
) => {
	switch (action.type) {
		case actionTypes.START_LOADING:
			return { ...state, isLoading: true };
		case actionTypes.END_LOADING:
			return { ...state, isLoading: false };

		case actionTypes.FETCH_ALL:
			return {
				...state,
				posts: action.payload.data,
				currentPage: action.payload.currentPage,
				numberOfPages: action.payload.numberOfPages
			};

		case actionTypes.FETCH_BY_SEARCH:
			return { ...state, posts: action.payload };

		case actionTypes.CREATE:
			return { ...state, posts: [...state.posts, action.payload] };
		case actionTypes.UPDATE:
		case actionTypes.LIKE:
			return {
				...state,
				posts: state.posts.map((post) =>
					//@ts-ignore
					post._id === action.payload._id ? action.payload : post
				)
			};

		case actionTypes.DELETE:
			return {
				...state,
				//@ts-ignore
				posts: state.posts.filter((post) => post._id !== action.payload)
			};
		default:
			return state;
	}
};
