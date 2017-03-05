/*jshint esversion: 6 */

import React from 'react';
import {Link} from 'react-router';

export default function NoteAddCard(){
	return (
			<div className="ui card">			
			    <div className="content">
			    	<div className="image">
			       	<Link to="/notes/create"><i className="write icon"></i>Add Note</Link>
			       	</div>
			    </div>
			</div>
		 );	
}