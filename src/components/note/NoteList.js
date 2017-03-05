/*jshint esversion: 6 */

import React from 'react';
import NoteCard from './NoteCard';
import NoteAddCard from './NoteAddCard';

export default function NoteList({notes, deleteNote}){

	return (<div className="ui four cards">
				<NoteAddCard />
				{notes.map((note) => <NoteCard note={note} key={note.id} deleteNote={deleteNote}/>)}
			</div>
			);
}
