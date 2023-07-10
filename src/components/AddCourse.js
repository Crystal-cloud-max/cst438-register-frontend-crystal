import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';


// properties addCoure is required, function called when Add clicked.
class AddCourse extends Component {
      constructor(props) {
      super(props);
      this.state = {open: false, course:{ } };
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
	  //id value entered by user
      this.setState({course:{course_id: event.target.value}});
    }

    //Function to add a course and close modal form
    handleAdd = () => {
		//call method when complete and close
       this.props.addCourse(this.state.course);
       this.handleClose();
    }
	
	//display the modal form to enter course id, cancel, or add buttons
    render()  { 
      return (
          <div>
		  
			{/*button to open the dialog*/}
            <Button variant="outlined" color="primary" style={{margin: 10}} onClick={this.handleClickOpen}>
              Add Course
            </Button>
			
			{/*dialog component*/}
            <Dialog open={this.state.open} onClose={this.handleClose}>
			
                <DialogTitle>Add Course</DialogTitle>
				
                <DialogContent  style={{paddingTop: 20}} >
				  {/*text field to enter id*/}
                  <TextField autoFocus fullWidth label="Course Id" name="course_id" onChange={this.handleChange}  /> 
                </DialogContent>
				
				{/*dialog contains button actions to cancel or add*/}
                <DialogActions>
                  <Button color="secondary" onClick={this.handleClose}>Cancel</Button>
                  <Button id="Add" color="primary" onClick={this.handleAdd}>Add</Button>
                </DialogActions>
				
              </Dialog> 
			  
          </div>
      ); 
    }
}

// required property:  addCourse is a function to call to perform the Add action
AddCourse.propTypes = {
  addCourse : PropTypes.func.isRequired
}

export default AddCourse;