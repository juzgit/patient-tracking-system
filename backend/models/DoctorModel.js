const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

//Defining the doctor schema
const doctorSchema = new Schema ({
    name:{
        type:String,
        required: true,
    },

    surname:{
        type:String,
        required: true,
    },

    ChosenSpecialityId:{
        type: mongoose.Schema.Types.ObjectId, 
        ref:'Speciality', 
        required:true,
    },

    username: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true,
    },

});

//Adding a method to the doctor schema to validate the password
doctorSchema.methods.isValidPassword = async function (password) {
    try {
        //used bcrypt.compare to compare passwords
        return await bcrypt.compare(password, this.password);
    } catch (error) {
        throw error;
    }
};

//Creating the Doctor model using the doctor schema
const Doctor = mongoose.model('Doctor', doctorSchema);
//Exporting the Doctor model
module.exports = Doctor;