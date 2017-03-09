/*jshint esversion: 6 */

import React from 'react';
import { connect } from 'react-redux';
import { saveNote, updateNote, fetchNote } from '../../actions/n_actions';
import NoteCreateForm from './NoteCreateForm';

class NoteCreateFormPage extends React.Component {

  constructor(props){
    super(props);
	   this.state ={
		    redirect_to_notes: false
	   };
  }  

	componentDidMount() {
    console.log("Hello", this.props.params.id);
		if (this.props.params.id) {
         console.log(this.props.params.id);
      		this.props.fetchNote(this.props.params.id);
		}
	}

  saveNote =({id, title, content }) => {
  	  if(id){
  	  		return this.props.updateNote({ id, title, content })
      		  .then(()=>{this.setState({redirect_to_notes:true})});
  	  }	else{
      		return this.props.saveNote({ title, content})
            .then(()=>{this.setState({redirect_to_notes:true})});
 		}	
	}

  render() {
    return (
      <div>
      	  {
      	  	this.state.redirect_to_notes ? this.context.router.push('/notes') :	
          		<NoteCreateForm note={this.props.note} saveNote={this.saveNote}/> 
      }

      </div>
    );
  }
}

function mapStateToProps(state, props){
	if(props.params.id){
		return {note: state.notes_r.find(item => item.id===props.params.id)}
	}
	return {note: null};
}

//For Redirect using context
NoteCreateFormPage.contextTypes ={
  router: React.PropTypes.object.isRequired
}


export default connect(mapStateToProps, { saveNote, updateNote,fetchNote })(NoteCreateFormPage);