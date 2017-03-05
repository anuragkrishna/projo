/*jshint esversion: 6 */

import {combineReducers} from 'redux';

import projects_r from './projects_r';
import notes_r from './notes_r';
import auth from './auth';

export default combineReducers({projects_r, notes_r, auth});