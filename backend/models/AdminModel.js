const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

//define the adminSchema
const adminSchema = new Schema({
    name:{
        type:String,
        required: true,
    },
    
    surname:{
        type: String,
        required: true,
    },

    username:{
        type: String,
        required: true,
    },

    password: {
        type: String,
        required: true,
    },
});

//Adding a method to the admin schema to validate the password
adminSchema.methods.isValidPassword = async function (password) {
    try {
        // Use bcrypt.compare to compare passwords
        return await bcrypt.compare(password, this.password);
    } catch (error) {
        throw error;
    }
};

//Create the Admin model using the admin schema
const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;

