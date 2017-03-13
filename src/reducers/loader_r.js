/*jshint esversion: 6 */

import {LIST_LOADING } from '../actions/types';

export default function loader_r(state=[], action={}){
	switch(action.type){
		case LIST_LOADING:
			return action.isLoading;
		default:
			return state;	
	}
}