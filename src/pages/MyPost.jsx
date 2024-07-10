import React, { useContext, useEffect, useState } from 'react';
import Header from '../components/Header';
import PropertyCard from '../components/PropertyCard';
import { Row, Col } from 'react-bootstrap';
import './MyPost.css';
import Footer from '../components/Footer';
import { userPropertyAPI } from '../services/allAPI';
import { addResponseContext } from '../contexts/ContextAPI';

const MyPost = () => {
  const { addResponse, setAddResponse } = useContext(addResponseContext);
  const [userProjects, setUserProjects] = useState([]);
  const [filter, setFilter] = useState('');  

  useEffect(() => {
    getUserProject();
  }, [addResponse, filter]);  

  const getUserProject = async () => {
    const token = sessionStorage.getItem('token');
    if (token) {
      const reqHeader = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      };
      try {
        const result = await userPropertyAPI(reqHeader, filter);  
        console.log(result);
        if (result.status === 200) {
          setUserProjects(result.data);
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

   
  const handleFilterChange = (purpose) => {
    setFilter(purpose);
  };

  return (
    <>
      <Header />
      <div style={{ marginTop: '180px', paddingBottom: '120px' }} className='d-flex justify-content-center'>
        <div className="w-75 bg-light p-3 border rounded d-flex flex-column">
          <div className="d-flex flex-row justify-content-between align-items-center ">
            <h2 style={{ fontSize: '34px', fontWeight: '700' }} className='text-secondary ps-2 bold'>My Post</h2>
            <div className='d-flex flex-row flex-nowrap p-2'>
              <button
                style={{ backgroundColor: '#000080' }}
                className='btn text-light me-2 featured'
                id='featured'
                onClick={() => handleFilterChange('')}
              >
                Featured
              </button>
              <button
                style={{ border: 'solid 1px #000080' }}
                className='btn me-2 normal'
                onClick={() => handleFilterChange('Sale')}
              >
                For Sell
              </button>
              <button
                style={{ border: 'solid 1px #000080' }}
                className='btn normal'
                onClick={() => handleFilterChange('Rent')}
              >
                For Rent
              </button>
            </div>
          </div>
          <Row className='mt-4 pb-5' style={{ paddingLeft: "50px" }}>
            {
              userProjects?.length > 0 ?
                userProjects.map(property => (
                  <Col className='mb-3' sm={12} md={6} lg={6} key={property?._id}>
                    <PropertyCard displayData={property} />
                  </Col>
                ))
                :
                <div className="fw-bolder text-warning">No Properties Uploaded Yet!!</div>
            }
          </Row>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default MyPost;
