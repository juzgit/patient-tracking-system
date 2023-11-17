import React from "react";
import DoctorSidebar from "../components/DoctorSidebar";
import '../styling/DocHomepage.css'

const Dashboard = () => {
    {/**This is the doctors homepage */}
    return(
        <div className="container-fluid" id="doc-homepage">
            <div className="row">
                <div className="col-md-2">
                    <DoctorSidebar />
                </div>

                <div className="col-md-10">
                <h2>Welcome, Doctor</h2>
                <p>This is your dashboard. Use the sidebar to navigate and read your appointments for the week.</p>
                </div>

            </div>

        </div>
    );
};

export default Dashboard;