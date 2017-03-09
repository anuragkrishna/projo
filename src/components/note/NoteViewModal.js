/*jshint esversion: 6 */

import React from 'react';
import {Modal, Button} from 'react-bootstrap';
import './style.css';
import {Link} from 'react-router';

const NoteViewModal = ({note, showViewModal, closeViewModal}) => {
		let date = new Date(note.created_on);
	return(
				<Modal dialogClassName="view-modal" show={showViewModal} onHide={closeViewModal}>
		          <Modal.Header closeButton>
		            <Modal.Title><b>{note.title}</b></Modal.Title>
		            <small>{date.toLocaleDateString("en-US")} </small>	
		          </Modal.Header>
		          <Modal.Body>
	            		<div>{note.content}</div>
	          	  </Modal.Body>
		          <Modal.Footer>
		          	<Link  id="edit" to={`/note/${note.id}`}><Button bsStyle="primary">Edit</Button></Link>
		          </Modal.Footer>
        		</Modal>	
		);
}

export default NoteViewModal;