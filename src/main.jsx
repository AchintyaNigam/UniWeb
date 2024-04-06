import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

import SignUp from './Components/SignUp.jsx'
import StudentSignUp from './Components/SignUpStudent.jsx'
import TeacherSignUp from './Components/TeacherSignUp.jsx'
import HomeStudent from './Components/HomeStudent.jsx'
import HomeTeacher from './Components/HomeTeacher.jsx'

import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter([
  {path:'/', element: <App />},
  {path:'/signup', element: <SignUp />},
  {path:'/studentsignup', element: <StudentSignUp />},
  {path:'/teachersignup', element:<TeacherSignUp />},
  {path:'/homestudent', element:<HomeStudent />},
  {path:'/hometeacher', element:<HomeTeacher />}
]);
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
