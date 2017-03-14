/*jshint esversion: 6 */

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/rootReducer';
import {Provider} from 'react-redux';
import { composeWithDevTools} from 'redux-devtools-extension';
import { Router, browserHistory } from 'react-router';
import routes from './routes';
import setAuthorizationToken from './utils/setAuthorizationToken';
import jwt_decode from 'jwt-decode';
import {setCurrentUser} from './actions/authActions';

import '../public/js/jquery-3.1.1.slim';
import '../public/js/bootstrap.min.js';


const store = createStore(rootReducer, composeWithDevTools(
		applyMiddleware(thunk)
		)
);

if (typeof window !== 'undefined'){ 
	 if(window.localStorage.jwtToken){
	 	setAuthorizationToken(window.localStorage.jwtToken);
	 	store.dispatch(setCurrentUser(jwt_decode(window.localStorage.jwtToken)));
	 }
} 

ReactDOM.render(
	<Provider store={store}>
  		<Router history={browserHistory} routes={routes} />
  	</Provider>,		
  document.getElementById('root')
);
