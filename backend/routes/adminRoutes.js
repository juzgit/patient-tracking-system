const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Admin = require('../models/AdminModel');
const AppointmentRoutes = require('./appointmentRoutes');
const PatientRoutes = require('./patientRoutes');
const validUsername = require('../middleware/validUsername');

//This is for the admin to get all the patients
router.use('/patients', PatientRoutes);
// This is for the admin to get all the appointments
router.use('/appointments', AppointmentRoutes);

//This route handles the registration of a new admin.
//validUsername middleware is used to validate the username.
router.post('/register', validUsername, async (req, res) => {
    //expects name, surname, username and password
    const {name, surname, username, password } = req.body;

    try {
        // Check if the username is already in use
        const existingAdmin = await Admin.findOne({ username });

        //If an admin with the same username exists, return a 400 status code with a JSON response indicating that the username is already in use.
        if (existingAdmin) {
            return res.status(401).json({ message: 'Username already in use. Please choose a different username.' });
        }

        //If the username is available, hash the password using bcrypt and create a new admin object with the provided details.
        // Hash the password before storing it in the database
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new admin with the provided details
        const newAdmin = new Admin({
            name, 
            surname,
            username,
            password: hashedPassword,
        });

        //then save the new admin to the database and generate a JWT token using the jsonwebtoken module.
        await newAdmin.save();
        const token = jwt.sign({ adminId: newAdmin._id }, 'freedom');

        //send a 201 status code with a JSON response containing the token and admin ID.
        res.status(201).json({ message: 'Admin registered successfully.', token, adminId: newAdmin._id });
        
        //any errors will be handled here
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
});

//This route handles the login of an admin.
//validUsername middleware is used to validate the username.
router.post('/login', validUsername, async (req, res) => {
    //expects the username and password fields in the request body.
    const { username, password } = req.body;

    try {
        //query the Admin model to find an admin with the provided username.
        const admin = await Admin.findOne({ username });

        //If an admin is found, use the isValidPassword method of the admin model to check if the provided password matches the hashed password stored in the database.
        if (admin) {
            const passwordMatch = await admin.isValidPassword(password);

            //If the password matches, generate a JWT token and send a JSON response with the token, username, and admin ID.
            if (passwordMatch) {
                const token = jwt.sign({ adminId: admin._id, username: admin.username }, 'freedom');
                res.json({ token, username: admin.username, adminId: admin._id });
            //If the password does not match or no admin is found with the provided username, we send a 401 status code with a JSON response indicating invalid credentials.
            } else {
                res.status(401).json({ message: 'Invalid credentials' });
            }
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }

        //any errors will be handled here
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

//export to server.js
module.exports = router;
