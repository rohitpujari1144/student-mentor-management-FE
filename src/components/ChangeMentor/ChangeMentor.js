import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button';
import axios from 'axios';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

function ChangeMentor() {
  const [open, setOpen] = useState(false);
  const [allMentors, setAllMentors] = useState([]);
  const [allStudents, setAllStudents] = useState([]);

  useEffect(() => {
    axios.get('https://student-mentor-management-be.onrender.com')
      .then((response) => {
        setAllMentors(response.data.data)
      });

    axios.get('https://student-mentor-management-be.onrender.com/getStudents')
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

  const changeMentor=()=>{
    const studentSelect=document.getElementById('studentSelect')
    const mentorSelect=document.getElementById('mentorSelect')
    const newMentor={
      assignedMentor:mentorSelect.value
    }
    const studentEmail = allStudents.filter((elem) => studentSelect.value === elem.studentName)
    axios.put(`https://student-mentor-management-be.onrender.com/assignMentor/${studentEmail[0].studentEmailId}`, newMentor)
        .then((response) => {
          setOpen(true)
        });

  }
  return (
    <>
      <div className='col-4 container shadow rounded-3 position-absolute top-50 start-50 translate-middle'>
        <div>
          <h4 className='text-center mt-3' style={{fontFamily:'Trebuchet MS', fontWeight:'bold'}}>Change Mentor</h4>
        </div>
        <div className='d-grid justify-content-center'>
            <div className=' mt-4' >
              <select className="form-select" id="studentSelect" >
                  <option value="choose">Select Student</option>
                  {
                    allStudents && allStudents.map((e, i)=>{
                      return(
                        <option key={i} value={e.studentName}>{e.studentName}</option>
                      )
                    })
                  }
              </select>
              <span id='studentSelectError' className='text-danger'></span>
            </div>
            <div className=' mt-4' >
              <select className="form-select" id="mentorSelect" >
              <option value="choose">Select Mentor</option>
                  {
                    allMentors && allMentors.map((e, i)=>{
                      return(
                        <option key={i} value={e.mentorName}>{e.mentorName}</option>
                      )
                    })
                  }
              </select>
              <span id='mentorSelectError' className='text-danger'></span>
            </div>
        </div>
        <div className='text-center mt-4 mb-4'>
          <Button variant="contained" onClick={changeMentor}>Change Mentor</Button>
        </div>
      </div>
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose} message="Mentor Changed Successfully" action={action}/>
    </>
  )
}

export default ChangeMentor