/*jshint esversion: 6 */

import React from 'react';
import TextFieldGroup from '../commons/TextFieldGroup';
import { browserHistory } from 'react-router';
import classnames from 'classnames';
import validateNoteInput from '../../validations/note'; 

/*
	author: Anurag Krishna
*/

class NoteCreateForm extends React.Component {
  constructor(props){
    super(props);
    console.log(props);
    this.state ={
      id: this.props.note ? this.props.note.id : '',
      title:this.props.note ? this.props.note.title : '',
      content:this.props.note ? this.props.note.content : '',
      errors:{},
      server_status:""
    };
  } 

  componentWillReceiveProps = (nextProps) => {
    console.log("received", nextProps );
    this.setState({
      id: nextProps.note.id,
      title: nextProps.note.title,
      content: nextProps.note.content,
    });
  }

    onChange = (e) =>{
    if(!!this.state.errors[e.target.name]){
      let errors = this.state.errors[e.target.name];
      this.setState({
        [e.target.name]:e.target.value,
        errors
    });
    }else{
        this.setState({ [e.target.name]: e.target.value });
    }
  }

    isDataValid = () =>{

      const {errors, isValid} = validateNoteInput(this.state);
      if(!isValid){
        this.setState({errors:errors});
      }
      return isValid;
   }


   handleSubmit = (e)=>{

    e.preventDefault();
  
    if(this.isDataValid()){
      const { id, title, content } = this.state;
      this.props.saveNote({id, title, content });
     } 
  };

  render() {

    const errors = this.state.errors;

    const form = (
        <form className={classnames("ui form",{error:errors})} onSubmit={this.handleSubmit}>
          <h1>{this.state.id ? "Edit Note" : "Add New Note"}</h1>

            {!!errors.global && <div className="ui negative message"><p>{errors.global}</p></div>}

            <TextFieldGroup
              label="Title"
              value={this.state.title}
              type="text"
              name="title"
              onChange={this.onChange}
              error={errors.title}
              />

              <div className={classnames("field", {error:errors.content})}>
                <label>Content</label>
                <textarea name="content" value={this.state.content} onChange={this.onChange} rows="10"></textarea>
                {errors.content && <span className="ui error message">{errors.content}</span>}
              </div>  

            <div className="field">
              <button className="ui right floated primary button">Save</button>
              <button className="ui right floated secondary button" onClick={()=>browserHistory.push('/notes')}>Cancel</button>
            </div>
      </form>
      );

    return (
        <div>
          {form}
        </div>
        );  
    }
}  

//For Redirect using context
NoteCreateForm.contextTypes ={
  router: React.PropTypes.object.isRequired
}

export default NoteCreateForm;