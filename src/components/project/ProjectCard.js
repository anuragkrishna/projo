/*jshint esversion: 6 */

import React from 'react';
import {Link} from 'react-router-dom';
import './style.css';
import {Modal, Button} from 'react-bootstrap';
import ConfirmModal from '../commons/ConfirmModal';

class ProjectCard extends React.Component{

	constructor(props){
		super(props);
		this.state = {
			showConfirmModal:false
		};
		this.closeConfirmModal=this.closeConfirmModal.bind(this);
		this.closeAndRemoveConfirmModal=this.closeAndRemoveConfirmModal.bind(this);
	}

	closeConfirmModal = (e) => {
  		e.preventDefault();
    	this.setState({ showConfirmModal: false });
  	};

  	closeAndRemoveConfirmModal = (e) => {
  		e.preventDefault();
    	this.setState({ showConfirmModal: false });
    	this.props.deleteProject(this.props.project.id);
  	};

  	openConfirmModal = (e) =>{
  		e.preventDefault();
    	this.setState({ showConfirmModal: true });
  	};


	render(){
		var project = this.props.project;
		var date = new Date(project.started_on);
		return (
				<div className="col-xs-12 col-sm-6 col-md-4 col-lg-3">
				<div className="card">
					<div className="list-group">
						<div className="card-content list-group-item">
							<div>	
								<h4><u>{project.title}</u></h4>
							</div>	
							<span>
								<label>Donor: </label>
								<label>{project.donor}</label>
							</span>
							<div>
							<span>
								<label>Started on: </label>
								<label>{date.toLocaleDateString("en-US")}</label>
							</span>
							</div>
							<div>
							<span>
								<label>Status: </label>
								<label>{project.status}</label>
							</span>
							</div>	
						</div>
			            <Link className="card-action list-group-item" id="edit" to={`/project/${project.id}`}><span className="glyphicon glyphicon-pencil"></span> Edit</Link>
			            <a className="card-action list-group-item" id="remove" href="" onClick={this.openConfirmModal}><span className="glyphicon glyphicon-remove"></span> Remove</a>
			        </div>    
				</div>	

				<ConfirmModal showConfirmModal={this.state.showConfirmModal} closeConfirmModal={this.closeConfirmModal} closeAndRemoveConfirmModal={this.closeAndRemoveConfirmModal} />
	
			</div>
		);
	}
}

export default ProjectCard;