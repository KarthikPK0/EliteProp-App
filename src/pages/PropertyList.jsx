import React from 'react'
import Header from '../components/Header'
import { Col, Row } from 'react-bootstrap'
import PropertyCard from '../components/PropertyCard'
import Footer from '../components/Footer'

const PropertyList = () => {
  return (
    <>
      <Header />
      <div style={{ marginTop: '150px', backgroundColor: '#add8e6' }} className="row  border p-5">
        <div className="col-md-3"></div>
        <div className="col-md-3"><select className="form-select border-0 py-3" name="type">
          <option selected>Property Type</option>
          <option value="Office">Office</option>
          <option value="Apartment">Apartment</option>
          <option value="Plot">Plot</option>
          <option value="Garage">Garage</option>
          <option value="Shop">Shop</option>
          <option value="Villa">Villa</option>
          <option value="House">House</option>
        </select></div>
        <div className="col-md-3">
          <select className="form-select border-0 py-3" name="location">
            <option selected>Location</option>
            <option value="Ernakulam">Ernakulam</option>
            <option value="Thiruvananthapuram">Thiruvananthapuram</option>
            <option value="Thrissur">Thrissur</option>
            <option value="Kochi">Kochi</option>
            <option value="Kayamkulam">Kayamkulam</option>
            <option value="Kollam">Kollam</option>
            <option value="Adoor">Adoor</option>
            <option value="Kottarakkara">Kottarakkara</option>
            <option value="Malappuram">Malappuram</option>
          </select>
        </div>
        <div className="col-md-3"><button className="btn btn-secondary border-0 py-3 " style={{ width: '150px' }} type="submit">Search</button></div>
      </div>
       
      <Row className='mt-5 pb-5  ps-3 pe-3'>
             <Col className='mb-3' sm={12} md={6} lg={4}>
             <PropertyCard/>
         
             </Col>
               
      </Row>

      <Footer/>

      

    </>
  )
}

export default PropertyList
