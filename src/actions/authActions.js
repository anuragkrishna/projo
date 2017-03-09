/*jshint esversion: 6 */

import axios from 'axios';
import setAuthorizationToken from '../utils/setAuthorizationToken';
import jwt_decode from 'jwt-decode';
import {SET_CURRENT_USER} from './types';

export function setCurrentUser(user) {
  return  {
    type:SET_CURRENT_USER,
    user
  };
}

export function loginRequest(data) {
  return dispatch => {
    return axios.post('/api/auth', data).then(res => {
      const token = res.data.token;
      if(window){
        window.localStorage.setItem('jwtToken', token);
        setAuthorizationToken(token);
        dispatch(setCurrentUser(jwt_decode(token)));
      }});
    };
}

export function logoutRequest() {
  return dispatch => {
    if(window){
      window.localStorage.removeItem('jwtToken');
      setAuthorizationToken(false);
      dispatch(setCurrentUser({}));
  }};
}