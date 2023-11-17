import React, {useState} from "react";
import { useNavigate, Link } from "react-router-dom";
import '../styling/AdminReg.css';

const AdminRegister = () => {
      // State variables to store the form input values
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const navigate = useNavigate();

    //handles the registration process for an admin.
    const Register = async (e) => {
        e.preventDefault();

        if(password !== confirmPassword){
          //Displays an alert if the password and confirmPassword do not match
            alert('Passwords do not match. Please confirm your password');
             //Exits the function if the passwords do not match
            return;
        }

        try{
            const response = await fetch('/api/admin/register', {
                method: 'POST',
                headers: {
                  //Sets the request header to indicate that the body contains JSON data
                    'Content-Type': 'application/json'
                },
                //Converts the data to JSON format and sends it in the request body
                body: JSON.stringify({name, surname, username, password }),
            });

            //Displays an alert if the registration is successful
            //Navigates to the '/admin-login' page
            if(response.ok){
                const data = await response.json();
                alert('Admin registered successfully.');
                console.log('Server response:', data);
                navigate('/admin-login');
            } else {
                alert(`Registration failed. Please try again`);
            }
        } catch(error){
            console.error('Error during registration:', error);
        }
    };

    return (
      <div className="admin-reg-container">
        <div className="container mt-3" id="admin-register-container">
          <div className="card p-3">
            <h2 className="text-center mb-3">Admin Registration</h2>
            <form onSubmit={Register}>

            {/**input field for name */}
            <div className="mb-3 row">
            <label htmlFor="name" className="form-label">
              Name:
            </label>
            <div className="col-sm-8">
              <input
                type="text"
                className="form-control"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          </div>

            {/**input field for surname */}
            <div className="mb-3 row">
              <label htmlFor="surname" className="form-label">
                 Surname:
              </label>
              <div className="col-sm-8">
                <input
                type="text"
                className="form-control"
                id="surname"
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
                required
              />
              </div>
             </div>
              
              {/**input filed for username */}
              <div className="mb-3 row">
                <label htmlFor="username" className="form-label">
                  Username:
                </label>
                <div className="col-sm-8">
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
              </div>

                {/**Input field for password */}
              <div className="mb-3 row">
                <label htmlFor="password" className="form-label">
                  Password:
                </label>
                <div className="col-sm-8">
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Input field for confirming the password */}
              <div className='mb-3'>
                    <label htmlFor='confirmPassword' className='form-label'>Confirm Password:</label>
                    <div className="col-sm-8">
                    <input
                    type='password'
                    className='form-control'
                    id='confirmPassword'
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    />
                    </div>
                </div>
    
              {/**admin register button */}
              <button type="submit" className="btn btn-primary">
                Register
              </button>
              <p>Do have an account? <Link to='/admin-login'>Login here</Link>.</p>
              <p><Link to='/'>Back to Home Page</Link>.</p>
            </form>
          </div>
        </div>
      </div>
      );
};

export default AdminRegister;