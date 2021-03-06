import * as api from '../api/index';
import { actionTypes } from '../constants/actionTypes';

export const getPosts = (page: any) => async (dispatch: any) => {
	try {
		dispatch({ type: actionTypes.START_LOADING });
		const { data } = await api.fetchPosts(page);
		console.log(data);

		dispatch({ type: actionTypes.FETCH_ALL, payload: data });
		dispatch({ type: actionTypes.END_LOADING });
	} catch (error) {
		console.log(error);
	}
};

export const getPost = (id: any) => async (dispatch: any) => {
	try {
		dispatch({ type: actionTypes.START_LOADING });
		const { data } = await api.fetchPost(id);
		console.log(data);

		dispatch({ type: actionTypes.FETCH_POST, payload: data });
		dispatch({ type: actionTypes.END_LOADING });
	} catch (error) {
		console.log(error);
	}
};

export const getPostsBySearch = (searchQuery: any) => async (dispatch: any) => {
	try {
		dispatch({ type: actionTypes.START_LOADING });
		const {
			data: { data }
		} = await api.fetchPostsBySearch(searchQuery);
		dispatch({ type: actionTypes.FETCH_BY_SEARCH, payload: data });
		dispatch({ type: actionTypes.END_LOADING });
		console.log(data);
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
