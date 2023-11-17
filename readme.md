### Patient Tracking System

### System Architecture
- The appilication will be built using the MERN stack. The reason for that choice, it will be easier to
  divide the application into smaller pieces. The backend and the frontend will be using Javascript, it will be easier
  to manage the code, and make the backend and the front-end collaborate smoothly. The Node.js can handle lots of users at the same and it will deliver the requested data at the smoothly. The database with the help of MongoDB, as it does not require a strict structure to set up a database. Express JS will help set out the application in a modular structure: setting up routes, schemas, middleware and the api. Express JS also give me the ability to set up user authentication, using JSONWEBTOKEN and using password hashing for users and admin as it will make it harder for attackers to obtain such sensitive information. With React JS, it will help with setting up a interactive UI for the normal user and admin. It promotes the reusability of code and maintability. The pages and components can be placed in different folders. For styling the application, pure CSS and Bootstrap will be used.

  The MERN stack offers balance when making the Doctor Tracking Paitient Information application, structuring the application in a modular way.


### System Requirement Specification

## 1. Purpose and Scope

1.1 Purpose
- The purpose of the Patient Tracking System is to provide healthcare professionals with a tool to manage their patients
  information and appointments efficiently, ensuring secure authentication, access control, and real-time updates.

1.2 Scope
 - The application will only allow normal-end users to check appointments for a within a week, wheres an adminstrator can make, edit or cancel appointments and patient information.

## 2. Functional Requirements

2.1 User Authentication

- Both users are authenticated using JWT username and password.

- Adminstrators will have a different login page.

2.2 CRUD operations

- Adminstrators will have the ability to update, make, delete and read the information.

- Users will only have the ability to read the appointments they have for the current week.


## 3. Non-Functional Requirements

3.1 Security

- User passwords and data will be encrypted using password hashing and JSONWEBTOKEN.

3.2 Availiability

- The application will be available 24/7

3.3 Usability

- The user interface will be easy to navigate with clear labels and a sidebar.

3.4 Compatibility

- The application will be compatible with Chrome, Safari, and Firefox.

### How To Use The App

# Admin-User-End

1. You can register to be an admin, and after successfully logging in, it will lead you to the login page for the admin to get access to the CRUD operations.

2. On the sidebar you can you can see the different pages you can navigate to perform CRUD     operations, adding a patient getting their patient information. After successfully adding a patient, the admin can assign them to their desired specialist: General Practioner, Dermatologist, and Cardiologist. The doctors that align with those specialties will show up when creating an appointment, so the admin will enter their name and surname, and give them a date for the appointment.

3. The admins can how many patients are there, it will display their names, surnames, and phone numbers. The admin can edit their surnames or their phone numbers. They will be able to delete patients as well.

4. The admin can see all the appointments, even appointments that are past the current week.
The admin can update the appointment date, and delete an appointment.


# Doctor-User-End

1. You can register to be a doctor. In the doctor registration page, you can enter your name, surname, username, password and you must confirm your password, and you can choose the one of the three specialties: General Practioner, Dermatologist, and Cardiologist. After successfully registering, you will be redirected to the login page, where you must enter your username and password.

2. After successfully logging in, you can the homepage will tell you how to use the doctor side. There is a sidebar where you can navigate to see the appointments for the current week.





  


