import React from 'react';
import { Link } from 'react-router-dom';
import '../styling/AdminSidebar.css';

//sidebar for admins
const AdminSideBar = () => {
    return(
        <nav id='sidebar'>
            <div className='sidebar-header'>
                <h3>Admin Dashboard</h3>
            </div>

            <ul className='list-unstyled components'>
                <li>
                    <Link to='/admin-homepage' className='btn btn-light'>Home</Link>
                </li>

                <li>
                    <Link to='/admin-patientform' className='btn btn-light'>Add Patient</Link>
                </li>

                <li>
                    <Link to='/patient-list' className='btn btn-light'>Patient List</Link>
                </li>

                <li>
                    <Link to='/admin-appointment' className='btn btn-light'>Set Up An Appointment</Link>
                </li>

                <li>
                    <Link to='/appointment-list' className='btn btn-light'>Appointment List</Link>
                </li>

                <li>
                    <Link to='/' className='btn btn-light'>Sign Out</Link>
                </li>
            </ul>
        </nav>
    );
};

export default AdminSideBar;