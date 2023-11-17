const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Define the appointment schema
const appointmentSchema = new Schema({
    doctorId:{
        type: Schema.Types.ObjectId,
        ref: 'Doctor',
        required: true
    },

    patient: {
        name: { type: String, required: true },
        surname: { type: String, required: true },
      },

    date:{
        type: Date,
        required: true,
    },

})

//Create the Appointment model using the appointment schema
const Appointment = mongoose.model('Appointment', appointmentSchema);

//Export the Appointment model
module.exports = Appointment;