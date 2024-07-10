 
import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal'; 
import SERVERURL from '../services/serverurl';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { editPropertyAPI } from '../services/allAPI';
import { editResponseContext } from '../contexts/ContextAPI';
 
 

function EditProperty({property}) {

  const {editResponse,setEditResponse} = useContext(editResponseContext)

  const [imageFileStatus, setImageFileStatus] = useState(false)
  
  const [propertyDetails, setPropertyDetails] = useState({
    id:property?._id,
    location: property?.location,
    propertyType:property?.propertyType,
    purpose: property?.purpose,
    price: property?.price,
    contactNo: property?.contactNo,
    title: property?.title,
    description: property?.description,
    propertyImg: ""
  });
  
   const handleChange = (e) => {
    const { name, value } = e.target;
    setPropertyDetails((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };
  const [preview,setPreview] = useState() 
  const [show,setShow] = useState(false) 
  const handleClose = () => {
    setShow(false) 
    setPropertyDetails({ id:property?._id,
      location: property?.location,
      propertyType:property?.propertyType,
      purpose: property?.purpose,
      price: property?.price,
      contactNo: property?.contactNo,
      title: property?.title,
      description: property?.description,
      propertyImg: ""})

  } 
  const handleShow = () => {
    setShow(true); 
    setPropertyDetails({ id:property?._id,
      location: property?.location,
      propertyType:property?.propertyType,
      purpose: property?.purpose,
      price: property?.price,
      contactNo: property?.contactNo,
      title: property?.title,
      description: property?.description,
      propertyImg: ""})

  }

  
 
  useEffect(()=>{
    if(propertyDetails.propertyImg && (propertyDetails.propertyImg.type === "image/png" || propertyDetails.propertyImg.type === "image/jpg" || propertyDetails.propertyImg.type === "image/jpeg")){
      setPreview(URL.createObjectURL(propertyDetails.propertyImg))
       setImageFileStatus(true)
    }else{
      setImageFileStatus(false)
      setPreview("")
      setPropertyDetails({...propertyDetails,propertyImg:""})
    }

  },[propertyDetails.propertyImg])

  const handleUpdate = async () => {
    const {id,location,propertyType,purpose,price,contactNo,title,description,propertyImg} = propertyDetails
    if(location && propertyType && purpose && price && contactNo && title && description){
      //apicall
       //reqbody
   const reqBody = new FormData()
   reqBody.append("location",location)
   reqBody.append("propertyType",propertyType)
   reqBody.append("purpose",purpose)
   reqBody.append("price",price)
   reqBody.append("contactNo",contactNo)
   reqBody.append("title",title)
   reqBody.append("description",description)
   preview?reqBody.append("propertyImg",propertyImg):reqBody.append("propertyImg",property.propertyImg)
    const token = sessionStorage.getItem("token")
   if(token){
    const reqHeader = {
      "Content-Type":"multipart/form-data",
      "Authorization":`Bearer ${token}`
    }
    //api call
    try{

      const result = await editPropertyAPI(id,reqBody,reqHeader)
      console.log(result);
      if(result.status==200){      handleClose()
        //pass response view 
        setEditResponse(result)
      }else{
         console.log(result.response);
      }
  


    }catch(err){
      console.log(err);

    }
    
  }

    }
    else
    {
      toast.warning("Please fill the form completely!! ")

    }
  }

 


  return (
    <div>
       
    <button onClick={handleShow} className="btn  text-success border-success me-2">
    <i class="fa-solid fa-pen-to-square"></i> Edit Post
 </button>

   <Modal size='lg' centered
     show={show}
     onHide={handleClose}
     backdrop="static"
     keyboard={false}
   >
     <Modal.Header closeButton>
       <Modal.Title>New Property Details!!</Modal.Title>
     </Modal.Header>
      <Modal.Body>
       <div className="row align-items-center ">
         <div className="col-lg-4  ps-5 align-items-center">
           <label>
             <input
               type="file"
                id="image"
              
                style={{ display: "none" }}
                name="propertyImg"
                onChange={e => setPropertyDetails({ ...propertyDetails, propertyImg: e.target.files[0] })}
               
             />
             <img className="img-fluid" 
             src={preview?preview: `${SERVERURL}/uploads/${property.propertyImg}`}    />
            
                {!imageFileStatus &&
                  <div  style={{ fontSize: '11px', position: 'absolute', zIndex: '0' }} className="text-danger fw-bolder pt-3 ps-2 ">*Upload only the following  <br />  file types (jpeg,jpg,png) here!!</div>}
           </label>
          
         </div>
         <div className="col-lg-8 ps-5 pe-5 ">
           <div className="mb-2 form-floating">
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

           <div className="mb-2 form-floating">
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

           <div className="mb-2 form-floating">
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

           <div className="mb-2 form-floating">
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

           <div className="mb-2 form-floating">
           <input
                  type="text"
                  name="price"
                  value={propertyDetails.price}
                  onChange={handleChange} 
                  className='form-control'
                  placeholder='Price (in Rupees)'
                />
                <label htmlFor="price">Price (in Rupees)</label>
           </div>

           <div className="mb-2 form-floating">
           <input
                  type="text"
                  name="contactNo"
                  value={propertyDetails.contactNo}
                  onChange={handleChange}
                  className='form-control'
                  placeholder='Contact Number'
                />
                <label htmlFor="contactNo">Contact Number</label>
           </div>



         </div>
       </div>

       <div className='form-floating'>
       <textarea
              style={{ height: '100px' }}
              className="form-control"
              name="description"
              value={propertyDetails.description}
              onChange={handleChange}
            />
            <label htmlFor="description">Description</label>
       </div>
     </Modal.Body>
     <Modal.Footer>
       <Button variant="secondary" onClick={handleClose}>
         Cancel
       </Button>
       <Button onClick={handleUpdate} variant="primary">Submit</Button>
     </Modal.Footer>
   </Modal>
   <ToastContainer position='top-center' theme='colored' autoClose={3000}/>
 </div>
 
  )
}

export default EditProperty
  