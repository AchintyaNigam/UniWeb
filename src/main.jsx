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


const router = createBrowserRouter([
  { path: '/', element: <App /> },
  { path: '/signup', element: <SignUp /> },
  { path: '/studentsignup', element: <StudentSignUp /> },
  { path: '/teachersignup', element: <TeacherSignUp /> },
  { path: '/homestudent', element: <HomeStudent /> },
  { path: '/hometeacher', element: <HomeTeacher /> },
  { path: '/homeadmin', element: <HomeAdmin /> },
  { path: '/profile', element: <Profile /> },
  { path: '/marksstudent', element: <MarksStudent /> },
  { path: '/marksteacher', element: <MarksTeacher /> },
  { path: '/allstudentprofiles', element: <AllStudentProfiles /> },
  { path: '/allstudentprofilesadmin', element: <AllStudentProfilesAdmin /> },
  { path: '/allteacherprofilesadmin', element: <AllTeacherProfilesAdmin /> },
  { path: '/forbidden', element: <Forbidden /> },
  { path: '/editprofile', element: <EditProfile />},
  { path: '/editprofileadmin/:globId', element: <EditProfileAdmin />},
  { path: '/editstudentprofile', element: <EditStudentProfile /> },
  { path: '/editstudentprofileadmin/:globId', element: <EditStudentProfileAdmin /> },
  { path: '/editstudentaddress', element: <EditStudentAddress /> },
  { path: '/editstudentaddressadmin/:globId', element: <EditStudentAddressAdmin /> },
  { path: '/editteacherprofile', element: <EditTeacherProfile /> },
  { path: '/editteacherprofileadmin/:globId', element: <EditTeacherProfileAdmin /> },
  { path: '/editmarks/:globId', element: <EditMarks /> },
  { path: '/studentexpanded/:globId', element: <StudentExpanded /> },
  { path: '/studentexpandedadmin/:globId', element: <StudentExpandedAdmin /> },
  { path: '/teacherexpandedadmin/:globId', element: <TeacherExpandedAdmin /> }

]);
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GlobalProvider>
      <RouterProvider router={router} />
    </GlobalProvider>
  </React.StrictMode>,
)
