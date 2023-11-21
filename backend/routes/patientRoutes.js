const express = require('express');
const router = express.Router();
const Patient = require('../models/PatientModel');
const adminAllowed = require('../middleware/adminMiddleware');
//exported to the admin routes file
//This route handles the addition of new patients.
//requires to have admin privileges (adminAllowed middleware).
router.post('/', adminAllowed, async (req, res) => {
    try{
        //The request body should contain the patient's name, surname, and phoneNumber.
        const {  name, surname ,phoneNumber} = req.body;
        //The code checks if a patient with the same name and surname already exists in the database.
        const existingPatient = await Patient.findOne({ name, surname});
        //If so, it returns a 400 status code with a message indicating that the patient already exists.
        if(existingPatient){
            return res.status(400).json({ message: 'Patient already exists' });
        }
        //If not, it creates a new Patient object with the provided information, 
        //saves it to the database, and returns a 201 status code with a success message and the ID of the newly created patient.
        const newPatient = new Patient({ name, surname, phoneNumber});
        await newPatient.save();
        res.status(201).json({ message: 'Patient added successfully', patientId: newPatient._id});
    } catch (error){
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

//exported to the admin routes file
//This route handles the retrieval of a list of all patients.
router.get('/', adminAllowed, async (req, res) => {
    try{
        //The code retrieves all the patients from the database using the Patient.find() method 
        //and returns the list of patients as a JSON response.
        const patients = await Patient.find();
        res.json(patients);
    } catch(error){
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error'});
    }
});

// Get details of the latest added patient
// Making an appointment
router.get('/latest', adminAllowed, async (req, res) => {
    try {
        //The code uses the Patient.findOne().sort({ createdAt: -1 }) query to find the patient with the latest creation timestamp.
        const latestPatient = await Patient.findOne().sort({ createdAt: -1 });
        //it returns the details of the latest patient as a JSON response.
        res.json(latestPatient);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

//route handles the update of patient information.
//must have admin privileges
router.put('/:patientId', adminAllowed, async (req, res) => {
    //update surname and phone number
    const { surname, phoneNumber} = req.body;
    try{
        //
        const patientId = req.params.patientId;
        //retrieves the patient with the specified ID using Patient.findById(patientId).
        const patient = await Patient.findById(patientId);

        //If the patient does not exist, it returns a 404 status code with a message indicating that the patient was not found.
        if(!patient){
            return res.status(404).json({ message: 'Patient not found'});
        }

        //If the patient exists, it updates the surname and phoneNumber properties of the patient object with the values from the request body.
        patient.surname = surname || patient.surname;
        patient.phoneNumber = phoneNumber || patient.phoneNumber;

        //The updated patient object is then saved to the database, and a 200 status code is returned with a success message and the updated patient object.
        await patient.save();
        res.status(200).json({ message: 'Patient information updated successfully', patient});
    } catch(error){
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error'});
    }
});

//This route handles the deletion of a patient.
//admin privileges
router.delete('/:patientId', adminAllowed, async (req, res) => {
    try{
        const patientId = req.params.patientId;

        //retrieves the patient with the specified ID using Patient.findById(patientId).
        const patient = await Patient.findById(patientId);

        //If the patient does not exist, it returns a 404 status code with a message indicating that the patient was not found.
        if(!patient){
            return res.status(404).json({ message: 'Patient not found'});
        }

        //If the patient exists, it deletes the patient from the database using Patient.findByIdAndDelete(patientId).
        await Patient.findByIdAndDelete(patientId);

        //it returns a 200 status code with a success message indicating that the patient was deleted successfully.
        res.status(200).json({ message: 'Patient deleted successfully'});
    }catch(error){
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error'});
    }
});

//to server.js
module.exports = router;