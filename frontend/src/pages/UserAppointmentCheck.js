import React, {useState, useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import '../styling/UserAppointmentCheck.css'

//this is the page, where normal end users can appointments of each doctor based on the selected specialty
const UserAppointmentCheck = () => {
    const [specialities, setSpecialities] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const [selectedSpeciality, setSelectedSpeciality] = useState('');
    const [selectedDoctor, setSelectedDoctor] = useState('');
    const [appointments, setAppointments] = useState([]);

   const navigate = useNavigate();
  
   //responsible for fetching the list of specialities from the '/api/service/specialities' endpoint.
   //uses the fetch function to make a GET request and retrieves the response in JSON format. 
   //The retrieved data is then set using the setSpecialities function.

    useEffect(() => {
      fetch('https://patient-tracking-system-api.onrender.com/api/service/specialities')
        .then(response => response.json())
        .then(data => setSpecialities(data))
        .catch(error => console.error('Error fetching specialities:', error));
    }, []);
  
    //triggered whenever the selectedSpeciality value changes.
    //fetches the list of doctors based on the selected speciality from the '/user/doctors/{selectedSpeciality}' endpoint.
    //The fetch request is only made if there is a selectedSpeciality value.
    useEffect(() => {
      if (selectedSpeciality) {
        fetch(`https://patient-tracking-system-api.onrender.com/user/doctors/${selectedSpeciality}`)
          .then(response => response.json())
          .then(data => setDoctors(data))
          .catch(error => console.error('Error fetching doctors:', error));
      }
    }, [selectedSpeciality]);
  
    //triggered whenever the selectedDoctor value changes.
    //fetches the weekly appointments for the selected doctor from the '/user/appointments/{selectedDoctor}/weekly' endpoint.
    //The fetch request is only made if there is a selectedDoctor value.
    useEffect(() => {
      if (selectedDoctor) {
        fetch(`https://patient-tracking-system-api.onrender.com/user/appointments/${selectedDoctor}/weekly`)
          .then(response => response.json())
          .then(data => setAppointments(data))
          .catch(error => console.error('Error fetching appointments:', error));
      }
    }, [selectedDoctor]);

    //responsible for logging out the user.
    //removes the 'userToken' from the localStorage and navigates the user to the home page.
    const Logout = async () => {
        try{
            localStorage.removeItem('userToken');
            navigate('/');
        }catch(error){
            console.error('Error logging out:', error);
        }
    }
  
    return (
        <div id="check-appointments">
              <div className="container mt-5">
                <h1>Check Doctor's Current Weeek Appointments</h1>

                {/**This paragraph provides a brief description of the purpose of the page */}
                <p>On this page, you can check the doctors schedule for the next 7 days before you make an appointment</p>
                <div className="row">
                <div className="col-md-4">
                    <label>Select Speciality:</label>
                    <select className="form-select" onChange={(e) => setSelectedSpeciality(e.target.value)}>
                    {/**This dropdown allows the user to select a speciality */}
                    <option value="">Select</option>
                    {specialities.map((speciality) => (
                        <option key={speciality._id} value={speciality._id}>
                        {speciality.name}
                        </option>
                    ))}
                    </select>
                </div>
                
                {/** This dropdown allows the user to select a doctor */}
                {selectedSpeciality && (
                    <div className="col-md-4">
                    <label>Select Doctor:</label>
                    <select className="form-select" onChange={(e) => setSelectedDoctor(e.target.value)}>
                        <option value="">Select</option>
                        {doctors.map((doctor) => (
                        <option key={doctor._id} value={doctor._id}>
                            {doctor.name} {doctor.surname}
                        </option>
                        ))}
                    </select>
                    </div>
                )}
                </div>

                {selectedDoctor && (
                <div className="mt-4">
                    {/**  This heading displays the name of the selected doctor */}
                    <h2>Weekly Appointments for Dr. {doctors.find((doctor) => doctor._id === selectedDoctor)?.name} {doctors.find((doctor) => doctor._id === selectedDoctor)?.surname}</h2>

                    {appointments.length > 0 ? (
                        <table className="table">
                        <thead>
                        <tr>
                            <th>Date</th>
                            <th>Time</th>
                        </tr>
                        </thead>
                        <tbody>
                        {appointments.map((appointment) => (
                            <tr key={appointment._id}>
                                {/**  This column displays the date of each appointment */}
                            <td>{new Date(appointment.date).toLocaleDateString()}</td>
                            {/**This column displays the time of each appointment */}
                            <td>{appointment.time}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    ): (
                        <p>No appointments for the week.</p>
                    )}
                    
                </div>
                )}


                <div className='appointment-btns'>
                    {/**This button allows the user to logout */}
                    <button onClick={Logout} className="user-appointment-btn">Logout</button>
                    {/**This button allows the user to make an appointment */}
                    <button className="user-appointment-btn"><Link to='/admin-login' className="user-admin-btn">Make an appointment</Link></button>
                </div>
                </div>
    </div>

    );
};

export default UserAppointmentCheck;