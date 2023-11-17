import React from "react";

//This component is responsible for deleting an appointment
const DeleteAppointment = ({ appointmentId, onDelete }) => {

    //Function to remove the appointment
    const removeAppointment = async () => {
        try{
            //Get the admin token from local storage
            const token = localStorage.getItem('adminToken');
            //Send a DELETE request to the server to delete the appointment
            const response = await fetch(`/api/appointment/${appointmentId}`, {
                method: 'DELETE',
                headers: {
                    "Content-Type":'application/json',
                    'x-auth-token': token,
                },
            });

            //If the response is successful, display a success message and call the onDelete function
            if(response.ok){
                alert('Appointment deleted successfully');
                onDelete();
            } else {
                //If the response is not successful, display an error message
                alert('Failed to delete appointment');
            }
            //If there is an error, log it to the console
        } catch(error){
            console.error('Error deleting appointment:', error);
        }
    };

    return(
        <div>
            {/**when the button is clicked, the removeAppointment function is called. */}
            <button onClick={removeAppointment}>Delete</button>
        </div>
    );
};
//exported to AdminAppointmentList.js
export default DeleteAppointment;