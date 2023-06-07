import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button';
import axios from 'axios';

function ShowAllStudents() {
  const [allMentors, setAllMentors]=useState([]);
  const [students, setStudents]=useState([]);
  useEffect(() => {
    axios.get('https://student-mentor-management-be.onrender.com')
        .then((response) => {
            setAllMentors(response.data.data)
        });
  }, [setAllMentors])
  
  const ShowStudents=()=>{
    const mentorSelect=document.getElementById('mentorSelect')
    const mentorSelectError=document.getElementById('mentorSelectError')

    if(mentorSelect.value==='choose'){
      mentorSelectError.innerText="Please select mentor"
    }
    else{
      mentorSelectError.innerText=""
      axios.get(`https://student-mentor-management-be.onrender.com/getAllStudents/${mentorSelect.value}`)
        .then((response) => {
          setStudents(response.data)
        });
    }
  }

  const mentorSelectValidate=()=>{
    const mentorSelect=document.getElementById('mentorSelect')
    const mentorSelectError=document.getElementById('mentorSelectError')

    if(mentorSelect.value!=='choose'){
      mentorSelectError.innerText=""
    }
  }
  
  return (
    <>
      <div className='d-grid justify-content-center' style={{marginTop:'80px'}}>
        <div>
          <h4 className='text-center'>Select Mentor</h4>
        </div>
        <div className=' mt-4'>
            <select className="form-select" id="mentorSelect" onChange={mentorSelectValidate}>
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
        <div className='text-center mt-4 mb-4'>
          <Button variant="contained" onClick={ShowStudents}>Show Students</Button>
        </div>
      </div>

      <div className=' d-flex justify-content-center'>
      <div className='col-4'>
        <table className="table">
          <thead>
            <tr>
              <th>Student Name</th>
              <th>Student Email Id</th>
            </tr>
          </thead>
          <tbody>
                {
                  students && students.map((e, i)=>{
                    return(
                      <tr key={i}>
                        <td>{e.studentName}</td>
                        <td>{e.studentEmailId}</td>
                      </tr>
                    )
                  }) 
                }
            
          </tbody>
        </table>
      </div>

      </div>

    </>
  )
}

export default ShowAllStudents