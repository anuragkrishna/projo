/*jshint esversion: 6 */

import React from 'react';
import NoteCard from './NoteCard';

if (process.env.BROWSER) {
  require('./style.css');
}


export default function NoteList({notes, deleteNote}){
		const boilerPlate= <h3 className="boilerplate">You have no notes. Click on 'Add Note' to create.</h3>; 
	return (
			<div id="artifactlist" className="container">
    			<div className="jumbotron">
					{notes.length===0 ? boilerPlate : notes.map((note) => <NoteCard note={note} key={note.id} deleteNote={deleteNote}/>)}
				</div>
			</div>	
			);
}
