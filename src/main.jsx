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
import AllStudentProfilesAdmin from './Components/AllStudentProfilesAdmin.jsx'
import AllTeacherProfilesAdmin from './Components/AllTeacherProfilesAdmin.jsx'

import Forbidden from './Components/Forbidden.jsx'
import EditProfile from './Components/EditProfile.jsx'
import EditProfileAdmin from './Components/EditProfileAdmin.jsx'
import EditStudentProfile from './Components/EditStudentDetails.jsx'
import EditStudentProfileAdmin from './Components/EditStudentDetailsAdmin.jsx'

import EditStudentAddress from './Components/EditStudentAddress.jsx'
import EditStudentAddressAdmin from './Components/EditStudentAddressAdmin.jsx'
import EditTeacherProfile from './Components/EditTeacherProfile.jsx'
import EditTeacherProfileAdmin from './Components/EditTeacherProfileAdmin.jsx'

import EditMarks from './Components/EditMarks.jsx'
import StudentExpanded from './Components/StudentExpanded.jsx'
import StudentExpandedAdmin from './Components/StudentExpandedAdmin.jsx'
import TeacherExpandedAdmin from './Components/TeacherExpandedAdmin.jsx'

import HomeAdmin from './Components/HomeAdmin.jsx'

import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { GlobalProvider } from './GlobalContext';

//const backendDomain = "adorable-forgiveness-production.up.railway.app";
const backendDomain = "127.0.0.1:8080";


console.log(backendDomain)
const router = createBrowserRouter([
  { path: '/', element: <App backendDomain={backendDomain}/> },
  { path: '/signup', element: <SignUp /> },
  { path: '/studentsignup', element: <StudentSignUp backendDomain={backendDomain}/> },
  { path: '/teachersignup', element: <TeacherSignUp backendDomain={backendDomain}/> },
  { path: '/homestudent', element: <HomeStudent /> },
  { path: '/hometeacher', element: <HomeTeacher /> },
  { path: '/homeadmin', element: <HomeAdmin /> },
  { path: '/profile', element: <Profile backendDomain={backendDomain}/> },
  { path: '/marksstudent', element: <MarksStudent backendDomain={backendDomain}/> },
  { path: '/marksteacher', element: <MarksTeacher backendDomain={backendDomain}/> },
  { path: '/allstudentprofiles', element: <AllStudentProfiles backendDomain={backendDomain}/> },
  { path: '/allstudentprofilesadmin', element: <AllStudentProfilesAdmin backendDomain={backendDomain}/> },
  { path: '/allteacherprofilesadmin', element: <AllTeacherProfilesAdmin backendDomain={backendDomain}/> },
  { path: '/forbidden', element: <Forbidden /> },
  { path: '/editprofile', element: <EditProfile backendDomain={backendDomain}/>},
  { path: '/editprofileadmin/:globId', element: <EditProfileAdmin backendDomain={backendDomain}/>},
  { path: '/editstudentprofile', element: <EditStudentProfile backendDomain={backendDomain}/> },
  { path: '/editstudentprofileadmin/:globId', element: <EditStudentProfileAdmin backendDomain={backendDomain}/> },
  { path: '/editstudentaddress', element: <EditStudentAddress backendDomain={backendDomain}/> },
  { path: '/editstudentaddressadmin/:globId', element: <EditStudentAddressAdmin backendDomain={backendDomain}/> },
  { path: '/editteacherprofile', element: <EditTeacherProfile backendDomain={backendDomain}/> },
  { path: '/editteacherprofileadmin/:globId', element: <EditTeacherProfileAdmin backendDomain={backendDomain}/> },
  { path: '/editmarks/:globId', element: <EditMarks backendDomain={backendDomain}/> },
  { path: '/studentexpanded/:globId', element: <StudentExpanded backendDomain={backendDomain}/> },
  { path: '/studentexpandedadmin/:globId', element: <StudentExpandedAdmin backendDomain={backendDomain}/> },
  { path: '/teacherexpandedadmin/:globId', element: <TeacherExpandedAdmin backendDomain={backendDomain}/> }

]);
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GlobalProvider>
      <RouterProvider router={router} />
    </GlobalProvider>
  </React.StrictMode>,
)
