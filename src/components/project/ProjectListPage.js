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
    const boilerPlate= <h3 className="boilerplate">You have no projects. Click on 'Add Projects' to create.</h3>;
    const loadingPlate= <h3 className="boilerplate">Loading...</h3>;
    return (
      <div className="jumbotron clearfix">
        {this.props.isLoading ? loadingPlate : this.props.projects.length===0 ? boilerPlate 
          : <ProjectList projects={this.props.projects} deleteProject={this.props.deleteProject}/>
        }
      </div>
     );
    }
}    



function mapStateToProps(state){
	return {
		projects: state.projects_r,
    isLoading: state.loader_r
	};
}

export default connect(mapStateToProps, {fetchAllProjects, deleteProject})(ProjectListPage);