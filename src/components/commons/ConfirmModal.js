/*jshint esversion: 6 */

import React from 'react';
import {Modal, Button} from 'react-bootstrap';
import './style.css';

const ConfirmModal = ({showConfirmModal, closeConfirmModal,closeAndRemoveConfirmModal}) => {
	console.log(showConfirmModal);
	let showConfirmModal1=false;
	return(

				<Modal dialogClassName="custom-modal" show={showConfirmModal} onHide={closeConfirmModal}>
		          <Modal.Header closeButton>
		            <Modal.Title>Are you sure ?</Modal.Title>
		          </Modal.Header>
		          <Modal.Footer>
		            <Button bsStyle="primary" onClick={closeAndRemoveConfirmModal}>Yes</Button>	          
		            <Button bsStyle="default" onClick={closeConfirmModal}>No</Button>
		          </Modal.Footer>
        		</Modal>	
		);
}

export default ConfirmModal;