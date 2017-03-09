/*jshint esversion: 6 */

import React from 'react';
import { connect } from 'react-redux';
import { saveProject, updateProject,fetchProject } from '../../actions/p_actions';
import ProjectCreateForm from './ProjectCreateForm';

class ProjectCreateFormPage extends React.Component {

	state ={
		redirect_to_projects: false
	};

	componentDidMount() {
		if (this.props.params.id) {
      		this.props.fetchProject(this.props.params.id);
		}
	}

  saveProject = ({id, title, donor, status, started_on }) => {
  	  if(id){
  	  		return this.props.updateProject({ id, title, donor, status, started_on })
      		  .then(()=>{this.setState({redirect_to_projects:true})});
  	  }	else{
      		return this.props.saveProject({ title, donor, status, started_on })
      		  .then(()=>{this.setState({redirect_to_projects:true})});
 		}	
	}

  render() {
    return (
      <div>
      	  {
      	  	this.state.redirect_to_projects ? this.context.router.push('/projects') :	
          		<ProjectCreateForm project={this.props.project} saveProject={this.saveProject}/> 
          }

      </div>
    );
  }
}

function mapStateToProps(state, props){
	if(props.params.id){
		return {project: state.projects_r.find(item => item.id===props.params.id)}
	}
	return {project: null};
}

//For Redirect using context
ProjectCreateFormPage.contextTypes ={
  router: React.PropTypes.object.isRequired
}


export default connect(mapStateToProps, { saveProject, updateProject,fetchProject })(ProjectCreateFormPage);