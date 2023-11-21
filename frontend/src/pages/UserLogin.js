import React, {useState} from "react";
import { useNavigate, Link } from "react-router-dom";
import '../styling/UserLogin.css';

//responsible for rendering a user login form and handling the login functionality.
const UserLogin = () => {
    //using the useState hook to manage the state of the username and password fields.
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    //the useNavigate hook to handle navigation.
    const navigate = useNavigate();

    //responsible for handling the login process.
    const Login = async () => {
        try{
            const response = await fetch('https://patient-tracking-system-api.onrender.com/user/login', {
                method:'POST',
                headers:{
                    'Content-Type':'application/json',
                },
                body: JSON.stringify({ username, password })
            });
        //If the response is successful, the user token is stored in the local storage, an alert is displayed to notify the user of successful login, and the user is navigated to the /user-check-appointment page.
            if(response.ok){
                const data = await response.json();
                localStorage.setItem('userToken', data.token);
                alert('You have logged in');
                console.log('Server response:', data);
                navigate('/user-check-appointment');
                //If the response is not successful, an alert is displayed to notify the user of login failure.
            } else if (response.status === 401) {
                alert('Invalid credentials. Please try again');
            } else if (response.status === 500){
                alert('Internal Server Error');
            }
            //Any errors that occur during the login process are logged to the console.
        } catch(error){
            console.error('Error during login:', error);
        }
    }

    //renders the user login form.
    //The form includes input fields for the username and password, a login button that triggers the Login function when clicked, and links for registering a new account and returning to the home page.
    return(
        <div className="user-login-container">

        <div className="user-login-form">
        <h2 className="user-login-header">User Login</h2>
        <label className="user-login-labels">Username:</label>
            <input className="user-login-input"
            type="text"
            placeholder="(e.g. example@gmail.com)"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            />

            <label className="user-login-labels">Password:</label>
            <input className="user-login-input"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />

            <button className="user-login-btn" onClick={Login}>Login</button>

            <p><Link to='user-register'>Don't have an account? Click here</Link></p>
            <p><Link to='/'>Back to Home Page</Link>.</p>
        </div>
            
        </div>
    );
};

export default UserLogin;