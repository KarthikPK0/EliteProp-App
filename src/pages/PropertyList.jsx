import React, { useContext, useEffect, useState } from 'react';
import Header from '../components/Header';
import { Col, Row } from 'react-bootstrap';
import PropertyCard from '../components/PropertyCard';
import Footer from '../components/Footer';
import { allPropertyAPI } from '../services/allAPI';
import { addResponseContext } from '../contexts/ContextAPI';

const PropertyList = () => {

  const {addResponse,setAddResponse} = useContext(addResponseContext)

 
  const [allProperties, setAllProperties] = useState([]);

  const [propertyType, setPropertyType] = useState('');
  const [location, setLocation] = useState('');


  console.log(allProperties);

  useEffect(() => {
    getAllProperties();
  }, [addResponse]);

  const getAllProperties = async () => {
    const token = sessionStorage.getItem("token");
    if (token) {
      const reqHeader = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      };
      try {
        const result = await allPropertyAPI(reqHeader, propertyType, location);
        if (result.status === 200) {
          setAllProperties(result.data);
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleSearch = () => {
    getAllProperties();
  };
  return (
    <>
      <Header />
      <div style={{ marginTop: '150px', backgroundColor: '#add8e6' }} className="row border p-5">
        <div className="col-md-3"></div>
        <div className="col-md-3">
        <select 
            className="form-select border-0 py-3" 
            name="type" 
            value={propertyType} 
            onChange={(e) => setPropertyType(e.target.value)}
          >
            <option value="">Property Type</option>
            <option value="Office">Office</option>
            <option value="Apartment">Apartment</option>
            <option value="Plot">Plot</option>
            <option value="Garage">Garage</option>
            <option value="Shop">Shop</option>
            <option value="Villa">Villa</option>
            <option value="House">House</option>
          </select>
        </div>
        <div className="col-md-3">
          <select 
            className="form-select border-0 py-3" 
            name="location" 
            value={location} 
            onChange={(e) => setLocation(e.target.value)}
          >
            <option value="">Location</option>
            <option value="Ernakulam">Ernakulam</option>
            <option value="Thiruvananthapuram">Thiruvananthapuram</option>
            <option value="Thrissur">Thrissur</option>
            <option value="Kochi">Kochi</option>
            <option value="Kayamkulam">Kayamkulam</option>
            <option value="Kollam">Kollam</option>
            <option value="Bangalore">Bangalore</option>
            <option value="Kottarakkara">Kottarakkara</option>
            <option value="Malappuram">Malappuram</option>
          </select>
        </div>
        <div className="col-md-3">
          <button 
            className="btn btn-secondary border-0 py-3" 
            style={{ width: '150px' }} 
            type="button" 
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
      </div>

      <Row className='mt-5 mx-3 ms-4'>
        {
          allProperties?.length > 0 ?
            allProperties.map(property => (
              <Col key={property?._id} className='mb-4' sm={12} md={6} lg={4}>
                <PropertyCard displayData={property} />

              </Col>
            ))
            :
            <div className="fw-bolder text-danger m-5 text-center">Property Not Found!!</div>
        }
      </Row>

      <Footer />
    </>
  );
}

export default PropertyList;
