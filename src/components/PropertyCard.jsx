import React, { useEffect, useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import SERVERURL from '../services/serverurl';
import { getUserDetailsAPI } from '../services/allAPI';
import './PropertyCard.css';


const PropertyCard = ({ displayData }) => {
  const [username, setUsername] = useState('');

  useEffect(() => {
    fetchUsername();
  }, []);

  const fetchUsername = async () => {
    try {
      const token = sessionStorage.getItem('token');
      if (token) {
        const reqHeader = {
          Authorization: `Bearer ${token}`,
        };
        const result = await getUserDetailsAPI(displayData.userId, reqHeader);
       
        setUsername(result.data.username);
      }
    } catch (error) {
      console.error('Error fetching username:', error);
    }
  };

  return (
    <>
      <Card className='mb-3' style={{ width: '24rem' }}>
        <div className="card-image-container">
          <Link to={`/viewpost/${displayData._id}`}>
            <img
              className='card-img-top img-fluid'
              src={`${SERVERURL}/uploads/${displayData.propertyImg}`}
              alt='Card image'
            />
          </Link>
        </div>
        <div style={{ backgroundColor: '#000080' }} className="btn rounded text-white position-absolute start-0 top-0 m-4 py-1 px-3">
          {displayData?.purpose}
        </div>
        <div style={{ color: '#000080' }} className="btn bg-white rounded-top position-absolute start-0 top-50 mx-4 pt-1 px-3 ">
          {displayData?.propertyType}
        </div>
        <Card.Body>
          <Card.Title>
            <h5 style={{
              fontWeight: '600', fontSize: '20px', color: '#000080'
            }}>
              &#x20B9; {displayData?.price}
            </h5>
          </Card.Title>
          <Card.Text>
            <Link style={{ textDecoration: 'none', fontSize: '22px', fontWeight: '600' }} className='text-dark'>
              {displayData?.title}
            </Link>
          </Card.Text>
          <p className='mt-1' style={{ color: '#555' }}>
            <i className="fa-solid fa-location-dot me-1" style={{ color: '#000080' }}></i>
            {displayData?.location}
          </p>
        </Card.Body>
        <div className="container-fluid border-top d-flex pt-2 pb-2">
          <div className="col-md-6 d-flex justify-content-center align-items-center" style={{ color: '#555' }}>
            <span className="text-dark">Posted By: <i className="fa-solid fa-circle-user"></i> {username}</span>
          </div>
          <div className="col-md-6"  >
            
          </div>
        </div>
      </Card>
    </>
  );
}

export default PropertyCard;
