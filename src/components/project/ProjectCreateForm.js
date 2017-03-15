/*jshint esversion: 6 */

import React from 'react';
import TextFieldGroup from '../commons/TextFieldGroup';
import { browserHistory } from 'react-router';
import status from './status'
import map from 'lodash/map';
import classnames from 'classnames';
import validateProjectInput from '../../validations/project'; 
import moment from 'moment';
import DatePicker  from "react-bootstrap-date-picker"; 

if (process.env.BROWSER) {
  require('./style.css');
}

/*
	author: Anurag Krishna
*/

class ProjectCreateForm extends React.Component {

  constructor(props){

    super(props);
    this.state ={
      id: this.props.project ? this.props.project.id : '',
      title:this.props.project ? this.props.project.title : '',
      donor:this.props.project ? this.props.project.donor : '',
      status:this.props.project ? this.props.project.status: '',
      started_on:this.props.project ? this.props.project.started_on : new Date().toISOString(),
      errors:{},
      server_status:""
    }
  }

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

    handleDateChange = (value, formattedValue) => {
      this.setState({
        started_on:value
      });
    }

  checkProjectExists(e){
    const val = e.target.value;
    let invalid;
    if(val!==''){
      this.props.isProjectExists(val)
      .then(res => {
          let errors = this.state.errors;
          if(res.data.project) {
            errors.title = 'There is a user with such title';
            invalid=true; 
          }
          else{
            errors[name] = ''; 
            invalid=false;
          }
         this.setState({errors: errors, invalid:invalid});
      });
    }
  }

    isDataValid = () =>{

      const {errors, isValid} = validateProjectInput(this.state);
      if(!isValid){
        this.setState({errors:errors});
      }
      return isValid;
   }


   handleSubmit = (e) => {

    e.preventDefault();
    
    if(this.isDataValid()){
      const { id, title, donor, status, started_on } = this.state;
      this.props.saveProject({id, title, donor, status, started_on })
                 .then() ;
     } 
  };

  render() {

    const errors = this.state.errors;

     const statusOptions = map(status, (value,key) =>
        <option key={key} value={value}>{key}</option>
      );

    const form = (
              <div className="container col-xs-12 col-md-6 col-md-offset-3">
                <div className="jumbotron">
                  <form className={classnames({error:errors})} onSubmit={this.handleSubmit}>
                    <h3>{this.state.id ? "Edit Project" : "Add New Project"}</h3>

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

                          <div className={classnames("list-group", {error:errors.status})}>
                            <select
                              className="list-group-item"
                              value={this.state.status}
                              type="text"
                              name="status"
                              className="form-control"
                              onChange={this.onChange}
                               >
                              <option value="" disabled>Status</option>
                              {statusOptions}
                            </select>
                          </div>
                           

                      <div className={classnames("form-group", {'has-error':errors.started_on})}>
                        <label>Started On:</label>;
                        <DatePicker 
                          value={this.state.started_on}
                          name="started_on"
                          onChange={this.handleDateChange}
                          />
                          {errors.started_on && <div className="alert alert-danger" role="alert">
                                 <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
                                 <span className="sr-only alert alert-danger">Error:</span>
                                    {errors.started_on}
                                  </div>
                              }
                        </div>     

                      <div className="field">
                        <button className="btn btn-primary">Save</button>
                        <button className="btn btn-secondary" onClick={()=>browserHistory.push('/projects')}>Cancel</button>
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


ProjectCreateForm.contextTypes ={
  router: React.PropTypes.object.isRequired
}



export default ProjectCreateForm;