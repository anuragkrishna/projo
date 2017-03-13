/*jshint esversion: 6 */

import {P_SET_PROJECTS, P_SAVE_PROJECT, P_PROJECT_UPDATED,P_PROJECT_FETCHED,P_PROJECT_DELETED } from '../actions/types';

export default function projects_r(state=[], action={}){
	switch(action.type){
		case P_SET_PROJECTS:
			return action.projects;
		case P_SAVE_PROJECT:
			return [...state, action.project];	
		case P_PROJECT_UPDATED:
			return state.map((item)=> {
				 if(item.id===action.project.id){
				 	return action.project;
				 }else{
				 	return item;
				 }
			});	 
		case P_PROJECT_FETCHED:
			const index = state.findIndex(item=>item.id===action.project.id); 
			if(index>-1){
				return state.map(item =>{
					if(item.id===action.project.id){
						return action.project;
					}
					return item;
				});
			} else {
				return [
				...state,
				action.project
				]
			}
		case P_PROJECT_DELETED:
			return state.filter(item => item.id!==action.project.id);	
		default:
			return state;	
	}
}