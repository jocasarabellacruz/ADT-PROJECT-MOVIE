import React, { useRef, useReducer, useEffect } from 'react';
import './Register.css';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import useDebounce from '../hooks/useDebounce';
import { FaMoon, FaSun } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';

const initialState = {
  email: '',
  password: '',
  confirmpassword: '',
  firstName: '',
  emailError: '',
  passwordError: '',
  confirmPasswordError: '',
  message: '',
  hasErrors: false,
  status: 'idle'
};

function formReducer(state, action) {
  switch (action.type) {
    case 'SET_FIELD':
      return {
        ...state,
        [action.field]: action.value
      };
    case 'SET_ERROR':
      return {
        ...state,
        [action.field]: action.error,
        hasErrors: true
      };
    case 'CLEAR_ERROR':
      return {
        ...state,
        [action.field]: '',
        hasErrors: false
      };
    case 'SET_STATUS':
      return {
        ...state,
        status: action.status
      };
    case 'RESET_FORM':
      return initialState;
    default:
      return state;
  }
}

function Register() {
  const [state, dispatch] = useReducer(formReducer, initialState);
  const navigate = useNavigate();
  const { isDark, toggleTheme } = useTheme();

  const emailRef = useRef();
  const passwordRef = useRef();
  const fNameRef = useRef();

  const debouncedEmail = useDebounce(state.email, 500);
  const debouncedPassword = useDebounce(state.password, 500);

  useEffect(() => {
    if (debouncedEmail) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(debouncedEmail)) {
        dispatch({ 
          type: 'SET_ERROR', 
          field: 'emailError', 
          error: 'Please enter a valid email address' 
        });
      } else {
        dispatch({ 
          type: 'CLEAR_ERROR', 
          field: 'emailError' 
        });
      }
    }
  }, [debouncedEmail]);

  useEffect(() => {
    if (debouncedPassword) {
      if (debouncedPassword.length < 6) {
        dispatch({
          type: 'SET_ERROR',
          field: 'passwordError',
          error: 'Password must be at least 6 characters long'
        });
      } else {
        dispatch({
          type: 'CLEAR_ERROR',
          field: 'passwordError'
        });
      }
    }
  }, [debouncedPassword]);

  const handleOnChange = (event, field) => {
    dispatch({
      type: 'SET_FIELD',
      field,
      value: event.target.value
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (state.hasErrors || !state.email || !state.password || !state.confirmpassword || !state.firstName) {
      return;
    }

    dispatch({ type: 'SET_STATUS', status: 'loading' });

    try {
      const response = await axios.post('http://localhost/register', {
        name: state.firstName,
        email: state.email,
        password: state.password,
        conf_pass: state.confirmpassword
      });

      if (response.data) {
        navigate("/");
      }
    } catch (error) {
      dispatch({
        type: 'SET_ERROR',
        field: 'message',
        error: 'An error occurred while sending the request.'
      });
    } finally {
      dispatch({ type: 'SET_STATUS', status: 'idle' });
    }
  };

  return (
    <div className={`register-container ${isDark ? 'dark' : 'light'}`}>
      <button onClick={toggleTheme} className="theme-toggle">
        {isDark ? <FaSun /> : <FaMoon />}
      </button>
      <div className={`register-card ${isDark ? 'dark' : 'light'}`}>
        <div className="register-header">
          <h1>Create Account</h1>
          <p>Please fill in your details</p>
        </div>
        
        <form onSubmit={handleRegister} className="register-form">
          <div className="form-group2">
            <input
              ref={emailRef}
              type="email"
              value={state.email}
              onChange={(e) => handleOnChange(e, 'email')}
              placeholder="Email"
              required
              className="form-input2"
            />
            {state.emailError && <span className="error-message">{state.emailError}</span>}
          </div>

          <div className="form-group2">
            <input
              ref={fNameRef}
              type="text"
              value={state.firstName}
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
              value={state.password}
              onChange={(e) => handleOnChange(e, 'password')}
              placeholder="Password"
              required
              className="form-input2"
            />
            {state.passwordError && <span className="error-message">{state.passwordError}</span>}
          </div>

          <div className="form-group2">
            <input
              type="password"
              value={state.confirmpassword}
              onChange={(e) => handleOnChange(e, 'confirmpassword')}
              placeholder="Confirm Password"
              required
              className="form-input2"
            />
            {state.confirmPasswordError && (
              <span className="error-message">{state.confirmPasswordError}</span>
            )}
          </div>

          <button
            type="submit"
            className="register-button"
            disabled={
              state.hasErrors || 
              !state.email || 
              !state.password || 
              !state.confirmpassword || 
              !state.firstName || 
              state.status === 'loading'
            }
          >
            {state.status === 'loading' ? (
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
