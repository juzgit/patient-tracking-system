import React, {useEffect, useState} from "react";
import DoctorSidebar from "../components/DoctorSidebar";
import '../styling/DocAppointment.css';

const DoctorAppointmentList = () => {
    //used to store the weekly appointments data.
    const [weeklyAppointments, setWeeklyAppointments] = useState([]);

    useEffect(() => {
        const fetchWeeklyAppointments = async () => {
            try{
                //retrieve the authentication token from the local storage
                //pass the authentication token in the request headers to ensure that the request is authenticated.
                const token = localStorage.getItem('doctorToken');
                const response = await fetch('https://patient-tracking-system-api.onrender.com/api/appointment/weekly', {
                    method: 'GET',
                    headers:{
                        'Content-Type':'application/json',
                        'x-auth-token': token,
                    },
                });
                //If the response from the server is successful
                if(response.ok){
                    //parse the response body as JSON using response.json() and update the state variable weeklyAppointments using the setWeeklyAppointments function.
                    const data = await response.json();
                    setWeeklyAppointments(data);
                    //If the response is not successful, we log an error message to the console using console.error.
                } else {
                    console.error('Failed to fetch weekly appointments');
                }
                //If an error occurs during the fetch request or parsing of the response, log an error message to the console.
            }catch(error){
                console.error('Error fetching weekly appointments:', error);
            }
        };
        //call the fetchWeeklyAppointments function to fetch the weekly appointments when the component mounts.
        fetchWeeklyAppointments();
        //empty dependency array [] ensures that the effect is only run once
    }, []);

    return(
        <div className="container-fluid">
            <div className="row">
                
                <div className="col-md-2">
                    <DoctorSidebar />
                </div>

                {/**contains the main content of the page. */}
                <div className="col-md-10">
                <h2>Weekly Appointments</h2>
                {/**conditional rendering using the ternary operator. */}
                {/**If the length of weeklyAppointments is 0, it means there are no appointments for the current week */}
                {/**the text "No appointments for the current week" is rendered. */}
                {/**Otherwise, a table is rendered. */}
                {weeklyAppointments.length === 0 ? (
                <p>No appointments for the current week</p>
                ):(
                <table className="table">
                  <thead>
                    {/**single row with three table headers */}
                    <tr>
                        <th scope="col">Patient Name</th>
                        <th scope="col">Patient Surname</th>
                        <th scope="col">Date</th>
                    </tr>
                </thead> 
                <tbody>
                    {/**a mapping function that iterates over the weeklyAppointments array and renders a table row for each appointment. */}
                    {weeklyAppointments.map((appointment) => (
                        //display the patient's name, surname, and the formatted date of the appointment.
                        <tr key={appointment._id}>
                            <td>{appointment.patient.name}</td>
                            <td>{appointment.patient.surname}</td>
                            <td>{new Date(appointment.date).toLocaleDateString()}</td>
                        </tr>
                    ))}
                </tbody>
                </table>
                )}
                </div>
            </div>
        </div>
    )
};

export default DoctorAppointmentList;