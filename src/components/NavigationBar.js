/*jshint esversion: 6 */

import React from 'react';
import '../index.css'; 

import {Link} from 'react-router';
import { connect } from 'react-redux';
import {logoutRequest} from '../actions/authActions';

class NavigationBar extends React.Component{

	constructor(props) {
		super(props);
		this.logout=this.logout.bind(this);
	}
	
		logout(e){
		e.preventDefault();
		this.props.logoutRequest();
		this.context.router.push('/login');
	}
	render(){
		const { isAuthenticated } = this.props.auth;

		const userLinks = (
					<div className="right menu">
				    	<a className="ui item" href="#" onClick={this.logout}> Logout </a>
				    </div>
			);

		const guestLinks = (
			<div className="right menu">
					<Link className="ui item" to="signup">
				      Signup
				    </Link>
				    <Link className="ui item" to="login">
				      Login
				   	</Link>	
			</div>	   	
			);
	return(
			<div className="ui secondary pointing menu">
				  <Link className="item" activeClassName="active" to="/">
				    Home
				  </Link>
				  <Link className="item" activeClassName="active" to="notes">
				    Notes
				  </Link>
				  <Link className="item" activeClassName="active" to="reports">
				    Reports
				  </Link>
				  		{isAuthenticated ? userLinks : guestLinks}
			</div>
		);
	}
}


NavigationBar.proptypes ={
	auth: React.PropTypes.object.isRequired,
	logoutRequest:React.PropTypes.func.isRequired
}

NavigationBar.contextTypes = {
  router: React.PropTypes.object.isRequired
}



function mapStateToProps(state){
	return {
		auth: state.auth
	};
}

export default connect(mapStateToProps, {logoutRequest})(NavigationBar);