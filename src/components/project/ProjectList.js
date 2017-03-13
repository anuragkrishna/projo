/*jshint esversion: 6 */

import React from 'react';
import ProjectCard from './ProjectCard';

if (process.env.BROWSER) {
  require('./style.css');
}

export default function ProjectList({projects, deleteProject}){
		const boilerPlate= <h3 className="boilerplate">You have no projects. Click on 'Add Projects' to create.</h3>; 
	return (
			<div id="artifactlist" className="container">
    			<div className="jumbotron clearfix">
    				
    				{projects.length===0 ? boilerPlate : projects.map((project) => <ProjectCard project={project} key={project.id} deleteProject={deleteProject}/>)}
    			</div>
    		</div>
		);
}
