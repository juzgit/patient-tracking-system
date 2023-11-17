const jwt = require('jsonwebtoken');
const secretKey = 'freedom';

const doctorAllowed = (req, res, next) => {
    //extracting the token from the request headers
    const token = req.header('x-auth-token');

    //If no token is found, it returns a 401 status code with a JSON response indicating unauthorized access.
    if(!token){
        return res.status(401).json({message: 'Unauthorised access'});
    }

    try{
        //verifies the token using jwt.verify(token, secretKey).
        const decoded = jwt.verify(token, secretKey);
        console.log('Decoded Token:', decoded);
        
        if (!decoded || !decoded.doctorId) {
            return res.status(401).json({ message: 'Invalid token format' });
        }
        //If the token is valid and contains the doctorId, the decoded object is assigned to req.doctor
        req.doctor = decoded;
        console.log('Doctor ID Middleware:', req.doctor.doctorId);
        //next() function is called to pass control to the next middleware in the chain.
        next();
    } catch(error){
        console.error('Error decoding token:', error);
        res.status(401).json({ message: 'Token is not valid' });
    }
};

module.exports = doctorAllowed;