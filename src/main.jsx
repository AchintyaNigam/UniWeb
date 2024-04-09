import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

import SignUp from './Components/SignUp.jsx'
import StudentSignUp from './Components/SignUpStudent.jsx'
import TeacherSignUp from './Components/TeacherSignUp.jsx'
import HomeStudent from './Components/HomeStudent.jsx'
import HomeTeacher from './Components/HomeTeacher.jsx'
import Profile from './Components/Profile.jsx'
import MarksStudent from './Components/MarksStudent.jsx'
import MarksTeacher from './Components/MarksTeacher.jsx'
import AllStudentProfiles from './Components/AllStudentProfiles.jsx'
import Forbidden from './Components/Forbidden.jsx'
import EditProfile from './Components/EditProfile.jsx'

import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { GlobalProvider } from './GlobalContext';


const router = createBrowserRouter([
  { path: '/', element: <App /> },
  { path: '/signup', element: <SignUp /> },
  { path: '/studentsignup', element: <StudentSignUp /> },
  { path: '/teachersignup', element: <TeacherSignUp /> },
  { path: '/homestudent', element: <HomeStudent /> },
  { path: '/hometeacher', element: <HomeTeacher /> },
  { path: '/profile', element: <Profile /> },
  { path: '/marksstudent', element: <MarksStudent /> },
  { path: '/marksteacher', element: <MarksTeacher /> },
  { path: '/allstudentprofiles', element: <AllStudentProfiles /> },
  { path: '/forbidden', element: <Forbidden /> },
  { path: '/editprofile', element: <EditProfile />}
]);
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GlobalProvider>
      <RouterProvider router={router} />
    </GlobalProvider>
  </React.StrictMode>,
)
