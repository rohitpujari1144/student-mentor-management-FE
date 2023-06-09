import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

function AddMentor() {
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

    const mentorNameValidate = () => {
        const mentorName = document.getElementById('mentorName')
        const mentorNameError = document.getElementById('mentorNameError')
        if (mentorName.value === '') {
            mentorNameError.innerText = "Required"
        }
        else {
            mentorNameError.innerText = ""
        }
    }

    const mentorEmailValidate = () => {
        const mentorEmailId = document.getElementById('mentorEmailId')
        const mentorEmailIdError = document.getElementById('mentorEmailIdError')
        if (mentorEmailId.value === '') {
            mentorEmailIdError.innerText = "Required"
        }
        else {
            mentorEmailIdError.innerText = ""
        }
    }

    const mentorSpecializationValidate = () => {
        const mentorSpecialization = document.getElementById('mentorSpecialization')
        const mentorSpecializationError = document.getElementById('mentorSpecializationError')
        if (mentorSpecialization.value === 'choose') {
            mentorSpecializationError.innerText = "Required"
        }
        else {
            mentorSpecializationError.innerText = ""
        }
    }

    const addMentor = () => {
        const mentorName = document.getElementById('mentorName')
        const mentorNameError = document.getElementById('mentorNameError')
        const mentorEmailId = document.getElementById('mentorEmailId')
        const mentorEmailIdError = document.getElementById('mentorEmailIdError')
        const mentorSpecialization = document.getElementById('mentorSpecialization')
        const mentorSpecializationError = document.getElementById('mentorSpecializationError')
        const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/
        if (mentorName.value === '') {
            mentorNameError.innerText = "Required"
        }
        else {
            if (!isNaN(mentorName.value)) {
                mentorNameError.innerText = "Invalid"
            }
            else {
                mentorNameError.innerText = ""
            }
        }
        if (mentorEmailId.value === '') {
            mentorEmailIdError.innerText = "Required"
        }
        else {
            if (mentorEmailId.value.match(emailPattern)) {
                mentorEmailIdError.innerText = ""
            }
            else {
                mentorEmailIdError.innerText = "Invalid"

            }
        }
        if (mentorSpecialization.value === 'choose') {
            mentorSpecializationError.innerText = "Required"
        }
        else {
            mentorSpecializationError.innerText = ""
        }
        if (mentorNameError.innerText === "" && mentorEmailIdError.innerText === "" && mentorSpecializationError.innerText === "") {
            const mentorData = {
                mentorName: mentorName.value,
                mentorEmailId: mentorEmailId.value,
                mentorSpecialization: mentorSpecialization.value
            }
            axios.post('https://student-mentor-management-be.onrender.com/createMentor', mentorData)
                .then((response) => {
                    setOpen(true)
                    mentorName.value=""
                    mentorEmailId.value=""
                    mentorSpecialization.value= 'choose'
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
                    <h4 className='text-center mt-3' style={{ fontFamily: 'Trebuchet MS', fontWeight: 'bold' }}>New Mentor</h4>
                </div>
                <div className='d-grid justify-content-center'>
                    <div className=' mt-4'>
                        <TextField id="mentorName" size="small" label="Mentor Name" variant="outlined" style={{ maxWidth: '120%' }} onKeyUp={mentorNameValidate} /><br />
                        <span id='mentorNameError' className='text-danger'></span>
                    </div>
                    <div className=' mt-4'>
                        <TextField id="mentorEmailId" size="small" label="Email Id" variant="outlined" style={{ maxWidth: '120%' }} onKeyUp={mentorEmailValidate} /><br />
                        <span id='mentorEmailIdError' className='text-danger'></span>
                    </div>
                    <div className=' mt-4' style={{ maxWidth: '225px' }}>
                        <select className="form-select" id="mentorSpecialization" onChange={mentorSpecializationValidate}>
                            <option value="choose">Mentor Specialization</option>
                            <option value="Full Stack Development">Full Stack Development</option>
                            <option value="Frontend Development">Frontend Development</option>
                            <option value="Backend Development">Backend Development</option>
                        </select>
                        <span id='mentorSpecializationError' className='text-danger'></span>
                    </div>
                </div>
                <div className='text-center mt-4 mb-4'>
                    <Button variant="contained" onClick={addMentor}>Add Mentor</Button>
                </div>
            </div>
            <Snackbar open={open} autoHideDuration={3000} onClose={handleClose} message="New Mentor Created" action={action}/>
        </>
    )
}

export default AddMentor