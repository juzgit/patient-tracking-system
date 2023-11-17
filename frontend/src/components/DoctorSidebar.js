import React, {useContext} from 'react';
import { Link } from 'react-router-dom';
import '../styling/DocSidebar.css';
import HomepageContext from "../HomePageContext";

const DoctorSidebar = () =>{
    const { basename } = useContext(HomepageContext);
    
    return(
        <div className='sidebar'>
            <ul className='nav flex-column d-flex justify-content-between'>
                <li className='nav-item flex-fill'>
                    <Link to={`${basename}/doctor-dashboard`} className='btn btn-light'>Home</Link>
                </li>

                <li className='nav-item flex-fill'>
                    <Link to={`${basename}/doctor-schedule`} className='btn btn-light'>Appointments</Link>
                </li>

                <li className='nav-item flex-fill'>
                    <Link to={`${basename}/`} className='btn btn-light'>Sign out</Link>
                </li>
            </ul>
        </div>
    );
};

export default DoctorSidebar;