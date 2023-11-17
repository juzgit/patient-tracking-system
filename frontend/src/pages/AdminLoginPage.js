import React, {useState} from "react";
import {useNavigate, Link} from 'react-router-dom';
import '../styling/AdminLogin.css';

const AdminLoginPage = () => {
    // State variables to store the form input values
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();
    //handles the login process for an admin user.
    const AdminLogin = async () => {
        try{
            //Send a POST request to the '/api/admin/login' endpoint
            const response = await fetch('/api/admin/login', {
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json',
                },
                body: JSON.stringify({username, password})
            });

            if(response.ok){
                //If the response is successful, extract the token from the response data
                const data = await response.json();
                //Store the token in the local storage
                localStorage.setItem('adminToken', data.token);
                //Display a success message to the user
                alert('Admin logged in successfully');
                //Navigate to the admin homepage
                navigate('/admin-homepage');
            } else if(response.status === 401){
                //If the response status is 401 (Unauthorized), display an error message to the user
                alert('Invalid credentials. Please try again');
            } else {
                //If the response status is neither 200 (OK) nor 401 (Unauthorized), display a generic error message to the user
                alert('Admin login failed');
            }
        } catch (error){
            //If an error occurs during the login process, log the error to the console
            console.error('Error during login', error);
        }
    };

    return(

        //Login form
        <div className="admin-login-container">
            <div className="input-form">
            <h2>Admin Login</h2>

            <p>Login into your account as an admin</p>.
           
            <div className="admin-login-username">
                <label htmlFor="username">Enter Your Admin Username:</label>
                <input 
                className="admin-username-input"
                type="text"
                placeholder="Admin Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                />
            </div>


             <div className="admin-login-password">
                <label htmlFor="username">Enter Your Admin Password:</label>
                <input
                className="admin-password-input"
                type="password"
                placeholder="Admin password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />
             </div>

            <button className="admin-login-btn" onClick={AdminLogin}>Login</button>
            <p>Don't have an account? <Link to='/admin-register'>Sign up here</Link>.</p>
            <p><Link to='/'>Back to Home Page</Link>.</p>
            </div>
        </div>
    );
};

export default AdminLoginPage;

