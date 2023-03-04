import React, {useEffect, useState} from "react";
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import {Routes, Route,useNavigate,useParams} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';


//theme
import "primereact/resources/themes/saga-blue/theme.css";     
    
//core
import "primereact/resources/primereact.min.css";

//icons
import "primeicons/primeicons.css";   

import "primeflex/primeflex.css"
        


function App() {
  return (
    <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='/login' element={<Login />}/>

      <Route path='/dashboard' element={<Dashboard />}/>
    </Routes>
  )
}


export default App;
