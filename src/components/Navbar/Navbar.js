import React from 'react'

function Navbar() {
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
                                <a className="nav-link" href="/add-mentor">Add Mentor</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/add-student">Add Student</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/assign-student">Assign Student</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/change-mentor">Change Mentor</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/show-all-students">Show All Students of a Mentor</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar