const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//define the patientSchema using the Schema object.
const patientSchema = new Schema({
    name:{
        type: String,
        required: true,
    },

    surname:{
        type:String,
        required: true
    },

    phoneNumber:{
        type: String,
        required: true,
        validate: {
            validator: function (v) {
                //Ensures that the phone number has exactly 10 digits
                return /^\d{10}$/.test(v);
            },
            message: props => `${props.value} is not a valid 10-digit phone number!`,
        },
    },
    //sorts the patients on the latest added
    createdAt: {
        type: Date,
        default: Date.now,
    },
})

//create a model named Patient using the mongoose.model function and export it as a module.
const Patient = mongoose.model('Patient', patientSchema);

module.exports = Patient;