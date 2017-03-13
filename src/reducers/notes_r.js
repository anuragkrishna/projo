/*jshint esversion: 6 */
import {
    P_SET_NOTES,
    P_SAVE_NOTE,
    P_NOTE_UPDATED,
    P_NOTE_FETCHED,
    P_NOTE_DELETED
} from '../actions/types';
export default function notes_r(state = [], action = {}) {
    switch (action.type) {
        case P_SET_NOTES:
            return action.notes;
        case P_SAVE_NOTE:
            return [...state, action.note];
        case P_NOTE_UPDATED:
            return state.map((item) => {
                if (item._id === action.note._id) {
                    return action.note;
                } else {
                    return item;
                }
            });
        case P_NOTE_FETCHED:
            const index = state.findIndex(item => item._id === action.note._id);
            if (index > -1) {
                return state.map(item => {
                    if (item._id === action.note._id) {
                        return action.note;
                    }
                    return item;
                });
            } else {
                return [...state,
                    action.note
                ];
            }
            break;
        case P_NOTE_DELETED:
            return state.filter(item => item._id !== action.note._id);
        default:
            return state;
    }
}