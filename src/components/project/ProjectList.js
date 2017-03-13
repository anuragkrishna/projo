/*jshint esversion: 6 */

import React from 'react';
import ProjectCard from './ProjectCard';

if (process.env.BROWSER) {
  require('./style.css');
}

export default function ProjectList({projects, deleteProject}){
	return (
			<div id="artifactlist" className="container">
    			<div>
    				
    				{projects.map((project) => <ProjectCard project={project} key={project.id} deleteProject={deleteProject}/>)}
    			</div>
    		</div>
		);
}
