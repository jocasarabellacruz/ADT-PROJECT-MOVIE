import React, { useRef, useState } from 'react';
import './Register.css';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, setconfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [contactNo, setContactNo] = useState('');
  const [message, setMessage] = useState('');

  const emailRef = useRef();
  const passwordRef = useRef();
  const fNameRef = useRef();
  const mNameRef = useRef();
  const lNameRef = useRef();
  const CNoRef = useRef();

  const [status, setStatus] = useState('idle');
  const navigate = useNavigate();

  const handleOnChange = (event, type) => {
    const value = event.target.value;

    switch (type) {
      case 'email':
        setEmail(value);
        break;
      case 'password':
        setPassword(value);
        break;
      case 'firstName':
        setFirstName(value);
        break;
      case 'middleName':
        setMiddleName(value);
        break;
      case 'lastName':
        setLastName(value);
        break;
      case 'contactNo':
        setContactNo(value);
        break;
      case 'confirmpassword':
        setconfirmPassword(value);
        break;
      default:
        break;
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await axios.post('http://localhost/register', {
        name: firstName,
        email: email,
        password: password,
        conf_pass: confirmpassword
      });

      console.log(response.data);  
      navigate("/")

    } catch (error) {
      console.error('Error sending request:', error);
      setMessage('An error occurred while sending the request.');
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <div className="register-header">
          <h1>Create Account</h1>
          <p>Please fill in your details</p>
        </div>
        
        <form onSubmit={handleRegister} className="register-form">
          <div className="form-group2">
            <input
              ref={emailRef}
              type="email"
              value={email}
              onChange={(e) => handleOnChange(e, 'email')}
              placeholder="Email"
              required
              className="form-input2"
            />
          </div>

          <div className="form-group2">
            <input
              ref={fNameRef}
              type="text"
              value={firstName}
              onChange={(e) => handleOnChange(e, 'firstName')}
              placeholder="Name"
              required
              className="form-input2"
            />
          </div>

          <div className="form-group2">
            <input
              ref={passwordRef}
              type="password"
              value={password}
              onChange={(e) => handleOnChange(e, 'password')}
              placeholder="Password"
              required
              className="form-input2"
            />
          </div>

          <div className="form-group2">
            <input
              ref={passwordRef}
              type="password"
              value={confirmpassword}
              onChange={(e) => handleOnChange(e, 'confirmpassword')}
              placeholder="Confirm Password"
              required
              className="form-input2"
            />
          </div>

          <button
            type="submit"
            className="register-button"
            disabled={status === 'loading'}
          >
            {status === 'loading' ? (
              <span className="loading-spinner"></span>
            ) : (
              'Create Account'
            )}
          </button>
        </form>

        <div className="login-prompt2">
          <p>Already have an account? <Link to="/" className="login-link2">Sign In</Link></p>
        </div>
      </div>
    </div>
  );
}

export default Register;
