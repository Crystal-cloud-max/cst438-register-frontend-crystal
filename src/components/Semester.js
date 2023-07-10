import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Radio from '@mui/material/Radio';
import {DataGrid} from '@mui/x-data-grid';
import {SEMESTER_LIST} from '../constants.js'
import AddStudent from './AddStudent';

// user selects from a list of  (year, semester) values
class Semester extends Component {
    constructor(props) {
      super(props);
      this.state = {selected: SEMESTER_LIST.length-1 };
    }
 
   onRadioClick = (event) => {
    console.log("Semester.onRadioClick "+JSON.stringify(event.target.value));
    this.setState({selected: event.target.value});
  }
  
  //displays cols in the DataGrid every row needs id col for each row
  //column header in fields, state for editable, state.selected is index of row selected
  //specify custom rendering by saying which HTML to display and is a lifecycle method
  render() {    
      const icolumns = [
      {
        field: 'id',
        headerName: 'Year',
        width: 200,
        renderCell: (params) => (
          <div>
            <Radio
              checked={params.row.id == this.state.selected}
              onChange={this.onRadioClick}
              value={params.row.id}
              color="default"
              size="small"
            />
            { SEMESTER_LIST[params.row.id].year }
          </div>
        )
      },
	  
      { field: 'name', headerName: 'Semester', width: 200 }
      ];       
       
    return (
       <div>
		
         <AppBar position="static" color="default">
		 
            <Toolbar>
               <Typography variant="h6" color="inherit">
                  Schedule - select a term
               </Typography>
            </Toolbar>
			
         </AppBar>
         <div align="left" >
		 
              <div style={{ height: 400, width: '100%', align:"left"   }}>  
				{/*has rows & columns are headings to display*/}
				{/*SEMESTER_LIST is from constants.js*/}
                <DataGrid   rows={SEMESTER_LIST} columns={icolumns} />
              </div>  
		
			  {/*button to get schedule pass to component schedule passing 2 properties & directs to SchedList component*/}
			  {/*two properties are year and name*/}
			  {/*state is index of row selected*/}
			  {/*SEMESTER_LIST is from constants.js*/}
              <Button component={Link} 
                      to={{pathname:'/schedule' , 
                      year:SEMESTER_LIST[this.state.selected].year, 
                      semester:SEMESTER_LIST[this.state.selected].name}} 
                variant="outlined" color="primary" style={{margin: 10}}>
                Get Schedule
              </Button>
			  
			  <AddStudent/>
			  
			  
          </div>
      </div>
    )
  }
}
export default Semester;