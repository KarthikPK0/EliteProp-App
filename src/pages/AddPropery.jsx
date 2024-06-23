import React from 'react'
import Header from '../components/Header'
import { Form } from 'react-bootstrap'
import './AddProperty.css'
import Footer from '../components/Footer'




const AddPropery = () => {
  return (
    <div>
      <Header />
      <div style={{ marginTop: '180px',paddingBottom:'120px' }} className='d-flex justify-content-center'>
        <Form className='bg-light shadow border rounded p-3 w-75 '>

          <div className="row d-flex align-items-center ">

            <div className="col-md-6 mb-3">
              <div className='form-floating'>
                <input type="file" id="image" className='form-control' name="image" required />
                <label htmlFor="image">Image</label>
              </div>

            </div>
            <div className="col-md-6 mb-3">
              <div className='form-floating'>
                <input type="text" className='form-control' placeholder='Location' />
                <label htmlFor="Location">Location</label>
              </div>

            </div>
          </div>

              <div class="form-floating mb-3">
                <select id="pType" class="form-select" name="type" aria-label="Default select example" required>
                  <option selected>Select Property Type</option>
                  <option value="House">House</option>
                  <option value="Villa">Villa</option>
                  <option value="Apartment">Apartment</option>
                  <option value="Plot">Plot</option>
                  <option value="office">Office</option>
                  <option value="garage">Garage</option>
                  <option value="shop">Shop</option>
                </select>
                <label htmlFor="pType">Property Type</label>
              </div>


              {/* <div className='form-floating mb-3'>
                <input type="file" id="uploadDocument" className='form-control' name="uploadDocument" required />
                <label htmlFor="uploadDocument">Upload Document</label>
              </div> */}

              <div class="form-floating mb-3">
                <select id="purpose" class="form-select" name="purpose" aria-label="Default select example" required>
                  <option selected>Rent</option>
                  <option value="House">Rent</option>
                  <option value="Villa">Sale</option>

                </select>
                <label htmlFor="purpose">Purpose</label>
              </div>

              <div className="row d-flex align-items-center ">

                <div className="col-md-6 mb-3">
                  <div className='form-floating'>
                    <input type="text" className='form-control' placeholder='Price (in Rupees)' />
                    <label htmlFor="Price (in Rupees)">Price (in Rupees)</label>
                  </div>

                </div>
                <div className="col-md-6 mb-3">
                  <div className='form-floating'>
                    <input type="text" className='form-control' placeholder='Contact Number' />
                    <label for="Location">Contact Number</label>
                  </div>

                </div>
              </div>

              <div className='form-floating mb-3'>
                <input type="text" className='form-control' placeholder='Title' />
                <label htmlFor="Title">Title</label>

              </div>

              <div className='form-floating mb-3'>
                <textarea style={{ height: '100px' }} class="form-control" name="description" id="Description" rows="3" placeholder="Description" required></textarea>
                <label htmlFor="Location">Description</label>

              </div>

              <div className='form-floating mb-3'>
             <button className='btn border-primary btn-lg w-100 submitButton'>SUBMIT</button>

              </div>















        </Form>
    
      </div>
      <Footer/>
    </div>
  )
}

export default AddPropery
