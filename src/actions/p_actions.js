/*jshint esversion: 6 */
import {P_SET_PROJECTS, P_SAVE_PROJECT, P_PROJECT_UPDATED, P_PROJECT_FETCHED, P_PROJECT_DELETED} from './types';

import axios from 'axios';

export function fetchAllProjects(){
	return (dispatch) =>{
		return axios.get('/api/projects')
			.then(response=>response.data)
			.then((projects)=>dispatch(setProjects(projects)));
	};
}

export function setProjects(projects){
	return {
		type: P_SET_PROJECTS,
		projects
	};
}

export function saveProject(data){
	return (dispatch) => {
		return axios.post('/api/project', data)
				.then(handleResponse)
			  	.then((project)=>dispatch(addProject(project)));
	 };
} 

function handleResponse(response){
  	if(response.status===200){
  		return response.data;
  	}else{
  		let error = new Error(response.statusText);
   		 error.response = response;
    	throw error;
  	}

  }

export function addProject(project){
	return {
		type: P_SAVE_PROJECT,
		project
	};
}

export function updateProject(data){
	return (dispatch) => {
		return axios.put(`/api/project/${data.id}`, data)
				.then(handleResponse)
			  	.then((project)=>dispatch(projectUpdated(project)));
	 };
} 


export function projectUpdated(project){
	return {
		type: P_PROJECT_UPDATED,
		project
	};
}

export function fetchProject(id) {
  return dispatch => {
    return axios.get(`/api/project/${id}`)
    	.then(handleResponse)
    	.then(data => dispatch(projectFetched(data)));
  };
}

export function projectFetched(project) {
 return {
		type: P_PROJECT_FETCHED,
		project
	};
}
 

export function deleteProject(id){
	console.log("deleteProject")
	return (dispatch) => {
		return axios.delete(`/api/project/${id}`)
				.then(handleResponse)
			  	.then((project)=>dispatch(projectDeleted(project)));
	 };
} 


export function projectDeleted(project) {
 return {
		type: P_PROJECT_DELETED,
		project
	};
}


