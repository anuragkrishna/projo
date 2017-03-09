/*jshint esversion: 6 */

import React from 'react';
import '../index.css'; 

import {Link} from 'react-router';

import { connect } from 'react-redux';
import {logoutRequest} from '../actions/authActions';
import logo from '../../public/img/small-logo.jpg';
import './App.css';

class igationBar extends React.Component{

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

	return(
			<nav className="navbar navbar-default navbar-inverse navbar-fixed-top">
		       <div className="container"> 
		        <div className="navbar-header">
		            <button type="button" className="navbar-toggle collapsed" data-target="#navbar" data-toggle="collapse" aria-controls="navbar" aria-expanded="false">
		            	<span className="sr-only">Toggle navigation</span>
		                <span className="icon-bar"></span>
		                <span className="icon-bar"></span>
		                <span className="icon-bar"></span>
		            </button>
		            <span className="navbar-brand"><img src={logo} alt=""/> Projek</span>
		        </div> 
		        <div id="navbar" className="navbar-collapse collapse">
		            <ul className="nav navbar-nav">
		                <li><Link to="projects">Projects</Link></li>
		                <li><Link to="notes">Notes</Link></li>
		                <li><Link to="reports">Reports</Link></li>
		            </ul> 
		            <ul className="nav navbar-nav navbar-right">
		            	<li><Link to="/projects/create"><button type="button" className="btn btn-circle btn-warning" data-toggle="tooltip" data-placement="bottom" title="Add Project">+P</button></Link></li>
		            	<li><Link to="/notes/create"><button className="btn btn-circle btn-success" data-toggle="tooltip" data-placement="bottom" title="Add Note">+N</button></Link></li>
		            	
		            	<li className="dropdown">
                			<Link href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">{this.props.auth.user.username}<span className="caret"></span></Link>
                			<ul className="dropdown-menu">
                  				<li id="logout"><Link to="logout" onClick={this.logout}>logout</Link></li>
                			</ul>
              			</li>

		          </ul> 
		        </div>   
		       </div>  
    		</nav>

		);
	}
}


igationBar.proptypes ={
	auth: React.PropTypes.object.isRequired,
	logoutRequest:React.PropTypes.func.isRequired
}

igationBar.contextTypes = {
  router: React.PropTypes.object.isRequired
}



function mapStateToProps(state){
	return {
		auth: state.auth
	};
}

export default connect(mapStateToProps, {logoutRequest})(igationBar);