import * as api from '../api/index';

export const getPosts = () => async (dispatch: any) => {
	try {
		const { data } = await api.fetchPosts();
		dispatch({ type: 'FETCH_ALL', payload: data });
	} catch (error) {
		console.log(error);
	}
};
