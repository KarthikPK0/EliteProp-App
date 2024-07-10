import React from 'react'
import './Footer.css'
import { Link } from 'react-router-dom'




const Footer = () => {
  return (
<div>
  <div className="row footer shadow border" style={{paddingTop:'10px',paddingBottom:'10px'}}>
    
    <div className="col-12 col-md-3 p-5 c1">
      <h3>EliteProp</h3>
      <p>
      Providing top-tier real estate management services to enhance property value and ensure seamless operations.

      </p>
    </div>

  
    <div className="col-12 col-md-3 p-5"><h3>Quick Links</h3>
    <ul>
      <li><a href=""> About Us </a></li>
      <li><a href="">Contact Us </a></li>
      <li><a href="">Our Services</a></li>
      <li><a href="">Privacy  Policy</a></li>
     
    </ul>
    </div>
    <div className="col-12 col-md-3 p-5"><h3>Contact</h3>
         <ul>
          <li><i className="fa-solid fa-location-dot" style={{marginRight:'5px'}}></i>123 Street, Kasaragod, Kerala</li>
          <li><i className="fa-solid fa-phone " style={{marginRight:'5px'}}></i>80860065553</li>
          <li><i className="fa-solid fa-envelope" style={{marginRight:'5px'}}></i>eliteprop@gmail.com</li>
         </ul>

         <div style={{paddingLeft:'10px'}} className="logos w-75  d-flex justify-content-between">
          <div className="icon twitter"><a href="#currently-im-not-available-at-twitter"><i class="fa-brands fa-twitter"></i></a></div>
          <div className="icon facebook"><a href="#currently-im-not-available-at-facebook"><i class="fa-brands fa-facebook"></i></a></div>
          <div className="icon youtube"><a href="#currently-im-not-available-at-youtube"><i class="fa-brands fa-youtube"></i></a></div>
          <div className="icon linkedin"><a href="https://www.linkedin.com/in/karthik-p-k-5a818824b/"><i class="fa-brands fa-linkedin"></i></a></div>
         </div>
    </div>
   
    <div className="col-12 col-md-3 p-5"><h3>Feedback</h3>
    <p>Please submit your feedback</p>
    <Link to={'/feedback'} className='btn btn-lg ' style={{backgroundColor:'#000080',color:'#ddd'}}>Feedback</Link>
    
    </div>
    <hr  />
    <p className='text-center'>© EliteProp, All Right Reserved. Designed By karthik</p>
  </div>

</div>
  )
}

export default Footer
