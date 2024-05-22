import React from 'react';
import Main from './Components/Main';
import Navbar from './Components/Navbar';
import './App.css'


function App({backendDomain}) {

  console.log(backendDomain)
  return (
    <div className='container'>
      <Navbar />
      <Main backendDomain={backendDomain}/>
    </div>
  );
}

export default App;
