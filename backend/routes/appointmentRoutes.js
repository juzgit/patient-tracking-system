const express = require('express');
const router = express.Router();
const moment = require('moment');
const Appointment = require('../models/AppointmentModel');
const Doctor = require('../models/DoctorModel');
const Patient = require('../models/PatientModel');
const adminAllowed = require('../middleware/adminMiddleware');
const doctorAllowed = require('../middleware/doctorMiddleware');

// Route to create an appointment
//exported to the admin routes file

//This route handles the creation of a new appointment.
router.post('/', adminAllowed, async (req, res) => {
  //expects the doctorId, patientName, patientSurname, and date to be provided in the request body.
    const { doctorId, patientName, patientSurname, date } = req.body;
  
    try {
      // Validate doctor IDs
      const doctor = await Doctor.findById(doctorId);
  
      //If the doctor is not found, it returns a 400 status code with an error message.
      if (!doctor) {
        return res.status(400).json({ message: 'Invalid doctor or patient ID' });
      }
  
      // Create a new appointment
      const newAppointment = new Appointment({
        doctorId,
        patient: { name: patientName, surname: patientSurname },
        date,
      });
  
      //save to the database.
      await newAppointment.save();
      //if the appointment is successfully created, a 201 status code is returned with a success message and the ID of the newly created appointment.
      res.status(201).json({ message: 'Appointment created successfully.', appointmentId: newAppointment._id });
      //any errors will be handled here
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

//This route retrieves a list of doctors based on the provided speciality query parameter.
router.get('/doctors', adminAllowed, async (req, res) => {
    const { speciality } = req.query;
    console.log('Speciality:', speciality);
  
    try {
      //use the Doctor model to find all doctors with the specified ChosenSpecialityId.
      const doctors = await Doctor.find({ ChosenSpecialityId: speciality });
      //If the retrieval is successful, the list of doctors is returned as a JSON response.
      res.json(doctors);
    } catch (error) {
      console.error('Error fetching doctors:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

//get all the appointments for the admin
router.get('/', adminAllowed, async(req, res) => {
    try{
      //use the Appointment model to find all appointments in the database.
        const appointments = await Appointment.find()
        //populates the patient field with the name and surname of the patient.
        .populate('patient', 'name surname')
        //appointments are sorted in ascending order based on the date field.
        .sort({ date: 'asc' });
      //if the retrieval is successful, the list of appointments is returned as a JSON response.
        res.json(appointments)
    } catch(error){
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error'});
    }
});

//updates the date of an appointment.
router.put('/:appointmentId', adminAllowed, async (req, res) => {
  try{
    //expects the appointmentId to be provided as a URL parameter and the new date to be provided in the request body.
    const appointmentId = req.params.appointmentId;
    const { date } = req.body;

    //retrieves the appointment with the specified ID using the Appointment model.
    const  appointment = await Appointment.findById(appointmentId);

    //If the appointment is not found, a 404 status code is returned with an error message.
    if(!appointment){
      return res.status(404).json({  message: 'Appointment not found'});
    }

    //If the appointment is found, the date field of the appointment is updated with the new date and saved to the database.
    appointment.date = date;

    //If the update is successful, a 200 status code is returned with a success message.
    await appointment.save();

    //If the update is successful, a 200 status code is returned with a success message.
    res.status(200).json({ message: 'Appointment date updated successfully'});
  } catch(error){
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

//This route deletes an appointment.
router.delete('/:appointmentId', adminAllowed, async(req, res) => {
  try{
    const appointmentId = req.params.appointmentId;

    //retrieves the appointment with the specified ID using the Appointment model.
    const appointment = await Appointment.findById(appointmentId);

    //If the appointment is not found, a 404 status code is returned with an error message.
    if(!appointment){
      return res.status(404).json({ message: 'Appointment not found'});
    }

    //If the appointment is found, it is deleted from the database using the findByIdAndDelete method.
    await Appointment.findByIdAndDelete(appointmentId);
    //if the deletion is successful, a 200 status code is returned with a success message.
    res.status(200).json({ message: 'Appointment deleted successfully' });
  } catch (error){
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

//this is for the doctor side
//This route retrieves the weekly appointments for a doctor.
//the request to be made by a doctor, as indicated by the doctorAllowed middleware.
router.get('/weekly', doctorAllowed, async(req, res) => {
  console.log('Request Object:', req); 
  try{
    const currentDate = new Date();

    //it calculates the start and end dates of the current week using the moment library.
    const startDate = moment(currentDate).startOf('week').toDate();
    const endDate = moment(currentDate).endOf('week').toDate();

    //the doctorId is retrieved from the req.doctor object, which is set by the doctorAllowed middleware.
    const doctorId = req.doctor.doctorId;
    console.log('Doctor ID Route:', doctorId);

    //the code then queries the database for appointments that have the specified doctorId and fall within the calculated date range.
    const appointments = await Appointment.find({
      doctorId,
      date: {$gte: startDate, $lte: endDate},
    });

    //The retrieved appointments are sorted in ascending order based on the date field.
    const sortedAppointments = appointments.sort((a, b) => a.date - b.date)

    //If the retrieval is successful, the sorted appointments are returned as a JSON response.
    res.json(sortedAppointments);
  }catch(error){
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }

});

//export to server.js
module.exports = router;
