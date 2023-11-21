### Patient Tracking System

This project is targeted toward the normal end users, administrators, and the doctors of Medical Centre Pro. Normal end-users/potential patients can view each doctor's appointments for the next 7 days, registering and logging in to view the appointments to see when the doctors are available. Doctors can only view the appointments. The admin can make, edit, and delete appointments and patient information. They can also delete patients from the database

### System Architecture
- The application will be built using the MERN stack. The reason for that choice, it will be easier to
  divide the application into smaller pieces. The backend and the frontend will be using Javascript, it will be easier
  to manage the code, and make the backend and the front-end collaborate smoothly. Node.js can handle lots of users at the same and it will deliver the requested data smoothly. The database with the help of MongoDB, does not require a strict structure to set up a database. Express JS will help set out the application in a modular structure: setting up routes, schemas, middleware, and the API. Express JS also gives me the ability to set up user authentication, using JSONWEBTOKEN and password hashing for users and admin as it will make it harder for attackers to obtain such sensitive information. React JS, will help with setting up an interactive UI for the normal user and admin. It promotes the reusability of code and maintainability. The pages and components can be placed in different folders. For styling the application, pure CSS and Bootstrap will be used.

  The MERN stack offers balance when making the Doctor Tracking Patient Information application, structuring the application in a modular way.


### System Requirement Specification

## 1. Purpose and Scope

1.1 Purpose
- The purpose of the Patient Tracking System is to provide healthcare professionals with a tool to manage their patient's information and appointments efficiently, ensuring secure authentication, access control, and real-time updates.

1.2 Scope
 - The application will only allow normal-end users to check appointments within a week, where an administrator can make, edit, or cancel appointments and patient information.

## 2. Functional Requirements

2.1 User Authentication

- Both users are authenticated using JWT username and password.

- Administrators will have a different login page.

2.2 CRUD operations

- Administrators will have the ability to update, make, delete, and read the information.

- Normal-end-users will only have the ability to read the appointments the doctors have for the current week.


## 3. Non-Functional Requirements

3.1 Security

- User passwords and data will be encrypted using password hashing and JSONWEBTOKEN.

3.2 Availability

- The application will be available 24/7

3.3 Usability

- The user interface will be easy to navigate with clear labels and a sidebar.

3.4 Compatibility

- The application will be compatible with Chrome, Safari, and Firefox.

### How To Use The App

# Normal-End-User

- The normal end user can view the appointments of a doctor of a specific service that is offered. They can only see their appointments for a week, including the date and the time. After going through each doctor, they can decide to make an appointment or they can logout. For them to make an appointment with the desired doctor, they can register and log in as an admin.

# Admin-User-End

1. You can register to be an admin, and after successfully logging in, it will lead you to the login page for the admin to get access to the CRUD operations.

2. On the sidebar you can see the different pages you can navigate to perform CRUD operations, adding a patient getting their patient information. After successfully adding a patient, the admin can assign them to their desired specialist: General practitioner, Dermatologist, and Cardiologist. The doctors that align with those specialties will show up when creating an appointment, so the admin will enter their name and surname, and give them a date for the appointment.

3. The admins can see how many patients are there, it will display their names, surnames, and phone numbers. The admin can edit their surnames or their phone numbers. They will be able to delete patients as well.

4. The admin can see all the appointments, even appointments that are scheduled ahead of the current week.
The admin can update the appointment date, and delete an appointment.


# Doctor-User-End

1. You can register to be a doctor. On the doctor registration page, you can enter your name, surname, username, and password and you must confirm your password, and you can choose one of the three specialties: General practitioner, Dermatologist, and Cardiologist. After successfully registering, you will be redirected to the login page, where you must enter your username and password.

2. After successfully logging in, you can see the homepage will tell you how to use the doctor side. There is a sidebar where you can navigate to see the appointments for the current week.

### Deployment
- The project will be deployed on Render.com because it is free and I can upload the frontend and backend separately. Render.com also auto-deploys when I make changes to the backend or the frontend.

### How to install

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/juzgit/patient-tracking-system

# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd backend
npm install


# Start frontend (inside the 'frontend' directory)
npm start

# Start backend (inside the 'backend' directory)
npm start

#The application is deployed here:
https://patient-tracking-system-ui.onrender.com

### Modify

-There is no need to modify anything.

## Security Measures

### 1. CORS Configuration

- CORS is configured on the backend to allow requests only from the specific origin where the frontend is hosted. This prevents unauthorized domains from accessing the API and helps mitigate cross-origin attacks.

### Third-Party APIs?

- No third-party APIs were used.

### Competiton

- Since Medical Centre Pro is a private medical centre, with 9 doctors, three for each specialty, the main competition is the Melomed web application: https://www.melomed.co.za/index-m.asp. It is a web application that only gives normal end-users the doctor's information based on the specialty chosen, but does not give them access to view their appointments for the week.





  


