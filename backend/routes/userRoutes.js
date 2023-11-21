const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Appointment = require('../models/AppointmentModel');
const Doctor = require('../models/DoctorModel');
const Speciality = require('../models/SpecialityModel');
const Users = require('../models/UserModel');
const validUsername = require('../middleware/validUsername');
const moment = require('moment');

router.post('/register', validUsername, async (req, res) => {
    const { name, surname ,username, password } = req.body;

    try{
        const existingUser = await Users.findOne({ username });

        if(existingUser){
            return res.status(401).json({ message: 'Username already in use. Please choose a different name.' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new Users({  name, surname, username, password: hashedPassword });

        await newUser.save();

        const token = jwt.sign({ userId: newUser._id }, 'freedom');
        res.status(201).json({ message: 'User registered successfully.', token, userId: newUser._id });
    } catch(error){
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error'});
    }
});

// User login route
router.post('/login', validUsername, async (req, res) => {
    const { username, password } = req.body;
  
    try {
      const user = await Users.findOne({ username });
  
      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
  
      const passwordMatch = await bcrypt.compare(password, user.password);
  
      if (passwordMatch) {
        const token = jwt.sign({ userId: user._id }, 'freedom');
        res.json({ token, userId: user._id });
      } else {
        res.status(401).json({ message: 'Invalid credentials' });
      }
    } catch (error) {
      console.error('Error finding user:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });

// Route to get doctors based on a given specialty
router.get('/doctors/:specialityId', async (req, res) => {
    const { specialityId } = req.params;
    try {
      const doctors = await Doctor.find({ ChosenSpecialityId: specialityId });
      res.json(doctors);
    } catch (error) {
      console.error('Error fetching doctors:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

// Route to get weekly appointments for a selected doctor
router.get('/appointments/:doctorId/weekly', async (req, res) => {
    const { doctorId } = req.params;
    try {
      const currentDate = new Date();
      const startDate = moment(currentDate).startOf('week').toDate();
      const endDate = moment(currentDate).endOf('week').toDate();
  
      const appointments = await Appointment.find({
        doctorId,
        date: { $gte: startDate, $lte: endDate },
      });
  
      const sortedAppointments = appointments.sort((a, b) => a.date - b.date);
      res.json(sortedAppointments);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  module.exports = router;