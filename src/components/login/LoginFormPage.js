/*jshint esversion: 6 */

import React from 'react';
import LoginForm from './LoginForm';
import {connect} from 'react-redux';
import {loginRequest} from '../../actions/authActions'; 
import { browserHistory } from 'react-router';


class LoginFormPage extends React.Component {
	
	render(){

			const ele = <div className="ui grid">
		  					<div className="four wide column"></div>
		  					<div className="eight wide column">
								<LoginForm loginRequest={this.props.loginRequest}/>	
							</div>	
							<div className="four wide column"></div>
						</div>	
			return (
				<div>
					{this.props.isAuthenticated ? browserHistory.push("/") : ele}
				</div>	
			);
		}	
}

LoginFormPage.propTypes = {
  	loginRequest: React.PropTypes.func.isRequired
}

function mapStateToProps(state){
	return {
		isAuthenticated: state.auth.isAuthenticated
	};
}


export default connect(mapStateToProps,{loginRequest})(LoginFormPage);