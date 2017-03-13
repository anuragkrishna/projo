/*jshint esversion: 6 */
import {
    P_SET_NOTES,
    P_SAVE_NOTE,
    P_NOTE_UPDATED,
    P_NOTE_FETCHED,
    P_NOTE_DELETED,
    LIST_LOADING
} from './types';
import axios from 'axios';
export function fetchAllNotes() {
    return (dispatch) => {
        dispatch(setIsLoading(true));
        return axios.get('https://projek-api.herokuapp.com/api/notes').then(response => response.data).then((notes) => {
            dispatch(setIsLoading(false));
            dispatch(setNotes(notes));
        });
    };
}
export function setNotes(notes) {
    return {
        type: P_SET_NOTES,
        notes
    };
}
export function setIsLoading(isLoading) {
    return {
        type: LIST_LOADING,
        isLoading
    };
}
export function saveNote(data) {
    return (dispatch) => {
        return axios.post('https://projek-api.herokuapp.com/api/note', data).then(handleResponse).then((note) => dispatch(addNote(note)));
    };
}

function handleResponse(response) {
    if (response.status === 200) {
        return response.data;
    } else {
        let error = new Error(response.statusText);
        error.response = response;
        throw error;
    }
}
export function addNote(note) {
    return {
        type: P_SAVE_NOTE,
        note
    };
}
export function updateNote(data) {
    return (dispatch) => {
        return axios.put(`https://projek-api.herokuapp.com/api/note/${data.id}`, data).then(handleResponse).then((note) => dispatch(noteUpdated(note)));
    };
}
export function noteUpdated(note) {
    return {
        type: P_NOTE_UPDATED,
        note
    };
}
export function fetchNote(id) {
    return dispatch => {
        return axios.get(`https://projek-api.herokuapp.com/api/note/${id}`).then(handleResponse).then(data => dispatch(noteFetched(data)));
    };
}
export function noteFetched(note) {
    return {
        type: P_NOTE_FETCHED,
        note
    };
}
export function deleteNote(id) {
    return (dispatch) => {
        return axios.delete(`https://projek-api.herokuapp.com/api/note/${id}`).then(handleResponse).then((note) => dispatch(noteDeleted(note)));
    };
}
export function noteDeleted(note) {
    return {
        type: P_NOTE_DELETED,
        note
    };
}