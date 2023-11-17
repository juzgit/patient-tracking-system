import React, {useEffect, useState} from "react";
import AdminSideBar from "../components/AdminSidebar";
import EditAppointmentDate from "../components/EditAppointment";
import DeleteAppointment from "../components/DeleteAppointment";

const AdminAppointmentList = () => {
    //will store the fetched appointments from the API.
    const [appointments, setAppointments] = useState([]);

    //will be responsible for fetching the appointments from the API.
    //the try-catch block to handle any errors that may occur during the fetch process.
        const fetchAppointments = async () => {
            try{
                const token = localStorage.getItem('adminToken');
                const response = await fetch(`/api/admin/appointments`, {
                    method: 'GET',
                    headers: {
                        'Content-Type':'application/json',
                        //the x-auth-token retrieved from the localStorage.
                        'x-auth-token': token,
                    },
                });

                if(response.ok){
                    const data = await response.json();
                    //store the appointments that are fetched
                    setAppointments(data);
                } else {
                    console.error('Failed to fetch appointments');
                }
            } catch (error){
                console.error('Error fetching appointments:', error);
            }
        };
    
    useEffect(() => {
        //call the fetchAppointments function when the component is mounted.
        fetchAppointments();
        //The empty dependency array [] ensures that the effect is only run once
    }, []);

    return(
        <div className="container-fluid">
            <div className="row">
            <div className="col-md-3">
                {/**the sidebar */}
                <AdminSideBar />
            </div>

            {/**Main part*/}
            <div className="col-md-8">
            <h2>Appointment List</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>Patient Name</th>
                        <th>Patient Surname</th>
                        <th>Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {appointments.map((appointment) => (
                        <tr key={appointment._id}>
                            <td>{appointment.patient.name}</td>
                            <td>{appointment.patient.surname}</td>
                            <td>{appointment.date}</td>
                            {/**Edit button and delete button*/}
                            <td>
                                <EditAppointmentDate
                                appointmentId={appointment._id}
                                onDateUpdated={fetchAppointments}
                                />

                                <DeleteAppointment
                                appointmentId={appointment._id}
                                onDelete={fetchAppointments}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>
        
        </div>
        </div>
        
    );
};

export default AdminAppointmentList;