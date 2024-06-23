import React from 'react'
import loginImg from '../assets/login.jpg'
import logo from '../assets/logo.png';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';


const Auth = ({insideRegister}) => {
  return (
      <div style={{width:'100%',height:'100vh'}} className='d-flex justify-content-center align-items-center'>
     <div className="container w-75 ">
      <div className="card shadow p-2">
      <div className="row align-items-center">
      <div className="col-lg-6">
          <img className='w-100' src={loginImg} alt="login" />
        </div>

        <div className="col-lg-6">
       <Link className='text-dark' style={{textDecoration:'none'}} to={'/'}>
       <h1 className='fw-bolder mt-2 d-flex align-items-center'>
           <img src={logo} className='img-fluid' style={{marginRight:'10px'}} height={'50px'} width={'50px'} alt="" />EliteProp

          </h1>
       </Link>

          <h5 className='fw-bolder mt-2'>
            Sign {insideRegister?'Up':'In'} to your Account
          </h5>

          <Form>
    {
      insideRegister &&
      <FloatingLabel
      controlId="floatingInputname"
      label="Username"
      className="mb-3"
    >
      <Form.Control type="text" placeholder="Username"  />
    </FloatingLabel>
    }

      <FloatingLabel controlId="floatingInput" label="Email address" className='mb-3'>
        <Form.Control type="email" placeholder="name@example.com"  />
      </FloatingLabel>

      
      <FloatingLabel controlId="floatingPassword" label="Password">
        <Form.Control type="password" placeholder="Password"  />
      </FloatingLabel>
          </Form>

          {
            insideRegister?

            <div className="mt-3">
              <button  className='btn btn-primary mb-2'>Register</button>
              <p>Already have an account? Click here to <Link to={'/login'}>Login</Link></p>
            </div>
            :
            <div className="mt-3">
            <button  className='btn btn-primary mb-2'>Login
        
            </button>
         

            <p>New User? Click here to <Link to={'/register'}>Register</Link></p>
          </div>
          }
        </div>
      </div>
      </div>
     </div>
   
    </div>
  )
}

export default Auth
