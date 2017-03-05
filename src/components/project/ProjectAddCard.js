/*jshint esversion: 6 */

import React from 'react';
import {Link} from 'react-router';

export default function ProjectAddCard(){
	return (
			<div className="ui card">			
			    <div className="content">
			    	<div className="image">
			       	<Link to="/projects/create"><i className="write icon"></i>Add Project</Link>
			       	</div>
			    </div>
			</div>
		 );	
}