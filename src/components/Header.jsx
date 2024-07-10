import React, { useState, useEffect, useContext } from 'react';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import logo from '../assets/logo.png';
import './Header.css'
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { tokenAuthContext } from '../contexts/AuthContext';

const Header = () => {
  const {isAuthorised,setIsAuthorised} = useContext(tokenAuthContext)
  const navigate = useNavigate() 
  const [username, setUsername] = useState("")
  const [scrollPosition, setScrollPosition] = useState(0);

  const handleScroll = () => {
    setScrollPosition(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if(sessionStorage.getItem("user")){
      setUsername(JSON.parse(sessionStorage.getItem("user")).username)
    } else {
      setUsername("")
    }
  }, []);

  const navbarStyle = {
    zIndex: '10',
    top: scrollPosition > 40 ? '0' : '40px',
    width: scrollPosition > 40 ? '100%' : '90%',
    transition: 'top 0.3s, width 0.3s',
  };

  const handleProperty = () => {
    const token = sessionStorage.getItem("token");
    //console.log('Token:', token);  
    if(token){
      navigate('/propertylist')
    } else {
      toast.warning('Please login to get full access to our website!!')
    }
  }

  const handleLogout = () => {
    sessionStorage.clear();
    setIsAuthorised(false)
    navigate('/');
  }

  return (
    <div className='d-flex justify-content-center'>
      <Navbar   expand="lg" className="bg-body-tertiary position-fixed shadow" style={navbarStyle}>
        <Container>
          <Navbar.Brand style={{ display: 'flex', alignItems: 'center', gap: '20px' }} as={Link} to="/">
            <img src={logo} width={''} height={'50px'} alt="" />
            <span style={{ fontSize: '36px', fontWeight: '600', color: '#000080' }}>EliteProp</span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto" style={{ fontWeight: '500', fontSize: '17px' }}>
              <Nav.Link as={Link} to="/" style={{ color: '#000080', marginRight: '5px' }}>HOME</Nav.Link>
              <NavDropdown title="PROPERTY" id="basic-nav-dropdown" style={{ marginRight: '5px' }}>
                <NavDropdown.Item onClick={handleProperty}>Property List</NavDropdown.Item>
              </NavDropdown>
              {
                sessionStorage.getItem("token") ?
                  <Nav.Link as={Link} to="/addproperty" id='navItem' style={{ marginRight: '15px' }}>ADD PROPERTY</Nav.Link>
                  :
                  <Nav.Link as={Link} to="/login" id='navItem' style={{ marginRight: '15px' }}>ADD PROPERTY</Nav.Link>
              }
              {
                sessionStorage.getItem("token") ?
                  <NavDropdown
                    title={
                      <span>
                        <i className="fa-solid fa-circle-user" style={{ marginRight: '5px' }}></i>
                        {username.split(" ")[0]}
                      </span>
                    }
                    id="basic-nav-dropdown"
                    style={{ marginRight: '5px' }}
                  >
                    <NavDropdown.Item as={Link} to="/mypost">My Post</NavDropdown.Item>
                    <NavDropdown.Item onClick={handleLogout}>Log Out</NavDropdown.Item>
                  </NavDropdown>
                  :
                  <Link to={'/login'} style={{ backgroundColor: '#000080', color: '#ddd' }} className='btn d-flex align-items-center'>
                    <i className="fa-regular fa-user" style={{ marginRight: '5px' }}></i>
                    Sign in
                  </Link>
              }
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <ToastContainer position='top-center' theme='colored' autoClose={3000} />
    </div>
  );
};

export default Header;
