/*jshint esversion: 6 */

import React from 'react';
import {Route, IndexRoute} from 'react-router';

import App from './components/App';
import SignupFormPage from './components/signup/SignupFormPage';
import LoginFormPage from './components/login/LoginFormPage';
import ProjectListPage from './components/project/ProjectListPage';
import ProjectCreateFormPage from './components/project/ProjectCreateFormPage';


export default (
	<Route path="/" component={App}>
		<IndexRoute component={ProjectListPage} />
		<Route path="signup" component={SignupFormPage}/>
		<Route path="login" component={LoginFormPage}/>
		<Route path="projects" component={ProjectListPage}/>
		<Route path="projects/create" component={ProjectCreateFormPage}/>
		<Route path="project/:id" component={ProjectCreateFormPage}/>
	</Route>		
	);