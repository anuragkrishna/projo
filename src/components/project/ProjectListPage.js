/*jshint esversion: 6 */

import React from 'react';
import {connect} from 'react-redux';
import ProjectList from './ProjectList';
import {fetchAllProjects, deleteProject} from "../../actions/p_actions";

/*
	author: Anurag Krishna
*/

class ProjectListPage extends React.Component {

  componentDidMount(){
  	this.props.fetchAllProjects();
  }	

  render() {
    return (
      <div>
      	<ProjectList projects={this.props.projects} deleteProject={this.props.deleteProject}/>
      </div>
     );
    }
}    



function mapStateToProps(state){
	return {
		projects: state.projects_r
	};
}

export default connect(mapStateToProps, {fetchAllProjects, deleteProject})(ProjectListPage);