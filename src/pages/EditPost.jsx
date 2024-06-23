import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import cardImage from '../assets/card-image.webp'

const EditPost = () => {
  return (
    <>
      <Header />
      <div style={{ marginTop: '180px', paddingBottom: '120px' }} className='d-flex justify-content-center '>
        <div className="w-75 bg-light p-3  border rounded d-flex flex-column">
          <div className="d-flex flex-row justify-content-between  ">
            <h2 style={{ fontSize: '34px', fontWeight: '700' }} className='text-secondary ps-2 bold'>New Villa for rent</h2>
            <div className='d-flex flex-column flex-nowrap p-2  '>
              <p className='mb-0'><span>Posted On:</span>June 22, 2024, 7:27 p.m</p>
              <p className='mb-0'><span>Posted By:</span> Karthik P K</p>

              <div className='d-flex flex-row mt-1 mb-2 flex-wrap '>

                <button className='btn text-danger border-danger me-2 '><i class="fa-solid fa-trash"></i>Delete Post</button>

                <button className='btn text-success border-success'><i class="fa-solid fa-pen-to-square"></i>Edit post</button>
              </div>
            </div>
          </div>


          <div className='w-100 p-3' >
            <img className='img-fluid' src={cardImage} alt="" />
          </div>

          <div className='text-center mt-3'>
            <h3 className='mt-1' style={{ fontWeight: '700' }}>₹ 50000</h3>
            {/* <button style={{backgroundColor:'#000080'}} className='btn text-light'>View Document</button> */}
          </div>

          <div className="d-flex flex-row justify-content-evenly">
            <div className="p-2 d-flex flex-column">
              <h2 style={{ fontWeight: '600' }}>
                <i className="fa-solid fa-location-dot"></i>Bangalore
              </h2>
              <p style={{ fontSize: '18px' }} className='fw-bold ps-3 mt-2'>
                <span>Purpose: </span>Rent
              </p>
            </div>

            <div className="p-2 d-flex flex-column">
              <h2 style={{ fontWeight: '600' }}>
                <i className="fa-solid fa-phone"></i>8086006553
              </h2>
              <p style={{ fontSize: '18px' }} className='fw-bold ps-3 mt-2'>
                <span>Type: </span>Apartment
              </p>
            </div>
          </div>

          <div className="ps-3 pe-3">
          <p className='mb-1 fw-bold' >
            Description:
          </p>
          <div className="form-floating mb-3">
            <textarea style={{ height: '100px' }} className="form-control" name="description" id="Description" rows="3" placeholder="Description" required> </textarea>
            <label htmlFor="Description">Description</label>
          </div>
          </div>
      


        </div>



      </div>
      <Footer />
    </>
  )
}

export default EditPost
