import React, {useContext} from "react";
import '../styling/HomePage.css';
import { Link } from "react-router-dom";
import HomepageContext from "../HomePageContext";

//The app's homepage
const HomePage = () => {
    const { basename } = useContext(HomepageContext);

    return(
        <div className="homepage-container">
            <h1>Home Page</h1>
            <p>Welcome to the Patient Tracking System.</p>

        <div className="admin-register">
            <li className="pages">
                <Link to='/admin-register' className="page-link"><button className="pages-heading-admin-signup">Admin Register Page</button></Link>
                <p className="pages-subtext">
                    Register as an admin and get access to creating appointments/patient, <span className="block">updating appointments/patients information and deleting appointments/patients from the database.</span>   
                </p>
            </li>
        </div>

        <div className="admin-login">
            <li className="pages">
                <Link to='/admin-login' className="page-link"><button className="pages-heading-admin-login">Admin Login Page</button></Link>
                <p className="pages-subtext">Login as in as an admin to perform CRUD operations</p>
            </li>
        </div>

        <div className="doctor-signup">
            <li className="pages">
               <Link to='/doctor-signup' className="page-link"><button className="pages-heading-doc-signup">Doctor Sign Up</button></Link>
               <p className="pages-subtext">Register as a doctor to see your appointments for the week.</p>
            </li>
        </div>

        <div className="doctor-login">
            <li className="pages">
                <Link to='/doctor-login' className="page-link"><button className="pages-heading-doc-login">Doctor Login</button></Link>
                <p className="pages-subtext">Login as a doctor to see your appointments for the week.</p>
            </li>
        </div>


        </div>
    );
};

export default HomePage;