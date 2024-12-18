import React, { useCallback, useRef, useState } from 'react';
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

  const [isShowPassword, setIsShowPassword] = useState(false);
  const [status, setStatus] = useState('idle');
  const navigate = useNavigate();

  const toggleShowPassword = useCallback(() => {
    setIsShowPassword((prev) => !prev);
  }, []);

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

  const checkFields = () => {
    if (email && password && firstName && lastName && contactNo) {
      handleRegister();
    } else {
      if (!email) emailRef.current.focus();
      else if (!password) passwordRef.current.focus();
      else if (!firstName) fNameRef.current.focus();
      else if (!lastName) lNameRef.current.focus();
      else if (!contactNo) CNoRef.current.focus();
    }
  };

  const resetInputs = () => {
    setEmail('');
    setPassword('');
    setFirstName('');
    setMiddleName('');
    setLastName('');
    setContactNo('');
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const data = { email, password, firstName, middleName, lastName, contactNo };
    setStatus('loading');

    try {
        // Send POST request to PHP
        const response = await axios.post('http://localhost/register', {
          name: firstName,
          email: email,
          password: password,
          conf_pass: confirmpassword
        });
  
        // Handle response from PHP
        console.log(response.data);  // Assuming the PHP response contains a 'message' field
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
              type={isShowPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => handleOnChange(e, 'password')}
              placeholder="Password"
              required
              className="form-input2"
            />
            <button
              type="button"
              className="password-toggle2"
              onClick={toggleShowPassword}
            >
              {isShowPassword ? '👁️' : '👁️‍🗨️'}
            </button>
          </div>

          <div className="form-group2">
            <input
              ref={passwordRef}
              type={isShowPassword ? 'text' : 'password'}
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
