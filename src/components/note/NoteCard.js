/*jshint esversion: 6 */

import React from 'react';
import {Link} from 'react-router';
import './style.css';
import {Modal, Button} from 'react-bootstrap';


export default class NoteCard extends React.Component{

	constructor(props){
		super(props);
		this.state = {
			showViewModal:false,
			showConfirmModal:false
		};
	}


  	closeViewModal = (e) => {
  		e.preventDefault();
    	this.setState({ showViewModal: false });
  	}

  	openViewModal = (e) =>{
  		e.preventDefault();
    	this.setState({ showViewModal: true });
  	};


  	closeConfirmModal = (e) => {
  		e.preventDefault();
    	this.setState({ showConfirmModal: false });
  	}

  	closeAndRemoveConfirmModal = (e) => {
  		e.preventDefault();
    	this.setState({ showConfirmModal: false });
    	this.props.deleteNote(this.props.note.id);
  	}

  	openConfirmModal = (e) =>{
  		e.preventDefault();
    	this.setState({ showConfirmModal: true });
  	}

  	render(){
  		let date = new Date(this.props.note.created_on);
	return (
			<div>

			<Modal show={this.state.showViewModal} onHide={this.closeViewModal}>
	          <Modal.Header closeButton>
	            <Modal.Title>{this.props.note.title}</Modal.Title>
	          </Modal.Header>
	          <Modal.Body>
	            <div>{this.props.note.content}</div>
	          </Modal.Body>
	          <Modal.Footer>
	          	<Link  id="edit" to={`/note/${this.props.note.id}`}><button className="btn btn-primary btn-spacing">Edit</button></Link>
	            <button className="btn btn-primary btn-spacing" onClick={this.closeViewModal}>Close</button>
	          </Modal.Footer>
        	</Modal>

        	<Modal show={this.state.showConfirmModal} onHide={this.closeConfirmModal}>
	          <Modal.Header closeButton>
	            <Modal.Title>Are you sure ?</Modal.Title>
	          </Modal.Header>
	          <Modal.Footer>
	            <button className="btn btn-primary btn-spacing" onClick={this.closeAndRemoveConfirmModal}>Yes</button>	          
	            <button className="btn btn-secondary btn-spacing" onClick={this.closeConfirmModal}>No</button>
	          </Modal.Footer>
        	</Modal>	

			<div className="col-xs-12 col-sm-6 col-md-3 col-lg-2">
				<div className="card">
					<div className="list-group">
						<a href="" onClick={this.openViewModal}>
							<div className="card-content list-group-item">
								<h4><u>{this.props.note.title}</u></h4>
								<small>{date.toLocaleDateString("en-US")} </small>
							</div>
						</a>
			            <a className="card-action list-group-item" id="remove" href="" onClick={this.openConfirmModal}><span className="glyphicon glyphicon-remove"></span> Remove</a>
			        </div>        
		        </div>	
			</div>
		</div>	
		);
}
}