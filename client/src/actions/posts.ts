import * as api from '../api/index';
import { actionTypes } from '../constants/actionTypes';

export const getPosts = () => async (dispatch: any) => {
	try {
		const { data } = await api.fetchPosts();
		dispatch({ type: actionTypes.FETCH_ALL, payload: data });
	} catch (error) {
		console.log(error);
	}
};

export const createPost = (post: any) => async (dispatch: any) => {
	try {
		const { data } = await api.createPost(post);
		dispatch({ type: actionTypes.CREATE, payload: data });
	} catch (error) {
		console.log(error);
	}
};

export const updatePost = (id: any, post: any) => async (dispatch: any) => {
	try {
		const { data } = await api.updatePost(id, post);
		dispatch({ type: actionTypes.UPDATE, payload: data });
	} catch (error) {
		console.log(error);
	}
};

export const deletePost = (id: any) => async (dispatch: any) => {
	try {
		await api.deletePost(id);
		dispatch({ type: actionTypes.DELETE, payload: id });
	} catch (error) {
		console.log(error);
	}
};

export const likePost = (id: any) => async (dispatch: any) => {
	try {
		const { data } = await api.likePost(id);
		dispatch({ type: actionTypes.LIKE, payload: data });
	} catch (error) {
		console.log(error);
	}
};
