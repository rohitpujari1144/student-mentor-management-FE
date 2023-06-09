import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button';
import axios from 'axios';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

function AssignStudent() {
  const [open, setOpen] = useState(false);
  const [allMentors, setAllMentors] = useState([]);
  const [allStudents, setAllStudents] = useState([]);

  useEffect(() => {
    axios.get('https://student-mentor-management-be.onrender.com')
      .then((response) => {
        setAllMentors(response.data.data)
      });

    axios.get('https://student-mentor-management-be.onrender.com/getAllStudents')
      .then((response) => {
        setAllStudents(response.data.data)
      });
  }, [setAllMentors, setAllStudents])

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

  const assignStudents = () => {
    const mentorSelect = document.getElementById('mentorSelect')
    const mentorSelectError = document.getElementById('mentorSelectError')
    const studentSelect = document.getElementById('studentSelect')
    const studentSelectError = document.getElementById('studentSelectError')
    if (mentorSelect.value === 'choose') {
      mentorSelectError.innerText = "Required"
    }
    else {
      mentorSelectError.innerText = ""
    }
    if (studentSelect.value === 'choose') {
      studentSelectError.innerText = "Required"
    }
    else {
      studentSelectError.innerText = ""
    }
    if (mentorSelectError.innerText === "" && studentSelectError.innerText === "") {
      const studentEmail = allStudents.filter((elem) => studentSelect.value === elem.studentName)
      const assignedMentor = {
        assignedMentor: mentorSelect.value
      }
      axios.put(`https://student-mentor-management-be.onrender.com/assignMentor/${studentEmail[0].studentEmailId}`, assignedMentor)
        .then((response) => {
          setOpen(true)
        });
    }
  }

  const mentorSelectValidate = () => {
    const mentorSelect = document.getElementById('mentorSelect')
    const mentorSelectError = document.getElementById('mentorSelectError')
    if (mentorSelect.value === 'choose') {
      mentorSelectError.innerText = "Required"
    }
    else {
      mentorSelectError.innerText = ""
    }
  }

  const studentSelectValidate = () => {
    const studentSelect = document.getElementById('studentSelect')
    const studentSelectError = document.getElementById('studentSelectError')
    if (studentSelect.value === 'choose') {
      studentSelectError.innerText = "Required"
    }
    else {
      studentSelectError.innerText = ""
    }
  }
  return (
    <>
      <div className='col-4 container shadow rounded-3 position-absolute top-50 start-50 translate-middle'>
        <div>
          <h4 className='text-center mt-3' style={{ fontFamily: 'Trebuchet MS', fontWeight: 'bold' }}>Assign Student</h4>
        </div>
        <div className='d-grid justify-content-center'>
          <div className=' mt-4' >
            <select className="form-select" id="mentorSelect" onChange={mentorSelectValidate}>
              <option value="choose">Select Mentor</option>
              {
                allMentors && allMentors.map((e, i) => {
                  return (
                    <option key={i} value={e.mentorName}>{e.mentorName}</option>
                  )
                })
              }
            </select>
            <span id='mentorSelectError' className='text-danger'></span>
          </div>
          <div className=' mt-4' >
            <select className="form-select" id="studentSelect" onChange={studentSelectValidate}>
              <option value="choose">Select Mentor</option>
              {
                allStudents && allStudents.map((e, i) => {
                  return (
                    <option key={i} value={e.studentName}>{e.studentName}</option>
                  )
                })
              }
            </select>
            <span id='studentSelectError' className='text-danger'></span>
          </div>
        </div>
        <div className='text-center mt-4 mb-4'>
          <Button variant="contained" onClick={assignStudents}>Assign Student</Button>
        </div>
      </div>
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose} message="Mentor Assigned Successfully" action={action}/>

    </>
  )
}

export default AssignStudent