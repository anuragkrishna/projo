/*jshint esversion: 6 */

import React from 'react';
import {Link} from 'react-router';


export default function ProjectCard({project, deleteProject}){

	var date = new Date(project.started_on);

	return (<div className="ui card">			
			    <div className="content">
			        <div className="header">{project.title}</div>
			        <hr/>
			        <div>
			        	<span>{date.toLocaleDateString("en-US")} </span>
			        </div>	
			        <div>
			        	<span>{project.status} </span>
			        </div>	
			        <div>
			        	<span className="description">{project.donor}</span>
			        </div>	  
			    </div>    
			    <div className="extra content">
			        <a className="right floated" onClick={() => deleteProject(project.id)}>
			            <i className="delete icon"></i>
			            Remove
			        </a>
			         <Link to={`/project/${project.id}`}>
			            <i className="edit icon"></i>
			            Edit
			        </Link>
			    </div>
			</div>);
}