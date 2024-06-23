import React from 'react'
import { Button, Card } from 'react-bootstrap'
import cardImage from '../assets/card-image.webp'
import { Link } from 'react-router-dom'
import './PropertyCard.css'




const PropertyCard = () => {
  return (
    <>
      <Card className='mb-3' style={{ width: '25rem', marginRight: '100px' }}>

      <div className="card-image-container">
      <Link to={'/editpost'}>
      <img
          className='card-img-top img-fluid'
          src={cardImage}
          alt='Card image'
        />
      </Link>
      </div>
        <div  style={{backgroundColor:'#000080'}}  className="btn rounded text-white position-absolute start-0 top-0 m-4 py-1 px-3">
          For Rent
        </div>
        <div style={{color:'#000080' }} class="btn bg-white rounded-top position-absolute start-0 top-50 mx-4 pt-1 px-3 " >
          Apartment
        </div>
        <Card.Body>
          <Card.Title > <h5 style={{
            fontWeight: '600', fontSize: '20px'
            , color: '#000080'
          }} >&#x20B9; 50000</h5>  </Card.Title>
          <Card.Text>
            <Link style={{ textDecoration: 'none', fontSize: '22px', fontWeight: '600' }} className='text-dark'>Apartment for Rent</Link>
            <p className='mt-1' style={{ color: '#555' }} ><i className="fa-solid fa-location-dot me-1" style={{ color: '#000080' }} ></i>Kochi</p>
          </Card.Text>
        </Card.Body>

        <div className="container-fluid border-top d-flex pt-2 pb-2  ">
          <div className="col-md-6 d-flex justify-content-center align-items-center  " style={{ color: '#555' }}><i class="fa-solid fa-circle-user"></i>Username</div>
          <div className="col-md-6 d-flex justify-content-start align-items-center " style={{ color: '#555' }} >
            <i className="fa-solid fa-gear"></i> Buyer/Owner/Tenant
          </div>
        </div>
      </Card>

    </>
  )
}

export default PropertyCard
