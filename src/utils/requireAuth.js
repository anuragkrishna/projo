import React from 'react';
import {connect} from 'react-redux';

export default function(ComposedComponent) {
	class Authenticate extends React.Component {

		componentWillMount() {
			if(!this.props.isAuthenticated){
				this.context.router.push('/login');
			}	
		}

		componentWillUpdate(nextProps){
			if(!nextProps.isAuthenticated){
				this.context.router.push('/');
			}
		}

		render(){
				return (
					<ComposedComponent {...this.props}/>	
				);
			}	
	}

	Authenticate.contextTypes = {
		router: React.PropTypes.object.isRequired
	}


	function mapAtateToProps(state){
		return {
			isAuthenticated: state.auth.isAuthenticated
		}
	}

return connect(mapAtateToProps)(Authenticate);
}