import React, {useEffect, useState} from "react";
import AdminSideBar from "../components/AdminSidebar";
import '../styling/PatientList.css';

const PatientList = () => {
       //will be used to store the list of patients and the edited patient data, respectively.
        const [patients, setPatients] = useState([]);
        const [editedPatients, setEditedPatients] = useState({});
        
        //responsible for fetching the patients' data from the server. 
        //It makes a fetch request to the /api/admin/patients endpoint with the necessary headers, including the authentication token.
        //The response is then converted to JSON format and the data is set using the setPatients function.
        const fetchPatients = () => {
            fetch('https://patient-tracking-system-api.onrender.com/api/admin/patients', {
                headers:{
                    'Content-Type':'application/json',
                    'x-auth-token': localStorage.getItem('adminToken'),
                },
            })
            .then((response) => response.json())
            .then((data) => {
                console.log('Fetched Patients Data:', data);
                setPatients(data);
            })
            .catch((error) => console.error('Error fetching patients:', error));
          };
          //call the fetchPatients function when the component mounts.
        useEffect(() => {
            fetchPatients();
            //The empty dependency array [] ensures that the effect is only run once.
          }, []);

          //edit a patient's information.
          const Edit = (patientId) => {
            setEditedPatients((prevPatient) => ({
                ...prevPatient,
                [patientId]: true,
            }));
          };

          //when the admin wants to save the changes made to a patient's information.
          //takes the patientId as a parameter and retrieves the edited patient data from the editedPatients state.
          const saveChanges = (patientId) => {
            const editedPatient = editedPatients[patientId];

            //a PUT request to the /api/patients/${patientId} endpoint with the updated data.
            fetch(`https://patient-tracking-system-api.onrender.com/api/patients/${patientId}`, {
                method: "PUT",
                headers:{
                    'Content-Type': 'application/json',
                    'x-auth-token':localStorage.getItem('adminToken'),
                },
                body: JSON.stringify({
                    surname: editedPatient.surname,
                    phoneNumber: editedPatient.phoneNumber,
                }),
            })
            //After successfully updating the patient, an alert is shown and the editedPatients state is updated to false for that patient.
            .then((response) => response.json())
            .then((data) => {
                alert('Patient updated:', data);
                setEditedPatients((prevEditPatient) => ({
                    ...prevEditPatient,
                    [patientId]:false,
                }))
                //fetchPatients function is called to refresh the patients' data.
                fetchPatients();
            })
            .catch((error) => console.error('Error updating patient:', error));
          };
          //when the admin changes an input field for a patient's information. 
          //It takes the patientId, field, and value as parameters and updates the editedPatients state with the new field value for the specified patient.
          const InputChange = (patientId, field, value) => {
            setEditedPatients((prevEditPatient) => ({
                ...prevEditPatient,
                [patientId] : {
                    ...prevEditPatient[patientId],
                    [field]:value,
                }
            }));
          };

          //when the admin wants to delete a patient.
          //takes the patientId as a parameter and prompts the user with a confirmation dialog.
          //If the user confirms the deletion, a DELETE request is made to the /api/patients/${patientId} endpoint to delete the patient from the server.
          //After successful deletion, an alert is shown and the fetchPatients function is called to refresh the patients' data.
          const deletePatient = (patientId) => {
            if(window.confirm("Are you sure you want to delete this patient?")){
                fetch(`https://patient-tracking-system-api.onrender.com/api/patients/${patientId}`, {
                    method: "DELETE",
                    headers: {
                        'Content-Type': 'application/json',
                        'x-auth-token': localStorage.getItem('adminToken'),
                    },
                })
                .then((response) => response.json())
                .then((data) => {
                    alert('Patient deleted');
                    fetchPatients();
                })
                .catch((error) => console.error('Error deleting patient:', error));
            }
          };

    return(
        <div className="container-fluid">
            <div className="row">
                {/**renders the sidebar */}
                <div className="col-md-2">
                  <AdminSideBar />
                </div>

                {/**renders the main part */}
                <div className="col-md-10">
                <h2>Patient List</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Surname</th>
                        <th scope="col">Phone Number</th>
                        <th scope="col">Patient ID</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {patients.map((patient) => (
                        <tr key={patient._id}>
                            <td>{patient.name}</td>
                            <td>
                                {/**conditonal rendering */}
                                {/**when the edit button is clicked, you can...*/}
                                {/**edit the patient's surname */}
                            {editedPatients[patient._id] ? (
                                <input 
                                type="text"
                                value={editedPatients[patient._id]?.surname || patient.surname}
                                onChange={(e) => InputChange(patient._id, "surname", e.target.value) }
                                />
                            ): (
                                patient.surname
                            )}
                            </td>
                            <td>
                                {/**conditonal rendering */}
                                {/**when the edit button is clicked, you can...*/}
                                {/**edit the patient's phone number */}
                                {editedPatients[patient._id] ? (
                                    <input type="text"
                                    value={editedPatients[patient._id]?.phoneNumber || patient.phoneNumber }
                                    onChange={(e) => InputChange(patient._id, "phoneNumber", e.target.value)}
                                    />
                                ):(
                                    patient.phoneNumber
                                )}
                            </td>
                            <td>{patient._id}</td>
                            <td>
                                {/**conditonal rendering */}
                                {/**when the edit button is clicked, it will appear */}
                                {/**click to save the changes */}
                                {editedPatients[patient._id] ? (
                                    <button onClick={() => saveChanges(patient._id)}>Save</button>
                                ):(
                                    <>
                                    <button className="edit-btn" onClick={() => Edit(patient._id)}>Edit</button>

                                    <button className="delete-btn" onClick={() => deletePatient(patient._id)}>Delete</button>
                                    </>
 
                                )}
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

export default PatientList;