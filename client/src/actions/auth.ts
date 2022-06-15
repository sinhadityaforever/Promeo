import * as api from '../api/index';
import Auth from '../components/Auth/Auth';
import { actionTypes } from '../constants/actionTypes';

export const signin =
	(formData: any, history: any) => async (dispatch: any) => {
		try {
			//login user

			const { data } = await api.signIn(formData);
			dispatch({ type: actionTypes.AUTH, data });
			history.push('/');
		} catch (error) {
			console.log(error);
		}
	};

export const signup =
	(formData: any, history: any) => async (dispatch: any) => {
		try {
			//signup user
			const { data } = await api.signUp(formData);
			dispatch({ type: actionTypes.AUTH, data });
			history.push('/');
		} catch (error) {
			console.log(error);
		}
	};
