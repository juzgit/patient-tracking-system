const mongoose = require('mongoose');
//Define the schema for the speciality collection
const specialitySchema = new mongoose.Schema({
    name: { type: String, required: true},
    description: { type: String, required: true},
});
// Create the Speciality model using the schema
const Speciality = mongoose.model('Speciality', specialitySchema);
//Export the Speciality model
module.exports = Speciality;