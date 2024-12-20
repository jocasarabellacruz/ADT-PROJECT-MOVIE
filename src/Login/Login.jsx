import { useState, useRef, useEffect } from 'react';
import './Login.css';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import useDebounce from '../hooks/useDebounce';
import { FaMoon, FaSun } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';

axios.defaults.withCredentials = true;

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const emailRef = useRef();
  const passwordRef = useRef();
  const [status, setStatus] = useState('idle');
  
  const debouncedEmail = useDebounce(email, 500);

  const navigate = useNavigate();

  const { isDark, toggleTheme } = useTheme();

  useEffect(() => {
    if (debouncedEmail) {
      validateEmail(debouncedEmail);
    }
  }, [debouncedEmail]);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError('Please enter a valid email address');
    } else {
      setEmailError('');
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (emailError) return;
    
    const data = { email: email, password: password };
    setStatus('loading');

    try {
      const response = await axios.post('http://localhost/login', data);
      console.log(response.data);
      if (response.data.status === 'success') {
        localStorage.setItem('accessToken', response.data.token);
        navigate("/home");
        
      } else {
        alert(response.data.message, "error");
      }
    } catch (error) {
      alert('Login failed. Please check your credentials.');
    } finally {
      setStatus('idle');
    }
  };

  return (
    <div className={`login-container1 ${isDark ? 'dark' : 'light'}`}>
      <button onClick={toggleTheme} className="theme-toggle">
        {isDark ? <FaSun /> : <FaMoon />}
      </button>
      <div className={`login-card1 ${isDark ? 'dark' : 'light'}`}>
        <div className="login-header1">
          <h1>Welcome Back</h1>
          <p>Please sign in to continue</p>
        </div>
        
        <form onSubmit={handleLogin} className="login-form1">
          <div className="form-group1">
            <input
              ref={emailRef}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
              className="form-input1"
            />
            {emailError && <span className="error-message">{emailError}</span>}
          </div>

          <div className="form-group1">
            <input
              ref={passwordRef}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              className="form-input1"
            />
          </div>

          <div className="forgot-password1">
            <a href="#" className="forgot-link">Forgot Password?</a>
          </div>

          <button
            type="submit"
            className="login-button"
            disabled={status === 'loading' || emailError}
          >
            {status === 'loading' ? (
              <span className="loading-spinner"></span>
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        <div className="register-prompt">
          <p>Don't have an account? <Link to="/register" className="register-link">Create one</Link></p>
        </div>
      </div>
    </div>
  );
}

export default Login;
