/*jshint esversion: 6 */

import React from 'react';
import NoteCard from './NoteCard';

if (process.env.BROWSER) {
  require('./style.css');
}


export default function NoteList({notes, deleteNote}){
		
	return (
			<div id="artifactlist" className="container">
    			<div>
					{notes.map((note) => <NoteCard note={note} key={note.id} deleteNote={deleteNote}/>)}
				</div>
			</div>	
			);
}
