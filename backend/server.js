require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const PORT = 8060;

app.use(bodyParser.json());

app.use(cors({
    origin: 'https://patient-tracking-system-ui.onrender.com', 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
}));

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then( () => {
    console.log('Connected to MongoDB database.');

}).catch((error) => {
    console.error(`MongoDB connection error: ${error}`)
});

//importing the routes
const adminRoutes = require('./routes/adminRoutes');
const doctorRoutes = require('./routes/doctorRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');
const patientRoutes = require('./routes/patientRoutes');
const specialtiesRoutes = require('./routes/specialityRoutes');
const userRoutes = require('./routes/userRoutes');
    
//routes
app.use('/api/admin', adminRoutes);
app.use('/api/doctor', doctorRoutes);
app.use('/api/appointment', appointmentRoutes);
app.use('/api/patients', patientRoutes);
app.use('/api/service', specialtiesRoutes);
app.use('/user', userRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`);
});
