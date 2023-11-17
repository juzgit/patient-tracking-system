import React, {useState} from "react";

//responsible for updating the date of an appointment.
//appointmentId prop represents the ID of the appointment that needs to be updated
//onDateUpdated prop is a callback function that will be called after the date is successfully updated.
const EditAppointmentDate = ({ appointmentId, onDateUpdated }) => {
    //will hold the new date
    const [newDate, setNewDate] = useState('');

    const updateDate = async () => {
        try{
            //Get the admin token from local storage
            const token = localStorage.getItem('adminToken');
            const response = await fetch(`/api/appointment/${appointmentId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': token,
                },
                body: JSON.stringify({ date: newDate }),
            });
            //If the response is successful, display a success message and call the onDateUpdated function
            if(response.ok){
                alert('Appointment date updated successfully.');
                onDateUpdated();
            } else {
                //If the response is not successful, display an error message
                alert('Failed to update the appointment date');
            }
        } catch(error){
            //If there is an error, log it to the console
            console.error('Error updating appointment date:', error);
        }
    };

    return (
        <div>
            <label>New Date:</label>
            <input 
            type="date"
            value={newDate}
            onChange={(e) => setNewDate(e.target.value)}
            />
            <button onClick={updateDate}>Update Date</button> 
        </div>
    );
};

//exported to AdminAppointmentList.js
export default EditAppointmentDate;