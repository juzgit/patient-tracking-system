import React, {useState} from 'react';
import { useNavigate, Link} from 'react-router-dom';
import '../styling/DocReg.css';

//a form that allows doctors to register by providing their name, surname, username, password, and chosen speciality.
const DoctorRegister = () => {
    // State variables to store the form input values
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [ChosenSpeciality, SetChosenSpeciality] = useState('');
    const navigate = useNavigate();

    // Function to handle form submission
    //performs validation checks on the password and confirmPassword fields, sends a POST request to the server with the form data, and handles the server response.
    const Register = async (e) => {
        e.preventDefault();

        if(password !== confirmPassword){
            alert('Passwords do not match. Please confirm your password');
            return;
        }

        try{
            const formData = {
                name,
                surname,
                username,
                password,
                ChosenSpeciality
            };

            const response = await fetch('https://patient-tracking-system-api.onrender.com/api/doctor/register', {
                method: 'POST',
                headers: {
                    'Content-Type':'application/json',
                },
                body:JSON.stringify(formData),
            });

            if(response.ok){
                const data = await response.json();
                alert('Registration was a success');
                console.log('Server response:', data);
                //navigate to the login-page
                navigate('/doctor-login');
            } else{
                alert('Registration failed');
            }
        } catch (error){
            console.error(error);
        }
    }


    //Renders the UI
    return(
    <div id='doc-reg-main-container'>
        <div className='container d-flex justify-content-center align-items-center' id='doc-reg-container'>
            <div className='card p-4'>
            <h2 className='mb-4'>Doctor Register</h2>
            <form onSubmit={Register}>
                <div className='mb-3' id='doc-reg-form'>
                    <label htmlFor='name' className='form-label'>Name:</label>
                    <input
                    type='text'
                    className='form-control'
                    id='name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    />
                </div>

                <div className='mb-3' id='doc-reg-form'>
                    <label htmlFor='surname' className='form-label'>Surname:</label>
                    <input
                    type='text'
                    className='form-control'
                    id='surname'
                    value={surname}
                    onChange={(e) => setSurname(e.target.value)}
                    required
                    />
                </div>

                <div className='mb-3' id='doc-reg-form'>
                    <label htmlFor='username' className='form-label'>Username:</label>
                    <input
                    type='text'
                    className='form-control'
                    id='username'
                    value={username}
                    onChange={(e) => setUserName(e.target.value)}
                    required
                    />
                </div>

                <div className='mb-2' id='doc-reg-form'>
                    <label htmlFor='password' className='form-label'>Password:</label>
                    <input
                    type='password'
                    className='form-control'
                    id='name'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    />
                </div>

                <div className='mb-2' id='doc-reg-form'>
                    <label htmlFor='confirmPassword' className='form-label'>Confirm Password:</label>
                    <input
                    type='password'
                    className='form-control'
                    id='confirmPassword'
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    />
                </div>

                <div className='mb-2' id='doc-reg-form'>
                    <label htmlFor='speciality' className='form-label'>Choose Speciality:</label>
                    <select className='form-select'
                    id='chosenSpeciality'
                    value={ChosenSpeciality}
                    onChange={(e) => SetChosenSpeciality(e.target.value)}
                    required
                    >
                    <option value='' disabled>Select A Speciality</option>
                    <option value='General Practioner'>General Practioner</option>
                    <option value='Cardiologist'>Cardiologist</option>
                    <option value='Dermatologist'>Dermatologist</option>
                    </select>
                </div>

                <button type='submit' className="btn btn-primary">Register</button>

                <p>Do have an account? <Link to='/doctor-login'>Login here</Link>.</p>
                <p><Link to='/'>Back to Home Page</Link>.</p>
            </form>
            </div>
        </div>
    </div>
        
    );
};

export default DoctorRegister; 