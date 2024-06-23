import React from 'react'
import Header from '../components/Header'
import PropertyCard from '../components/PropertyCard'
import { Row,Col } from 'react-bootstrap'
import './MyPost.css';
import Footer from '../components/Footer';



const MyPost = () => {
  return (
    <>
    <Header/>
    <div style={{ marginTop: '180px',paddingBottom:'120px' }}  className='d-flex justify-content-center'>
      <div className="w-75 bg-light p-3 border rounded d-flex flex-column">
    <div className="d-flex flex-row justify-content-between align-items-center ">
    <h2 style={{fontSize:'34px', fontWeight:'700'}} className='text-secondary ps-2 bold'>My Post</h2>
        <div className='d-flex flex-row flex-nowrap p-2  '>
          <button style={{backgroundColor:'#000080'}} className='btn text-light me-2 featured' id='featured'>Featured</button>
          <button style={{border:'solid 1px #000080 '}} className='btn me-2 normal'>For Sell</button>
          <button style={{border:'solid 1px #000080 '}}  className='btn normal'>For Rent</button>

        </div>
    </div>
    <Row className='mt-4 pb-5  ps-3 pe-3'>
             <Col className='mb-3' sm={12} md={6} lg={4}>
             <PropertyCard/>
             </Col>
               
      </Row>
    
    
      </div>

      

    </div>
    <Footer/>
     
    </>
  )
}

export default MyPost
