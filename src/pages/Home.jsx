import React from 'react';
import Header from '../components/Header';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import aboutImg from '../assets/about.jpg';
import Footer from '../components/Footer';
import './Home.css';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import carousel1 from '../assets/carousel-1.jpg';
import carousel2 from '../assets/carousel-2.jpg';

const Home = () => {
  const navigate = useNavigate();
  const handleProperty = () => {
    if (sessionStorage.getItem("token")) {
      navigate('/propertylist');
    } else {
      toast.warning('Please login to get full access to our website!!');
    }
  };

  return (
    <div>
      <Header />
      <div className="row homerow">
        <div className="col-12 col-md-6 p-5 bg-light d-flex flex-column justify-content-center">
          <div>
            <h3 className='fs-10 fw-bold mt-3'>Hi, User</h3>
            <h1 className='fw-bolder fs-10'>
              Find A <span style={{ color: '#000080' }}>Perfect Home</span> To <br /> Live With Your Family
            </h1>
            <p className='mt-3'>Unlocking your potential and giving you the freedom to focus on what matters most.</p>
          </div>
          <div className='mt-2'>
            {
              sessionStorage.getItem("token") ?
                <Link onClick={handleProperty} to={'/propertylist'} style={{ backgroundColor: '#000080', color: '#ddd' }} className='btn btn-lg'>
                  Explore us
                </Link> :
                <Link to={'/login'} style={{ backgroundColor: '#000080', color: '#ddd' }} className='btn btn-lg'>
                  Get Started
                </Link>
            }
          </div>
        </div>

        <div className="col-12 col-md-6 bg-light">
          <Carousel slide={false}>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={carousel1}
                alt="First slide"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={carousel2}
                alt="Second slide"
              />
            </Carousel.Item>
          </Carousel>
        </div>
      </div>

      <div className="row homerow2 bg-light" style={{ paddingBottom: '80px' }}>
        <div className="col-12 col-md-6 pt-5 bg-light d-flex justify-content-end" style={{ paddingRight: '30px' }}>
          <img src={aboutImg} width={'auto'} height={'500px'} alt="about-image" />
        </div>
        <div className="col-12 col-md-6 bg-light pt-5 flex-column text-start justify-content-center align-content-center">
          <div>
            <h2 className='fw-bold' style={{ fontSize: '2.2em' }}>
              You are not buying a <br /> house, you are buying a <br />lifestyle.
            </h2>
            <p className='mt-4'>
              Purchasing a home goes beyond just acquiring a physical structure; it <br /> involves investing in a particular way of life.
            </p>
          </div>
          <div className='mt-4'>
            <p className='d-flex align-items-center'><i className="fa-solid fa-check" style={{ color: '#000080', fontSize: '22px', marginRight: '14px' }}></i>Your dream home, just a search away</p>
            <p className='d-flex align-items-center'><i className="fa-solid fa-check" style={{ color: '#000080', fontSize: '22px', marginRight: '14px' }} ></i>Simplify property management, amplify results</p>
            <p className='d-flex align-items-center'><i className="fa-solid fa-check" style={{ color: '#000080', fontSize: '22px', marginRight: '14px' }}></i>Welcome to our real estate solution</p>
          </div>
        </div>
      </div>

      <Footer />
      <ToastContainer position='top-center' theme='colored' autoClose={3000} />
    </div>
  );
};

export default Home;
