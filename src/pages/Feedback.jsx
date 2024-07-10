import React, { useState } from 'react';
import { FloatingLabel, Form } from 'react-bootstrap';
import logo from '../assets/logo.png';
import { saveFeedbackAPI } from '../services/allAPI';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Feedback = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = 'Name is required';
    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!message.trim()) newErrors.message = 'Message is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setSubmitting(true);

    try {
      await saveFeedbackAPI({ username: name, email, message });
      toast.success('Feedback submitted successfully');
      setName('');
      setEmail('');
      setMessage('');
      setErrors({});
    } catch (error) {
      toast.warning('Failed to submit feedback');
    } finally {
      setSubmitting(false);
    }
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
    if (errors.name) {
      setErrors((prevErrors) => ({ ...prevErrors, name: '' }));
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (errors.email) {
      setErrors((prevErrors) => ({ ...prevErrors, email: '' }));
    }
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
    if (errors.message) {
      setErrors((prevErrors) => ({ ...prevErrors, message: '' }));
    }
  };

  return (
    <div className='d-flex justify-content-center bg-light vh-100'>
      <div className="w-50 p-4 border rounded shadow d-flex justify-content-center flex-column" style={{ marginTop: '80px', height: '380px' }}>
        <h2 className='text-center'>Feedback Form</h2>
        
        <Form onSubmit={handleSubmit} noValidate>
          <FloatingLabel controlId="floatingInput" label="Name" className='mb-3 mt-2'>
            <Form.Control
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={handleNameChange}
              isInvalid={!!errors.name}
              required
            />
            <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
          </FloatingLabel>

          <FloatingLabel controlId="floatingInput" label="Email" className='mb-3'>
            <Form.Control
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={handleEmailChange}
              isInvalid={!!errors.email}
              required
            />
            <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
          </FloatingLabel>

          <FloatingLabel controlId="floatingInput" label="Message" className='mb-3'>
            <Form.Control
              as="textarea"
              placeholder="Enter your message"
              value={message}
              onChange={handleMessageChange}
              style={{ height: '100px' }}
              isInvalid={!!errors.message}
              required
            />
            <Form.Control.Feedback type="invalid">{errors.message}</Form.Control.Feedback>
          </FloatingLabel>

          <div>
            <button className='btn btn-primary' type="submit" disabled={submitting}>
              {submitting ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        </Form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Feedback;
