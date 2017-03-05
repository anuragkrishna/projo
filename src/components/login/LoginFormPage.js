/*jshint esversion: 6 */

import React from 'react';
import LoginForm from './LoginForm';
import {connect} from 'react-redux';
import {loginRequest} from '../../actions/authActions'; 


class LoginFormPage extends React.Component {
	
	render(){
			return (
				<div className="ui grid">
  					<div className="four wide column"></div>
  					<div className="eight wide column">
						<LoginForm loginRequest={this.props.loginRequest}/>	
					</div>	
					<div className="four wide column"></div>
				</div>	
			);
		}	
}

LoginFormPage.propTypes ={
  loginRequest: React.PropTypes.func.isRequired
}


export default connect(null,{loginRequest})(LoginFormPage);