import React, { useContext, useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import SERVERURL from '../services/serverurl';
import EditProperty from '../components/EditProperty';
import { addResponseContext, editResponseContext } from '../contexts/ContextAPI';
import { removePropertyAPI } from '../services/allAPI';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

 

function ViewPost() {
  const navigate = useNavigate()
  const {addResponse,setAddResponse} = useContext(addResponseContext)
  const {editResponse,setEditResponse} = useContext(editResponseContext)
  const { id } = useParams();
  const [propertyDetails, setPropertyDetails] = useState(null);
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    
    const fetchPropertyDetails = async () => {
      try {
        const token = sessionStorage.getItem('token');
        const response = await axios.get(`${SERVERURL}/property/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setPropertyDetails(response.data.property);
      } catch (error) {
        console.error('Error fetching property details:', error);
      }
    };

    
    const user = JSON.parse(sessionStorage.getItem('user'));
    setLoggedInUser(user);

    fetchPropertyDetails();
  }, [id,addResponse,editResponse]);

  if (!propertyDetails) {
    return <div>Loading...</div>;
  }

  
  const renderEditDeleteButtonsOrUsername = () => {
    if (loggedInUser && loggedInUser._id === propertyDetails.userId) {
      return (
        <div className='d-flex flex-column flex-nowrap p-2'>
          <div className='d-flex flex-row mt-1 mb-2 flex-wrap'>
            <button onClick={()=>{handleDelete(propertyDetails?._id)}} className='btn text-danger border-danger me-2'><i className="fa-solid fa-trash"></i>Delete Post</button>
            <EditProperty property={propertyDetails}/>
          </div>
        </div>
      );
    } else {
      return (
        <div className='d-flex flex-column flex-nowrap p-2'>
          <p className='text-muted mb-0'>Posted by: {propertyDetails.username}</p>
        </div>
      );
    }
  };

  const handleDelete = async (pid) => {
    const token = sessionStorage.getItem("token") 
    if (token) {
      const reqHeader = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
      try{
        const result = await removePropertyAPI(pid,reqHeader)
        if(result.status==200){

          toast.success("Property deleted successfully");
          setTimeout(() => {
            navigate('/mypost');
          }, 2000);
          setAddResponse(!addResponse);
    
 
        }else{
       console.log(result );
        }

      }catch(err){
       console.log(err); 
      }
  }
}


  return (
    <div>
      <Header />
      <div style={{ marginTop: '180px', paddingBottom: '120px' }} className='d-flex justify-content-center '>
        <div className="w-75 bg-light p-3 border rounded d-flex flex-column">
          <div className="d-flex flex-row justify-content-between">
            <h2 style={{ fontSize: '34px', fontWeight: '700' }} className='text-secondary ps-2 bold'>{propertyDetails.title}</h2>
            {renderEditDeleteButtonsOrUsername()}
          </div>

          <div className='w-100 p-3 d-flex justify-content-center'>
            <img className='img-fluid w-100' src={`${SERVERURL}/uploads/${propertyDetails.propertyImg}`} alt="" />
          </div>

          <div className='text-center mt-3'>
            <h3 className='mt-1' style={{ fontWeight: '700' }}>₹ {propertyDetails.price}</h3>
          </div>

          <div className="d-flex flex-row justify-content-evenly">
            <div className="p-2 d-flex flex-column">
              <h2 style={{ fontWeight: '600' }}>
                <i className="fa-solid fa-location-dot"></i>{propertyDetails.location}
              </h2>
              <p style={{ fontSize: '18px' }} className='fw-bold ps-3 mt-2'>
                <span>Purpose: </span>{propertyDetails.purpose}
              </p>
            </div>

            <div className="p-2 d-flex flex-column">
              <h2 style={{ fontWeight: '600' }}>
                <i className="fa-solid fa-phone"></i>{propertyDetails.contactNo}
              </h2>
              <p style={{ fontSize: '18px' }} className='fw-bold ps-3 mt-2'>
                <span>Type: </span>{propertyDetails.propertyType}
              </p>
            </div>
          </div>

          <div className="ps-3 pe-3">
            <p className='mb-1 fw-bold'>
              Description:
            </p>
            <div className="form-floating mb-3">
              <textarea
                style={{ height: '100px' }}
                className="form-control"
                name="description"
                id="Description"
                rows="3"
                placeholder="Description"
                value={propertyDetails.description}
                readOnly
              ></textarea>
              <label htmlFor="Description">Description</label>
            </div>
          </div>

        </div>
      </div>
      <Footer />
      <ToastContainer position='top-center' theme='colored' autoClose={3000}/>
    </div>
  );
}

export default ViewPost;
