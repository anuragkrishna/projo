/*jshint esversion: 6 */

import React from 'react';
import {Link} from 'react-router';


export default function NoteCard({note, deleteNote}){
	console.log(note);
	return (<div className="ui card">			
			    <div className="content">
			        <div className="header">{note.title}</div>
			        <hr/>
			        <div>
			        	<span className="description">{note.content}</span>
			        </div>	  
			    </div>    
			    <div className="extra content">
			        <a className="right floated" onClick={() => deleteNote(note.id)}>
			            <i className="delete icon"></i>
			            Remove
			        </a>
			         <Link to={`/note/${note.id}`}>
			            <i className="edit icon"></i>
			            Edit
			        </Link>
			    </div>
			</div>);
}