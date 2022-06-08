import * as api from '../api/index';

export const getPosts = () => async (dispatch: any) => {
	try {
		const { data } = await api.fetchPosts();
		dispatch({ type: 'FETCH_ALL', payload: data });
	} catch (error) {
		console.log(error);
	}
};

export const createPost = (post: any) => async (dispatch: any) => {
	try {
		const { data } = await api.createPost(post);
		dispatch({ type: 'CREATE', payload: data });
	} catch (error) {
		console.log(error);
	}
};

export const updatePost = (id: any, post: any) => async (dispatch: any) => {
	try {
		const { data } = await api.updatePost(id, post);
		dispatch({ type: 'UPDATE', payload: data });
	} catch (error) {
		console.log(error);
	}
};
