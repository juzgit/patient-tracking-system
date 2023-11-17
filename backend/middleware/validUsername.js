const validateDoctorUsername = (req, res, next) =>  {
    console.log('Request body:', req.body);
    //checks if the username property is missing in the request body.
    //If it is missing, it means the username is invalid, and the function returns a 403 status code with a JSON response containing the message "Invalid username."
    if(!req.body.username) {
        return res.status(403).json({ message: 'Invalid username.'});
    }

    //assigns the value of the username property from the request body to a variable called username.
    const username = req.body.username;
    console.log('Received username:', username);
    //checks if the username does not end with "@gmail.com". If it doesn't, it means the email address is invalid, and the function returns a 403 status code with a JSON response containing the message "Invalid email address."
    if(!username.endsWith('@gmail.com')){
        return res.status(403).json({ message:'Invalid email address.' });
    }
    //callback function to pass control to the next middleware in the chain.
    next();
};

module.exports = validateDoctorUsername;