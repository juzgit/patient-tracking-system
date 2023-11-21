import React from "react";
import '../styling/HomePage.css';
import { Link } from "react-router-dom";
//import HomepageContext from "../HomePageContext";

//The app's homepage
const HomePage = () => {
   // const { basename } = useContext(HomepageContext);

    return(
        <div className="homepage-container">
            <h1>Welcome to Medical Centre Pro</h1>

            <div className="services-description">
                <p>
                    At Medical Centre Pro, we are dedicated to providing comprehensive and compassionate healthcare services. Our team of experienced medical professionals specializes in three key areas:
                </p>

                <h2>General Practitioner Services:</h2>
                <p>
                    Receive personalized primary care from our skilled general practitioners, three of them. From routine check-ups to managing chronic conditions, we are here to support your overall well-being.
                </p>

                <h2>Dermatology Expertise:</h2>
                <p>
                    Our dermatologists, three of them, offer specialized care for your skin health. Whether it's skincare consultations, dermatological procedures, or addressing skin concerns, trust us for expert dermatological services.
                </p>

                <h2>Cardiology Excellence:</h2>
                <p>
                    Benefit from our cardiology services delivered by experienced cardiologists, three of them. We focus on heart health, offering diagnostics, preventive care, and management of cardiovascular conditions.
                </p>

                <p>
                    At Medical Centre Pro, we prioritize your health and strive to create a welcoming environment for every patient. Experience healthcare that prioritizes your unique needs.
                </p>
            </div>

        <div className="user-checks-timeslots">
            <li className="pages">
                <Link to='/user-register' className="page-link"><button className="pages-heading-user-btn">Check Appointment</button></Link>
                <p className="pages-subtext">
                    Click the button to view the appointments the doctors has within the next 7 days, by choosing the desired specialty, before making an appointment.
                </p>
            </li>
        </div>

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