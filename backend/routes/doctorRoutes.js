const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Appointment = require('../models/AppointmentModel');
const Doctor = require('../models/DoctorModel');
const Patient = require('../models/PatientModel');
const Speciality = require('../models/SpecialityModel');
const validUsername = require('../middleware/validUsername');
const doctorAllowed = require('../middleware/doctorMiddleware');
const appointmentRoutes = require('./appointmentRoutes');

router.use('/appointment', appointmentRoutes);

// Registration route for new doctors
// The validUsername middleware is used to validate the username.
router.post('/register', validUsername, async (req, res) => {
    //The request body is destructured to extract the necessary information for registration.
    const { name, surname, username, password, ChosenSpeciality } = req.body;

    try {
        // Check if the username (email) is already in use
        const existingDoctor = await Doctor.findOne({ username });

        //If the username is already in use, a 400 status code is returned with an appropriate error message.
        if (existingDoctor) {
            return res.status(400).json({ message: 'Email already in use. Please use a different email.' });
        }

        // Hash the password before storing it in the database
        const hashedPassword = await bcrypt.hash(password, 10);

        // Check if the chosen speciality exists
        const speciality = await Speciality.findOne({ name: ChosenSpeciality });
        //If the speciality does not exist, a 400 status code is returned with an appropriate error message.
        if (!speciality) {
            return res.status(400).json({ message: 'Invalid speciality ID' });
        }

        // Create a new doctor with the provided details
        const newDoctor = new Doctor({
            name,
            surname,
            username,
            password: hashedPassword,
            ChosenSpecialityId: speciality._id
        });

        console.log('Stored hashed password:', hashedPassword);

        // Save the new doctor to the database
        await newDoctor.save();
        console.log('Stored hashed password:', newDoctor.password);

        //A JWT token is generated using the doctor's ID.
        const token = jwt.sign({ doctorId: newDoctor._id }, 'freedom');
        //A 201 status code is returned with a success message, the token, and the doctor's ID.
        res.status(201).json({ message: 'Doctor registered successfully.', token, doctorId: newDoctor._id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

//This route handles the login of doctors.
//The validUsername middleware is used to validate the username.
router.post('/login', validUsername, async (req, res) => {
    const { username, password } = req.body;
    //The request body is destructured to extract the username and password.
    try {
        //The code queries the Doctor model to find a doctor with the provided username.
        const doctor = await Doctor.findOne({ username });
        if (doctor) {
            console.log('Received username:', username);
            console.log('Username:', doctor.username);
            console.log('Password:', password);
            console.log('Stored hashed password:', doctor.password);

            try {
                //The isValidPassword() method of the doctor model is used to compare the provided password with the stored hashed password.
                const passwordMatch = await doctor.isValidPassword(password);
                console.log('bcrypt.compare result:', passwordMatch);

                //If the passwords match, a JWT token is generated using the doctor's ID and username.
                if (passwordMatch) {
                    const token = jwt.sign({ doctorId: doctor._id, username: doctor.username }, 'freedom');
                    console.log('Token:', token);
                    //The token, username, and doctor's ID are returned in the response.
                    res.json({ token, username: doctor.username, doctorId: doctor._id });

                    //If the passwords do not match or the doctor is not found, appropriate error messages and status codes are returned.
                } else {
                    console.log('Password does not match');
                    res.status(401).json({ message: 'Invalid credentials' });
                }
            } catch (error) {
                console.error('Error comparing passwords:', error);
                res.status(500).json({ message: 'Internal Server Error' });
            }
        } else {
            console.log('Doctor not found');
            res.status(401).json({ message: 'Invalid credentials' });
        }
    } catch (error) {
        console.error('Error finding doctor:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// This route handles the retrieval of a list of doctor specialties.
router.get('/specialities', async (req, res) => {
  try {
    //The code queries the Speciality model to fetch all specialities.
    const specialities = await Speciality.find();
    //The specialities are returned in the response.
    res.json(specialities);
  } catch (error) {
    console.error('Error fetching doctor specialities:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
