import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';
//doctor pages      
import DoctorSignUpPage from './pages/DoctorRegister';
import DoctorLoginPage from './pages/DoctorLoginPage';
import Dashboard from './pages/DoctorDashboard';
import DocAppointmentList from './pages/DoctorAppointments';
//admin pages
import AdminRegister from './pages/AdminRegister';
import AdminLoginPage from './pages/AdminLoginPage';
import AdminHomePage from './pages/AdminHomePage';
import AppointmentForm from './pages/AdminAppointment';
import AddPatientForm from './pages/AdminAddPatient';
import PatientList from './pages/AdminPatientList';
import AdminAppointmentList from './pages/AdminAppointmentList';


function App() {
  return (
    <div className="App">
         <Routes>
           <Route path='/' element={<HomePage />} />
           <Route path='/admin-register' element={<AdminRegister />} />
           <Route path='/admin-login' element={<AdminLoginPage />} />
           <Route path='/admin-homepage' element={<AdminHomePage />} />
           <Route path='/admin-appointment' element={<AppointmentForm />} />
           <Route path='/admin-patientform' element={<AddPatientForm />} />
           <Route path='/patient-list' element={<PatientList />} />
           <Route path='/appointment-list' element={<AdminAppointmentList />} />
           
           <Route path='/doctor-signup' element={<DoctorSignUpPage />} />
           <Route path='/doctor-login' element={<DoctorLoginPage />} />
          <Route path='/doctor-dashboard' element={<Dashboard />} />
          <Route path='/doctor-schedule' element={<DocAppointmentList />} />
      </Routes>
    </div>
  );
}

export default App;
