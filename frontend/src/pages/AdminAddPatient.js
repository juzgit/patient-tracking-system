import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminSideBar from "../components/AdminSidebar";
import '../styling/AddPatient.css';

//responsible for rendering a form to add a new patient.
const AddPatientForm = () => {
    // State variables to store the input values
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    
    const navigate = useNavigate();

    //an asynchronous function that handles the form submission.
    const Submit = async (e) => {
        e.preventDefault();

        try{
            //admin token here
            //Get the admin token from local storage
            const token = localStorage.getItem('adminToken');
            //send the POST request to the /api/admin/patients endpoint.
            const response = await fetch('https://patient-tracking-system-api.onrender.com/api/patients/add', {
                method:'POST',
                headers:{
                    'Content-Type':'application/json',
                    //included the admin token in the request headers
                    'x-auth-token': token,
                },
                //the patient data (name, surname, phoneNumber) in the request body as a JSON string.
                body: JSON.stringify({name, surname, phoneNumber}),
            });

            //display a success message using alert('Patient added successfully.'), navigate to the admin appointment page using navigate('/admin-appointment')
            if(response.ok){
                const data = await response.json();
                alert('Patient added successfully.');
                navigate('/admin-appointment');
                console.log('Server response:', data);
            } else {
                alert('Failed to add patient.');
            }
            //catch the error and log it to the console
        } catch(error){
            console.error('Client error:', error.message);
        }
    };


    //represents the form
    //The form has input fields for name, surname, and phone number. 
    //The values of these fields are controlled by the state variables name, surname, and phoneNumber, respectively. 
    //The onChange event handlers update the state variables as the user types in the input fields.
    return(
        <div className="container-fluid">
        
            <div className="row">
                <div className="col-md-3">
                    <AdminSideBar />
                </div>
                    
                    <div className="col-md-6">
                        <h2>Add A Patient</h2>
                        <form onSubmit={Submit}>
                        <div className="mb-4">
                            <label htmlFor="name" className="form-label">Name</label>
                            <input
                            type="text"
                            className="form-control"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="surname" className="form-label">Surname</label>
                            <input
                            type="text"
                            className="form-control"
                            id="surname"
                            value={surname}
                            onChange={(e) => setSurname(e.target.value)}
                            required
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="surnname" className="form-label">Phone Number</label>
                            <input
                            type="text"
                            className="form-control"
                            id="phoneNumber"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            required
                            />
                        </div>

                        <button type="submit" className="btn btn-primary">Add Patient</button>
                        </form>
                    </div>
                </div>
        </div>
    );
};

export default AddPatientForm;