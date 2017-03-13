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
      const boilerPlate= <h3 className="boilerplate">You have no notes. Click on 'Add Note' to create.</h3>; 
      const loadingPlate= <h3 className="boilerplate">Loading...</h3>; 
    return (
        <div className="jumbotron clearfix">
          {this.props.isLoading ? loadingPlate : this.props.notes.length===0 ? boilerPlate : <NoteList notes={this.props.notes} deleteNote={this.props.deleteNote}/>
            }
      </div>
     );
    }
}    

function mapStateToProps(state){
  return {
		notes: state.notes_r,
    isLoading: state.loader_r
	};
}

export default connect(mapStateToProps, {fetchAllNotes, deleteNote})(NoteListPage);