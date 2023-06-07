import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

function AddStudent() {
  const [open, setOpen] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
    return;
    }
    setOpen(false);
};

const action = (
    <React.Fragment>
        <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
            <CloseIcon fontSize="small" />
        </IconButton>
    </React.Fragment>
);

  const studentNameValidate=()=>{
    const studentName=document.getElementById('studentName')
    const studentNameError=document.getElementById('studentNameError')
    if (studentName.value === '') {
      studentNameError.innerText = "Required"
    }
    else {
      studentNameError.innerText = ""   
    }
  }

  const studentEmailValidate=()=>{
    const studentEmailId=document.getElementById('studentEmailId')
    const studentEmailIdError=document.getElementById('studentEmailIdError')
    if (studentEmailId.value === '') {
      studentEmailIdError.innerText = "Required"
    }
    else {
      studentEmailIdError.innerText = ""
    }
  }

  const addstudent=()=>{
    const studentName=document.getElementById('studentName')
    const studentNameError=document.getElementById('studentNameError')
    const studentEmailId=document.getElementById('studentEmailId')
    const studentEmailIdError=document.getElementById('studentEmailIdError')
    const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/
    if (studentName.value === '') {
      studentNameError.innerText = "Required"
    }
    else {
        if (!isNaN(studentName.value)) {
            studentNameError.innerText = "Invalid"
        }
        else {
            studentNameError.innerText = ""
        }
    }
    if (studentEmailId.value === '') {
      studentEmailIdError.innerText = "Required"
    }
    else {
        if (studentEmailId.value.match(emailPattern)) {
          studentEmailIdError.innerText = ""
        }
        else {
          studentEmailIdError.innerText = "Invalid"

        }
    }
    if(studentNameError.innerText === "" && studentEmailIdError.innerText === ""){
      const studentData = {
        studentName: studentName.value,
        studentEmailId: studentEmailId.value,
        assignedMentor: ""
    }
    console.log(studentData);
    axios.post('https://student-mentor-management-be.onrender.com/createStudent', studentData)
        .then((response) => {
          setOpen(true)
        })
        .catch((error) => {
          console.error('Error : ', error);
      });
    }
  }
  return (
    <>
      <div className="col-4 container shadow rounded-3 position-absolute top-50 start-50 translate-middle">
          <div>
              <h4 className='text-center mt-3' style={{ fontFamily: 'Trebuchet MS', fontWeight: 'bold' }}>New Student</h4>
          </div>
          <div className='d-grid justify-content-center'>
              <div className=' mt-4'>
                  <TextField id="studentName" size="small" label="Student Name" variant="outlined" style={{ maxWidth: '120%' }} onKeyUp={studentNameValidate} /><br />
                  <span id='studentNameError' className='text-danger'></span>
              </div>
              <div className=' mt-4'>
                  <TextField id="studentEmailId" size="small" label="Email Id" variant="outlined" style={{ maxWidth: '120%' }} onKeyUp={studentEmailValidate} /><br />
                  <span id='studentEmailIdError' className='text-danger'></span>
              </div>
          </div>
          <div className='text-center mt-4 mb-4'>
              <Button variant="contained" onClick={addstudent}>Add student</Button>
          </div>
      </div>
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose} message="New Student Created" action={action}/>

    </>
  )
}

export default AddStudent