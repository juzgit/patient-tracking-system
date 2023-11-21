const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },

    surname:{
        type: String,
        required: true,
    },

    username:{
        type: String,
        unique: true,
        required: true
    },

    password:{
        type: String,
        required: true
    }
});

const User = mongoose.model('Users', userSchema);

module.exports = User;