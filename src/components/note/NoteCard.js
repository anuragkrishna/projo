/*jshint esversion: 6 */

import React from 'react';
import {Link} from 'react-router';
import './style.css';
import {Modal, Button} from 'react-bootstrap';
import ConfirmModal from '../commons/ConfirmModal';
import NoteViewModal from './NoteViewModal';


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


			<NoteViewModal showViewModal={this.state.showViewModal} closeViewModal={this.closeViewModal} note={this.props.note} />	

			<ConfirmModal showConfirmModal={this.state.showConfirmModal} closeConfirmModal={this.closeConfirmModal} closeAndRemoveConfirmModal={this.closeAndRemoveConfirmModal} />	

			<div className="col-xs-12 col-sm-6 col-md-3 col-lg-2">
				<div className="card">
					<div className="list-group">
						<a href="" onClick={this.openViewModal}>
							<div className="note-card-content list-group-item">
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