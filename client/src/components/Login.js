import React, { useState,useRef } from 'react';
import { Routes, useNavigate } from 'react-router-dom';

import Dashboard from './Dashboard';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import {
    MDBContainer,
    MDBInput,
    MDBCheckbox,
    MDBBtn,
    MDBIcon
 }
  from 'mdb-react-ui-kit';
  import { Toast } from 'primereact/toast';
function Login() {
   
    const toast = useRef(null);
    const [suc, setsuc] = useState("Enter credentials!");
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const showError = () => {
    toast.current.show({severity:'error', summary: 'Error', detail:'Wrong Credentials!', life: 3000});
}

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    if (response.ok) {
      // Redirect the user to the home page
     setsuc("You are logged in!")
     console.log("login successful");
     navigate('/dashboard')
    } else {
      // Display an error message
      setsuc("Wrong password / Email!")
      showError();
    }
  };

  return (
    
      
      <MDBContainer className="p-3 my-5 d-flex text-center flex-column w-25">
        <Toast className="m-2" ref={toast} />
        <form onSubmit={handleSubmit}>

      <MDBInput wrapperClass='mb-4'  label='Email address' id='form1' type='email' onChange={(event) => setUsername(event.target.value)}/>
      <MDBInput wrapperClass='mb-4' label='Password' id='form2' type='password' onChange={(event) => setPassword(event.target.value)}/>

      <div className="d-flex justify-content-between mx-3 mb-4">
        <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Remember me' />
        <a href="!#">Forgot password?</a>
      </div>

      <MDBBtn className="my-4 position-relative top-75 start-50 translate-middle w-100" type="submit">Sign in</MDBBtn>

      <div className="text-center">
        <p>Not a member? <a href="#!">Register</a></p>
        <p>or sign up with:</p>

        <div className='d-flex justify-content-between mx-auto' style={{width: '40%'}}>
          <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
            <MDBIcon fab icon='facebook-f' size="sm"/>
          </MDBBtn>

          <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
            <MDBIcon fab icon='twitter' size="sm"/>
          </MDBBtn>

          <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
            <MDBIcon fab icon='google' size="sm"/>
          </MDBBtn>

          <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
            <MDBIcon fab icon='github' size="sm"/>
          </MDBBtn>

        </div>
      </div>
      
        </form>
        <h5 className="my-3">{suc}</h5>
        
    </MDBContainer>
      
     

  );
 
}

export default Login;
