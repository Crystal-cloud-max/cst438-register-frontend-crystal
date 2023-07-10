import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import {SERVER_URL} from '../constants.js'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie';

// properties addStudent red, function called when Add clicked.
class AddStudent extends Component {
      constructor(props) {
	  //initializing component state
      super(props);
      this.state = {open: false, name:'', email:'', status_code:0 };
    };
	
    //Functions for when add button is clicked opens the modal form to enter id
    handleClickOpen = () => {
      this.setState( {open:true} );
    };
	
	//Function to close modal form
    handleClose = () => {
      this.setState( {open:false} );
    };
	
	//Function to handle input field change
    handleChange = (event) => {
	//name value entered by user
      //this.setState({[event.target.name]: event.target.value});
	  this.setState({student:{name: event.target.value}});
	   this.setState({student:{email: event.target.value}});
    }

    //Function to add a student and close modal form
    handleAdd = () => {
		//call method when complete and close
       this.newStudent({name: this.state.name, email:this.state.email});
       this.handleClose();
    }
	
	 newStudent = (student) => {
      // API call to add a new student
      fetch(`${SERVER_URL}/student/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(student)
      })
        .then((res) => {
          if (res.ok) {
            // Display success toast notification
            toast.success('A new student added successfully.', {
              position: toast.POSITION.BOTTOM_LEFT
            });
          } else {
            // Display error toast notification
            toast.error('Error to add.', {
              position: toast.POSITION.BOTTOM_LEFT
            });
            console.error('Post http status =' + res.status);
          }
        })
        .catch((err) => {
          // Display error toast notification
		  if (err.message === '0'){
			  console.err('Error: Network failure or CORS issue');
		  }
          toast.error('Error to add.', {
            position: toast.POSITION.BOTTOM_LEFT
          });
          console.error(err);
        });
    };
	
	 render() {
    return (
      <div>
        {/* Button to open the dialog */}
        <Button variant="outlined" color="primary" style={{ margin: 10 }} onClick={this.handleClickOpen}>
          Add New Student
        </Button>
        {/* Dialog for adding a student */}
        <Dialog open={this.state.open} onClose={this.handleClose}>
		
          <DialogTitle>Add New Student</DialogTitle>
		  
          <DialogContent style={{ paddingTop: 20 }}>
            {/* Text field for entering the name */}
            <TextField autoFocus fullWidth label="Name" name="name" onChange={this.handleChange} />
          </DialogContent>
		  
          <DialogContent style={{ paddingTop: 20 }}>
            {/* Text field for entering the email */}
            <TextField autoFocus fullWidth label="E-mail" name="email" onChange={this.handleChange} />
          </DialogContent>
		  
          <DialogActions>
		  
            {/* Button to cancel adding a student */}
            <Button color="secondary" onClick={this.handleClose}>
              Cancel
            </Button>
			
            {/* Button to add a new student */}
            <Button id="add" color="primary" onClick={this.handleAdd}>
              Add New
            </Button>
			
          </DialogActions>
		  
        </Dialog>
        {/* Toast container for displaying notifications */}
        <ToastContainer autoClose={1500} />
      </div>
    );
  }
}

// required property:  function to call to perform the Add action
AddStudent.propTypes = {
  newStudent : PropTypes.func.isRequired
}


export default AddStudent;