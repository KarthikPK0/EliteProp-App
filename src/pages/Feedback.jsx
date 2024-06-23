import React from 'react'
import { FloatingLabel,Form } from 'react-bootstrap'


const Feedback = () => {
  return (
    <div  className=' d-flex justify-content-center bg-light vh-100 '>

      <div className="w-50  p-4 border rounded shadow d-flex justify-content-center flex-column" style={{marginTop:'80px',height:'380px'}}>
              <h2 className='text-dark'>Feedback Form</h2>

              <FloatingLabel controlId="floatingInput" label="name" className='mb-3 mt-2'>
        <Form.Control type="text" placeholder="name@example.com"  />
             </FloatingLabel>
             
             <FloatingLabel controlId="floatingInput" label="email" className='mb-3'>
        <Form.Control type="text" placeholder="name@example.com"  />
             </FloatingLabel>

             
             <FloatingLabel controlId="floatingInput" label="message" className='mb-3'>
        <Form.Control type="text" placeholder="name@example.com"  />
             </FloatingLabel>

             <div>
                <button className='btn btn-primary '>Submit</button>
             </div>

      </div>
    </div>
  )
}

export default Feedback
