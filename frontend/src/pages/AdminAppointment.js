import React, {useEffect, useState} from "react";
import AdminSideBar from "../components/AdminSidebar";
import '../styling/MakeAppointment.css';

const AppointmentForm = () => {
    //used to store and update the patient's name entered in the input field with the id "name".
    const [patientName, setPatientName] = useState('');
    //used to store and update the patient's surname entered in the input field with the id "surname".
    const [patientSurname, setPatientSurname] = useState('');
    //used to store and update the selected speciality from the dropdown menu with the id "speciality".
    const [selectedSpeciality, setSelectedtSpeciality] = useState('');
    //used to store and update the list of available specialities. 
    //The list is populated dynamically based on the data fetched from the server.
    const [specialties, setSpecialties] = useState([]);
    //used to store and update the list of available doctors. The list is populated dynamically based on the selected speciality.
    const [doctors, setDoctors] = useState([]);
    //sed to store and update the selected doctor from the dropdown menu with the id "doctor".
    const [selectedDoctor, setSelectedDoctor] = useState('');
    //state variables are used to store and update the selected appointment date entered in the input field with the id "date".
    const [date, setDate] = useState('');

    //fetch a list of specialities from the /api/service/specialities endpoint. 
    //The fetched data is then stored in the specialties state using the setSpecialties function. 
    //If there is an error during the fetch request, the error is logged to the console.
    useEffect(() => {
        fetch('/api/service/specialities')
        .then(response => response.json())
        .then(data => setSpecialties(data))
        .catch( error => console.error('Error fetching specialties:', error));
    }, []);

    //fetch a list of doctors based on the selected speciality.
    useEffect(() => {
        if(selectedSpeciality){
            //speciality is passed as a query parameter in the fetch URL.
            fetch(`/api/appointment/doctors?speciality=${selectedSpeciality}`,{
                headers: {
                    'Content-Type':'application/json',
                    'x-auth-token':localStorage.getItem('adminToken'),
                }
            })
            .then(response => response.json())
            //fetched data is then stored in the doctors state using the setDoctors function.
            .then(data => setDoctors(data))
            .catch(error => console.error('Error fetching doctors:', error));
        }
        //useEffect hook is triggered whenever the selectedSpeciality state changes.
    }, [selectedSpeciality]);

    //fetch the latest patient details from the /api/patients/latest endpoint.
    //fetched data is then used to set the patientName and patientSurname states.
    useEffect(()=> {
        fetch('/api/patients/latest', {
            headers: {
                'Content-Type':'application/json',
                'x-auth-token':localStorage.getItem('adminToken'),
            }
        })
        .then((response) => response.json())
        .then((data) => {
            if(data){
                setPatientName(data.name);
                setPatientSurname(data.surname);
            }
        })
        .catch((error) => console.error('Error fetching latest patient details:', error));
    }, []);

    //is triggered when a form is submitted.
    //makes a POST request to the /api/admin/appointment endpoint with the necessary headers and request body containing the patient details, selected doctor, and appointment date.
    //If the response is successful, an alert is shown indicating that the appointment was created successfully and the patient details, selected speciality, and selected doctor states are reset.
    //If the response is not successful, an alert is shown indicating that the appointment creation failed and the patient details, selected speciality, and selected doctor states are reset.
    const makeAppointment = async (e) => {
        e.preventDefault();

        try{
            const token = localStorage.getItem('adminToken');
            const response = await fetch('/api/admin/appointment',{
                method:'POST',
                headers: {
                    'Content-Type':'application/json',
                    'x-auth-token': token,
                },
                body: JSON.stringify({
                    patientName,
                    patientSurname,
                    doctorId: selectedDoctor,
                    date,
                }),
            });

            if(response.ok){
                alert('Appointment created successfully')
                setPatientName("");
                setPatientSurname("");
                setSelectedtSpeciality("");
                setSelectedDoctor("");
            } else {
                alert('Failed to create appointment');
                setPatientName("");
                setPatientSurname("");
                setSelectedtSpeciality("");
                setSelectedDoctor("");
            }
        } catch(error){
            console.error('Error creating appointment:', error);
        }
    };

    return(
        <div className="container-fluid">
            <div className="row">
                {/**AdminSide bar */}
                <div className="col-md-2">
                    <AdminSideBar />
                </div>

            {/**Main component */}
            <div className="col-md-8">
                <h2>Create Appointment</h2>
                <form onSubmit={makeAppointment}>

                {/**Patient name */}
                <div className="mb-4">
                    <label htmlFor="name" className="form-label">Patient Name</label>
                    <input
                    type="text"
                    className="form-control"
                    id="name"
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    required
                    />
                </div>
                
                {/**Patient Surname */}
                <div className="mb-4">
                    <label htmlFor="surname" className="form-label">Patient Surname</label>
                    <input
                    type="text"
                    className="form-control"
                    id="surname"
                    value={patientSurname}
                     onChange={(e) => setPatientSurname(e.target.value)}
                    required
                    />
                </div>    

                    {/**Select the type of service the patient wants */}
                    <div className="mb-4">
                        <label htmlFor="doctor" className="form-label">Select A Speciality</label>
                        
                        <select className="form-select cursor-pointer"
                        id="speciality"
                        value={selectedSpeciality}
                        onChange={(e) => setSelectedtSpeciality(e.target.value)}
                        required>
                        {specialties.map((speciality) => (
                            <option key={speciality._id} value={speciality._id}>
                                {speciality.name}
                            </option>
                        ))}
                        </select> 
                    </div>
                        
                    {/**Select one of the doctors that comes up */}
                   <div className="mb-4">
                     <label htmlFor="doctor" className="form-label">Select A Doctor</label>
                  <select
                   className="form-select cursor-pointer"
                   id="doctor"
                   value={selectedDoctor}
                   onChange={(e) => setSelectedDoctor(e.target.value)}
                   required
                   >
                   
                   {/* Options for doctors */}
                    <option value="" disabled>Select A Doctor</option>
                    {doctors.map((doctor) => (
                    <option key={doctor._id} value={doctor._id}>
                     {doctor.name} {doctor.surname}
                     </option>
                    ))}
                   </select>
                  </div>

                        {/**make an appointment date */}
                    <div className="mb-4">
                        <label htmlFor="date" className="form-label"> Appointment Date</label>
                        <input 
                        type="date"
                        className="form-control"
                        id="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                        />
                    </div>
                    {/**Create Appointment button */}
                    <button type="submit" className="btn btn-primary">Create Appointment</button>
                </form>
            </div>
        </div>
    </div>

    );
};

export default AppointmentForm;