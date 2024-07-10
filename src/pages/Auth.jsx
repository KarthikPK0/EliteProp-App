import React, { useContext, useState } from 'react';
import clsx from 'clsx'; 
import loginImg from '../assets/login.jpg';
import logo from '../assets/logo.png';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { loginAPI, registerAPI } from '../services/allAPI';
import { Spinner } from 'react-bootstrap';
import { tokenAuthContext } from '../contexts/AuthContext';

const Auth = ({ insideRegister }) => {
  const { isAuthorised, setIsAuthorised } = useContext(tokenAuthContext);
  const [isLoggedin, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    username: "", email: "", password: ""
  });
  const [errors, setErrors] = useState({
    username: "", email: "", password: ""
  });

  const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;
    return re.test(String(email).toLowerCase());
  };

  const validateForm = () => {
    let valid = true;
    let newErrors = { username: "", email: "", password: "" };

    if (insideRegister && !userData.username) {
      newErrors.username = "Username is required";
      valid = false;
    }

    if (!userData.email || !validateEmail(userData.email)) {
      newErrors.email = "Enter a valid email";
      valid = false;
    }

    if (!userData.password) {
      newErrors.password = "Password is required";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const result = await registerAPI(userData);
        console.log(result);

        if (result.status === 200) {
          toast.success(`Welcome ${result?.data?.username}... Please login to explore our website!!`);
          setUserData({ username: "", email: "", password: "" });
          navigate('/login');
        } else {
          if (result.response.status === 406) {
            toast.error(result.response.data);
            setUserData({ username: "", email: "", password: "" });
          }
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      toast.info("Please fill the form completely!!");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const result = await loginAPI(userData);
        console.log(result);

        if (result.status === 200) {
          setIsLoggedIn(true);
          sessionStorage.setItem("user", JSON.stringify(result.data.user));
          sessionStorage.setItem("token", result.data.token);
          setIsAuthorised(true);
          
          setTimeout(() => {
            setUserData({ username: "", email: "", password: "" });
            setIsLoggedIn(false);
            navigate('/');
          }, 2000);
        } else {
          if (result.response.status === 404) {
            toast.error(result.response.data);
          }
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      toast.info("Please fill the form completely!!");
    }
  };

  return (
    <div style={{ width: '100%', height: '100vh' }} className='d-flex justify-content-center align-items-center'>
      <div className="container w-75">
        <div className="card shadow p-2">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <img className='w-100' src={loginImg} alt="login" />
            </div>

            <div className="col-lg-6">
              <Link className='text-dark' style={{ textDecoration: 'none' }} to={'/'}>
                <h1 className='fw-bolder mt-2 d-flex align-items-center'>
                  <img src={logo} className='img-fluid' style={{ marginRight: '10px' }} height={'50px'} width={'50px'} alt="" />
                  EliteProp
                </h1>
              </Link>

              <h5 className='fw-bolder mt-2'>
                Sign {insideRegister ? 'Up' : 'In'} to your Account
              </h5>

              <Form>
                {insideRegister &&
                  <FloatingLabel controlId="floatingInputname" label="Username" className="mb-3">
                    <Form.Control type="text" placeholder="Username" value={userData.username} onChange={e => setUserData({ ...userData, username: e.target.value })} />
                    {errors.username && <p className="text-danger">{errors.username}</p>}
                  </FloatingLabel>
                }

                <FloatingLabel controlId="floatingInput" label="Email address" className='mb-3'>
                  <Form.Control type="email" placeholder="name@example.com" value={userData.email} onChange={e => setUserData({ ...userData, email: e.target.value })} />
                  {errors.email && <p className="text-danger">{errors.email}</p>}
                </FloatingLabel>

                <FloatingLabel controlId="floatingPassword" label="Password">
                  <Form.Control type="password" placeholder="Password" value={userData.password} onChange={e => setUserData({ ...userData, password: e.target.value })} />
                  {errors.password && <p className="text-danger">{errors.password}</p>}
                </FloatingLabel>
              </Form>

              {insideRegister ?
                <div className="mt-3">
                  <button onClick={handleRegister} className='btn btn-primary mb-2'>Register</button>
                  <p>Already have an account? Click here to <Link to={'/login'}>Login</Link></p>
                </div>
                :
                <div className="mt-3">
                  <button onClick={handleLogin} className='btn btn-primary mb-2 d-flex align-items-center'>Login
                    {isLoggedin &&
                      <Spinner animation="border" size="sm" className='ms-1' variant="light" />
                    }
                  </button>
                  <p>New User? Click here to <Link to={'/register'}>Register</Link></p>
                </div>
              }
            </div>
          </div>
        </div>
      </div>
      <ToastContainer position='top-center' theme='colored' autoClose={3000} />
    </div>
  );
}

export default Auth;
