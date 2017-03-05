/*jshint esversion: 6 */

import React from 'react';
import TextFieldGroup from '../commons/TextFieldGroup';

/*
	author: Anurag Krishna
*/

class ProjectCreateForm extends React.Component {

  state ={
    id: this.props.project ? this.props.project.id : '',
    title:this.props.project ? this.props.project.title : '',
    donor:this.props.project ? this.props.project.donor : '',
    status:this.props.project ? this.props.project.status: '',
    started_on:this.props.project ? this.props.project.started_on : '',
    errors:{},
    server_status:""
  };

  componentWillReceiveProps = (nextProps) => {
    this.setState({
      id: nextProps.project.id,
      title: nextProps.project.title,
      donor: nextProps.project.donor,
      status: nextProps.project.status,
      started_on: nextProps.project.started_on
    })
  }

    onChange = (e) => {
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

   handleSubmit = (e) => {

    e.preventDefault();
    //Validation
    let errors = {};
    if(this.state.title==='') errors.title = "Can't be empty";
    if(this.state.donor==='') errors.donor = "Can't be empty";
    if(this.state.status==='') errors.status = "Can't be empty";
    if(this.state.started_on==='') errors.started_on = "Can't be empty";

    this.setState({errors});

    const isValid = Object.keys(errors).length === 0;
    if(isValid){
      const { id, title, donor, status, started_on } = this.state;
      this.props.saveProject({id, title, donor, status, started_on });
     } 
  };

  render() {

    const errors = this.state.errors;

    const form = (
        <form className="ui form" onSubmit={this.handleSubmit}>
          <h1>Add new Project</h1>

            {!!errors.global && <div className="ui negative message"><p>{errors.global}</p></div>}

            <TextFieldGroup
              label="Title"
              value={this.state.title}
              type="text"
              name="title"
              onChange={this.onChange}
              error={errors.title}
              />

            <TextFieldGroup
              label="Donor"
              value={this.state.donor}
              type="text"
              name="donor"
              onChange={this.onChange}
              error={errors.donor}
              />

            <TextFieldGroup
              label="Status"
              value={this.state.status}
              type="text"
              name="status"
              onChange={this.onChange}
              error={errors.status}
              />

            <TextFieldGroup
              label="Started On"
              value={this.state.started_on}
              type="text"
              name="started_on"
              onChange={this.onChange}
              error={errors.started_on}
              />  

            <div className="field">
              <button className="ui primary button">Save</button>
              <button className="ui secondary button" onClick={()=>this.context.router.push(-1)}>Cancel</button>
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
ProjectCreateForm.contextTypes ={
  router: React.PropTypes.object.isRequired
}



export default ProjectCreateForm;