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
      const name = e.target.name;
      let errors = this.state.errors;
      errors[name] = "";
      this.setState({ errors});
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
                  <div className="container col-xs-12 col-md-8 col-md-offset-2">
                    <div className="jumbotron">
                      <form className={classnames({error:errors})} onSubmit={this.handleSubmit}>
                        <h3>{this.state.id ? "Edit Note" : "Add New Note"}</h3>

                          {!!errors.global && <div className="ui negative message"><p>{errors.global}</p></div>}

                          <TextFieldGroup
                            label="Title"
                            value={this.state.title}
                            type="text"
                            name="title"
                            onChange={this.onChange}
                            error={errors.title}
                            />

                            <div className={classnames("form-group", {error:errors.content})}>
                              <label>Content</label>
                              <textarea className="form-control" name="content" value={this.state.content} onChange={this.onChange} rows="10"></textarea>
                              
                              {errors.content && <div className="alert alert-danger" role="alert">
                                <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
                                <span className="sr-only alert alert-danger">Error:</span>
                                  {errors.content}
                              </div>
                            }

                            </div>  

                          <div className="field">
                            <button className="btn btn-primary">Save</button>
                            <button className="btn btn-secondary" onClick={()=>browserHistory.push('/notes')}>Cancel</button>
                          </div>
                    </form>
                  </div>
                </div>    
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