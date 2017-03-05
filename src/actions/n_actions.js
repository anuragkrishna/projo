/*jshint esversion: 6 */

import {P_SET_NOTES, P_SAVE_NOTE, P_NOTE_UPDATED, P_NOTE_FETCHED, P_NOTE_DELETED} from './types';

import axios from 'axios';

export function fetchAllNotes(){
	console.log("Fetching Notes");
	return (dispatch) =>{
		return axios.get('/api/notes')
			.then(response=>response.data)
			.then((notes)=>dispatch(setNotes(notes)));
	};
}

export function setNotes(notes){
	return {
		type: P_SET_NOTES,
		notes
	};
}

export function saveNote(data){
	console.log("saving note")
	return (dispatch) => {
		return axios.post('/api/note', data)
				.then(handleResponse)
			  	.then((note)=>dispatch(addNote(note)));
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

export function addNote(note){
	return {
		type: P_SAVE_NOTE,
		note
	};
}

export function updateNote(data){
	return (dispatch) => {
		return axios.put(`/api/note/${data.id}`, data)
				.then(handleResponse)
			  	.then((note)=>dispatch(noteUpdated(note)));
	 };
} 

export function noteUpdated(note){
	return {
		type: P_NOTE_UPDATED,
		note
	};
}

export function fetchNote(id) {
  return dispatch => {
    return axios.get(`/api/note/${id}`)
    	.then(handleResponse)
    	.then(data => dispatch(noteFetched(data)));
  };
}

export function noteFetched(note) {
 return {
		type: P_NOTE_FETCHED,
		note
	};
}
 

export function deleteNote(id){
	return (dispatch) => {
		return axios.delete(`/api/note/${id}`)
				.then(handleResponse)
			  	.then((note)=>dispatch(noteDeleted(note)));
	 };
} 


export function noteDeleted(note) {
 return {
		type: P_NOTE_DELETED,
		note
	};
}


