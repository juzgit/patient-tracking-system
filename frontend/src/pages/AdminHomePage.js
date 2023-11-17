import React from "react";
import AdminSideBar from "../components/AdminSidebar";

//The admin's homepage
//explains to them their role
const AdminHomePage = () => {
    return(
        <div className="container-fluid">
            <div className="row">
                <nav className="col-md-2 d-none d-md-block sidebar">
                 <AdminSideBar />
                </nav>

                <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-md-4">
                    <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                        <h1 className="h2">Admin Dashboard</h1>
                    </div>

                    <div className="jumotron">
                        <h1 className="display-4">Welcome, Admin!!!</h1>
                        <p className="lead">
                        This is your admin dashboard where you can manage patients and create appointments.
                        </p>
                        <hr className="my-4" />
                        <p>
                        Learn more about the available actions in the sidebar or navigate to Patient List and Add Patient pages.
                        </p>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AdminHomePage;