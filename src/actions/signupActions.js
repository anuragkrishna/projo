/*jshint esversion: 6 */

import axios from 'axios';

export function userSignupRequest(userData){
	return dispatch => {
		return axios.post('/api/user', userData);
	};
}

export function isUserExists(identifier) {
	return dispatch => {
		return axios.get(`/api/user/${identifier}`);
	};
}