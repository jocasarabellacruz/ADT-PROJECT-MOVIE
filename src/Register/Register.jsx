import React, { useCallback, useRef, useState } from 'react';
import './Register.css';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [contactNo, setContactNo] = useState('');

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
      const res = await axios.post('/admin/register', data);
      localStorage.setItem('accessToken', 'true');
      localStorage.setItem('userId', res.data.u_id);
      navigate('/main/movies');
    } catch (e) {
      const errorMessage = e.response?.data?.message || 'Registration failed';
      alert(errorMessage);
    } finally {
      setStatus('idle');
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
          <div className="form-group">
            <input
              ref={emailRef}
              type="email"
              value={email}
              onChange={(e) => handleOnChange(e, 'email')}
              placeholder="Email"
              required
              className="form-input"
            />
          </div>

          <div className="form-group">
            <input
              ref={passwordRef}
              type={isShowPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => handleOnChange(e, 'password')}
              placeholder="Password"
              required
              className="form-input"
            />
            <button
              type="button"
              className="password-toggle"
              onClick={toggleShowPassword}
            >
              {isShowPassword ? '👁️' : '👁️‍🗨️'}
            </button>
          </div>

          <div className="form-group">
            <input
              ref={fNameRef}
              type="text"
              value={firstName}
              onChange={(e) => handleOnChange(e, 'firstName')}
              placeholder="First Name"
              required
              className="form-input"
            />
          </div>

          <div className="form-group">
            <input
              ref={mNameRef}
              type="text"
              value={middleName}
              onChange={(e) => handleOnChange(e, 'middleName')}
              placeholder="Middle Name (Optional)"
              className="form-input"
            />
          </div>

          <div className="form-group">
            <input
              ref={lNameRef}
              type="text"
              value={lastName}
              onChange={(e) => handleOnChange(e, 'lastName')}
              placeholder="Last Name"
              required
              className="form-input"
            />
          </div>

          <div className="form-group">
            <input
              ref={CNoRef}
              type="text"
              value={contactNo}
              onChange={(e) => handleOnChange(e, 'contactNo')}
              placeholder="Contact Number"
              required
              className="form-input"
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

        <div className="login-prompt">
          <p>Already have an account? <Link to="/" className="login-link">Sign In</Link></p>
        </div>
      </div>
    </div>
  );
}

export default Register;
