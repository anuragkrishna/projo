import React from 'react';
import SignupForm from './SignupForm';
import {connect} from 'react-redux';
import {userSignupRequest, isUserExists} from '../../actions/signupActions';


class SignupFormPage extends React.Component {
	
	render(){
		const {userSignupRequest, isUserExists} = this.props;
			return (
				<div className="ui grid">
  					<div className="four wide column"></div>
  					<div className="eight wide column">
						<SignupForm userSignupRequest={userSignupRequest} isUserExists={isUserExists}/>	
					</div>	
					<div className="four wide column"></div>
				</div>	
			);
		}	
}

SignupFormPage.propTypes ={
  userSignupRequest: React.PropTypes.func.isRequired,
  isUserExists:React.PropTypes.func.isRequired  
}


export default connect(null,{userSignupRequest, isUserExists})(SignupFormPage);