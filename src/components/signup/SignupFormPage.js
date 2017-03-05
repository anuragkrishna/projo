/*jshint esversion: 6 */

import React from 'react';
import SignupForm from './SignupForm';
import {connect} from 'react-redux';
import {userSignupRequest, isUserExists} from '../../actions/signupActions';
import { browserHistory } from 'react-router';


class SignupFormPage extends React.Component {
	
	render(){
		const ele = (
					<div className="ui grid">
		  				<div className="four wide column"></div>
		  				<div className="eight wide column">
							<SignupForm userSignupRequest={userSignupRequest} isUserExists={isUserExists}/>	
						</div>	
						<div className="four wide column"></div>
					</div>	
				);	
		const {userSignupRequest, isUserExists} = this.props;
			return (
				<div>
					{this.props.isAuthenticated ? browserHistory.push("/") : ele}
				</div>	
			);
		}	
}

SignupFormPage.propTypes ={
  userSignupRequest: React.PropTypes.func.isRequired,
  isUserExists:React.PropTypes.func.isRequired  
}

function mapStateToProps(state){
	return {
		isAuthenticated: state.auth.isAuthenticated
	};
}


export default connect(mapStateToProps,{userSignupRequest, isUserExists})(SignupFormPage);