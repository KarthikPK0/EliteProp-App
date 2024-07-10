import React, { useContext, useEffect, useState } from 'react';
import Header from '../components/Header';
import { Form } from 'react-bootstrap';
import './AddProperty.css';
import Footer from '../components/Footer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addPropertyAPI } from '../services/allAPI';
import { addResponseContext } from '../contexts/ContextAPI';
import { useNavigate } from 'react-router-dom';

const AddPropery = () => {
  const navigate = useNavigate();
  const { addResponse, setAddResponse } = useContext(addResponseContext);

  const [imageFileStatus, setImageFileStatus] = useState(false);
  const [propertyDetails, setPropertyDetails] = useState({
    location: "",
    propertyType: "",
    purpose: "",
    price: "",
    contactNo: "",
    title: "",
    description: "",
    propertyImg: null
  });
  
  useEffect(()=>{
    if(propertyDetails.propertyImg && (propertyDetails.propertyImg.type === "image/png" || propertyDetails.propertyImg.type === "image/jpg" || propertyDetails.propertyImg.type === "image/jpeg")){
    
       setImageFileStatus(true)
    }else{
      setImageFileStatus(false)
      
      setPropertyDetails({...propertyDetails,propertyImg:""})
    }

  },[propertyDetails.propertyImg])

  const [contactNoError, setContactNoError] = useState("");
  const [priceError, setPriceError] = useState("");
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPropertyDetails((prevState) => ({
      ...prevState,
      [name]: value
    }));

    if (name === "contactNo") {
      // Regular expression to validate phone number (assuming Indian format)
      const phoneRegex = /^[6-9]\d{9}$/;
      if (!phoneRegex.test(value)) {
        setContactNoError("Please enter a valid phone number");
      } else {
        setContactNoError("");
      }
    }

    if (name === "price") {
      // Regular expression to validate digits only
      const digitsRegex = /^\d+$/;
      if (!digitsRegex.test(value)) {
        setPriceError("Please enter digits only");
      } else {
        setPriceError("");
      }
    }
  };

  

  const handleAddProperty = async (e) => {
    e.preventDefault();
    const { location, propertyType, purpose, price, contactNo, title, description, propertyImg } = propertyDetails;
    if (location && propertyType && purpose && price && contactNo && title && description && propertyImg && !contactNoError) {
      const reqBody = new FormData();
      reqBody.append("location", location);
      reqBody.append("propertyType", propertyType);
      reqBody.append("purpose", purpose);
      reqBody.append("price", price);
      reqBody.append("contactNo", contactNo);
      reqBody.append("title", title);
      reqBody.append("description", description);
      reqBody.append("propertyImg", propertyImg);

      const token = sessionStorage.getItem("token");
      if (token) {
        const reqHeader = {
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${token}`
        };
        try {
          const result = await addPropertyAPI(reqBody, reqHeader);
          console.log(result);
          if (result.status === 200) {
            toast.success("Property added successfully!!");
            setTimeout(() => {
              navigate('/propertylist');
            }, 2000);
            setAddResponse(result);
            setPropertyDetails({
              location: "",
              propertyType: "",
              purpose: "",
              price: "",
              contactNo: "",
              title: "",
              description: "",
              propertyImg: null
            });
            document.getElementById("image").value = null;
          } else {
            toast.warning(result.response.data);
          }
        } catch (err) {
          console.log(err);
        }
      }
    } else {
      toast.info("Please fill the form completely and correctly!!");
    }
  };

  return (
    <div>
      <Header />
      <div style={{ marginTop: '180px', paddingBottom: '120px' }} className='d-flex justify-content-center'>
        <Form onSubmit={handleAddProperty} className='bg-light shadow border rounded p-3 w-75 '>
      
          <div className="row d-flex align-items-center">
            <div className="col-md-6 mb-3">
              <div className='form-floating'>
                <input
                  type="file"
                  id="image"
                  className='form-control'
                  name="propertyImg"
                  onChange={e => setPropertyDetails({ ...propertyDetails, propertyImg: e.target.files[0] })}
                  required
                />
                <label htmlFor="image">Image</label>
                {!imageFileStatus &&
                  <div style={{ fontSize: '10px', position: 'absolute', zIndex: '0' }} className="text-danger fw-bolder ps-2 ">*Upload only the following file types (jpeg, jpg, png) here!!</div>
                }
              </div>
            </div>
            {/* Location */}
            <div className="col-md-6 mb-3">
              <div className='form-floating'>
                <input
                  type="text"
                  name="location"
                  value={propertyDetails.location}
                  onChange={handleChange}
                  className='form-control'
                  placeholder='Location'
                />
                <label htmlFor="Location">Location</label>
              </div>
            </div>
          </div>

          {/* Property Type */}
          <div className="form-floating mb-3">
            <select
              id="pType"
              className="form-select"
              name="propertyType"
              value={propertyDetails.propertyType}
              onChange={handleChange}
              required
            >
              <option value="" disabled>Select Property Type</option>
              <option value="House">House</option>
              <option value="Villa">Villa</option>
              <option value="Apartment">Apartment</option>
              <option value="Plot">Plot</option>
              <option value="Office">Office</option>
              <option value="Garage">Garage</option>
              <option value="Shop">Shop</option>
            </select>
            <label htmlFor="pType">Property Type</label>
          </div>

          {/* Purpose */}
          <div className="form-floating mb-3">
            <select
              id="purpose"
              className="form-select"
              name="purpose"
              value={propertyDetails.purpose}
              onChange={handleChange}
              required
            >
              <option value="" disabled>Select Purpose</option>
              <option value="Rent">Rent</option>
              <option value="Sale">Sale</option>
            </select>
            <label htmlFor="purpose">Purpose</label>
          </div>

          {/* Price and Contact Number */}
          <div className="row d-flex align-items-center">
            {/* Price */}
            <div className="col-md-6 mb-3">
              <div className='form-floating'>
                <input
                  type="text"
                  name="price"
                  value={propertyDetails.price}
                  onChange={handleChange}
                  className='form-control'
                  placeholder='Price (in Rupees)'
                />
                <label htmlFor="price">Price (in Rupees)</label>
                {priceError && <div className="text-danger fw-bolder ps-2">{priceError}</div>}
              </div>
            </div>
            {/* Contact Number */}
            <div className="col-md-6 mb-3">
              <div className='form-floating'>
                <input
                  type="text"
                  name="contactNo"
                  value={propertyDetails.contactNo}
                  onChange={handleChange}
                  className='form-control'
                  placeholder='Contact Number'
                />
                <label htmlFor="contactNo">Contact Number</label>
                {contactNoError && <div className="text-danger fw-bolder ps-2">{contactNoError}</div>}
              </div>
            </div>
          </div>

          {/* Title */}
          <div className='form-floating mb-3'>
            <input
              type="text"
              name="title"
              value={propertyDetails.title}
              onChange={handleChange}
              className='form-control'
              placeholder='Title'
            />
            <label htmlFor="title">Title</label>
          </div>

          {/* Description */}
          <div className='form-floating mb-3'>
            <textarea
              style={{ height: '100px' }}
              className="form-control"
              name="description"
              value={propertyDetails.description}
              onChange={handleChange}
              id="description"
              rows="3"
              placeholder="Description"
              required
            />
            <label htmlFor="description">Description</label>
          </div>

          {/* Submit Button */}
          <div className='form-floating mb-3'>
            <button type='submit' className='btn border-primary btn-lg w-100 submitButton'>SUBMIT</button>
          </div>
        </Form>
      </div>
      <Footer />
      <ToastContainer position='top-center' theme='colored' autoClose={3000} />
    </div>
  );
}

export default AddPropery;
