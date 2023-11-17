import React, {useContext} from 'react';
import { Link } from 'react-router-dom';
import '../styling/DocSidebar.css';

const DoctorSidebar = () =>{
    
    return(
        <div className='sidebar'>
            <ul className='nav flex-column d-flex justify-content-between'>
                <li className='nav-item flex-fill'>
                    <Link to='/doctor-dashboard' className='btn btn-light'>Home</Link>
                </li>

                <li className='nav-item flex-fill'>
                    <Link to='/doctor-schedule' className='btn btn-light'>Appointments</Link>
                </li>

                <li className='nav-item flex-fill'>
                    <Link to='/' className='btn btn-light'>Sign out</Link>
                </li>
            </ul>
        </div>
    );
};

export default DoctorSidebar;