import React, {useState} from 'react';
import {useNavigate, Link} from 'react-router-dom';
import '../styling/DocLogin.css';

const DoctorLoginPage = () => {
    // State variables to store the form input values
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    //
    const navigate = useNavigate();

    //handle the login process when the user submits the form.
    const LoginUser = async (e) => {
        e.preventDefault();
        try{
            console.log('Request Payload:', { username, password });
            //an asynchronous function that makes a POST request to the /api/doctor/login endpoint with the provided username and password.
            const response = await fetch('https://patient-tracking-system-api.onrender.com/api/doctor/login', {
                method: 'POST',
                headers: {
                    'Content-Type':'application/json',
                },
                body: JSON.stringify({username, password})
            });

            //If the response is successful
            //retrieves the data from the response and stores the doctor's token in the local storage.
            //displays an alert to notify the user of a successful login and navigates to the doctor dashboard page.
            if(response.ok){
                const data = await response.json();
                localStorage.setItem('doctorToken', data.token);
                alert('User logged successfully');
                navigate('/doctor-dashboard');
                //If the response status is 401, it displays an alert for invalid credentials.
                //Otherwise, it displays an alert for a failed login.
            } else if(response.status === 401){
                alert('Invalid credentials. Please try again.')
            } else if (response.status === 500) {
                alert('Internal Server Error');
            }
        } catch(error){
            console.error('Error during login:', error);
        }

    };

    //the structure and layout of the doctor login page.
    //a form with input fields for the username and password, a login button, and links for signing up and returning to the home page.
    return(
    <div id='doc-login-main-container'>
         <div className='container mt-5' id='doc-login'>
            <div className='card p-3'>
            <h2 className='text-center mb-3'>Doctor Login</h2>
            <form onSubmit={LoginUser}>
                <div className='mb-3 row'>
                <label htmlFor='username' className='form-label'>Username:</label>
                    <div className='col-sm-8'>
                    <input 
                    type='text' 
                    className='form-control'
                    id='username' 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} 
                    required
                    />  
                    </div>
                </div>

                <div className='mb-3 row'>
                    <label htmlFor='password' className='form-label'>Password</label>
                    <div className='col-sm-8'>
                    <input
                        type='password'
                        className='form-control'
                        id='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    </div>
                </div>

                <button type='submit' className='btn btn-primary'>Login</button>
                <p>Don't have an account? <Link to='/doctor-signup'>Sign up here</Link>.</p>
                <p><Link to='/'>Back to Home Page</Link>.</p>
            </form>
            </div>
        </div>
    </div>
       
    );
};

export default DoctorLoginPage;