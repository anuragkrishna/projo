/*jshint esversion: 6 */

import React from 'react';
import {connect} from 'react-redux';
import NoteList from './NoteList';
import {fetchAllNotes, deleteNote} from "../../actions/n_actions";

/*
	author: Anurag Krishna
*/

class NoteListPage extends React.Component {

  componentDidMount(){
  	this.props.fetchAllNotes();
  }	

  render() {
    return (
      <div>
      	<NoteList notes={this.props.notes} deleteNote={this.props.deleteNote}/>
      </div>
     );
    }
}    



function mapStateToProps(state){
	return {
		notes: state.notes_r
	};
}

export default connect(mapStateToProps, {fetchAllNotes, deleteNote})(NoteListPage);