/*jshint esversion: 6 */

import axios from 'axios';

export function userSignupRequest(userData){
	return dispatch => {
		return axios.post('https://projek-api.herokuapp.com/api/user', userData);
	};
}

export function isUserExists(identifier) {
	return dispatch => {
		return axios.get(`https://projek-api.herokuapp.com/api/user/${identifier}`);
	};
}