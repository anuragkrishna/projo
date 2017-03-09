/*jshint esversion: 6 */

import React from 'react';
import {Route, IndexRoute, IndexRedirect} from 'react-router';

import App from './components/App';
import SignupFormPage from './components/signup/SignupFormPage';
import LoginFormPage from './components/login/LoginFormPage';
import ProjectListPage from './components/project/ProjectListPage';
import ProjectCreateFormPage from './components/project/ProjectCreateFormPage';
import NoteListPage from './components/note/NoteListPage';
import NoteCreateFormPage from './components/note/NoteCreateFormPage';
import requireAuth from './utils/requireAuth';
import NotFound from './components/NotFound';

export default (
	
	<Route path="/">
		
		<Route path="signup" component={SignupFormPage}/>
		<Route path="login" component={LoginFormPage}/>

		<Route component={requireAuth(App)} >
			<IndexRedirect to="projects"/>	
			<Route path="projects" component={requireAuth(ProjectListPage)}/>
			<Route path="projects/create" component={requireAuth(ProjectCreateFormPage)}/>
			<Route path="project/:id" component={requireAuth(ProjectCreateFormPage)}/>
			<Route path="notes" component={requireAuth(NoteListPage)}/>
			<Route path="notes/create" component={requireAuth(NoteCreateFormPage)}/>
			<Route path="note/:id" component={requireAuth(NoteCreateFormPage)}/>
			<Route path="*" component={NotFound}/>
		</Route>	
	</Route>		
	);