const jwt = require('jsonwebtoken');
const secretKey = 'freedom';

const adminAllowed = (req, res, next) => {
    //Extracting the JWT from the request header
    const token = req.header('x-auth-token');
    //Checking if the token is missing and sending a 401 Unauthorized response if it is
    if(!token){
        return res.status(401).json({message: 'Unauthorised access'});
    }
    //Verifying the JWT using the secret key and logging the decoded token for debugging purposes
    try{
        const decoded = jwt.verify(token, secretKey);
        console.log('Decoded Token:', decoded);
        //Adding the decoded admin property to the request object
        req.admin = decoded.adminId;
        //Proceeding to the next middleware
        next();
        //catching any errors that occur during JWT verification and sending a 401 Unauthorized response if the token is not valid
    } catch(error){
        res.status(401).json({ message: 'Token is not valid' });
    }
};

module.exports = adminAllowed;