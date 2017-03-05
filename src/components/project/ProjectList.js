/*jshint esversion: 6 */

import React from 'react';
import ProjectCard from './ProjectCard';
import ProjectAddCard from './ProjectAddCard';

export default function ProjectList({projects, deleteProject}){

	return (<div className="ui four cards">
				<ProjectAddCard />
				{projects.map((project) => <ProjectCard project={project} key={project.id} deleteProject={deleteProject}/>)}
			</div>
			);
}
