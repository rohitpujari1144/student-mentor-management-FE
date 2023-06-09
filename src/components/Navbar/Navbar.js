import React from 'react'
import './/navbar.css'
import { useNavigate } from 'react-router-dom'


function Navbar() {
    let navigate = useNavigate()
    return (
        <>
            <nav className="navbar navbar-expand-lg bg-light shadow">
                <div className="container-fluid">
                    <a className="navbar-brand" style={{letterSpacing:'2px'}} href='/'>Student Mentor Management</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <span className="nav-link navbarItems" onClick={() => { navigate('/add-mentor') }}>Add Mentor</span>
                            </li>
                            <li className="nav-item">
                                <span className="nav-link navbarItems" onClick={() => { navigate('/add-student') }}>Add Student</span>
                            </li>
                            <li className="nav-item">
                                <span className="nav-link navbarItems" onClick={() => { navigate('/assign-student') }}>Assign Student</span>
                            </li>
                            <li className="nav-item">
                                <span className="nav-link navbarItems" onClick={() => { navigate('/change-mentor') }}>Change Mentor</span>
                            </li>
                            <li className="nav-item">
                                <span className="nav-link navbarItems" onClick={() => { navigate('/show-all-students') }}>Show All Students of a Mentor</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar