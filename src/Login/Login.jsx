import { useState, useRef } from 'react';
import './Login.css';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

axios.defaults.withCredentials = true;

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isFieldsDirty, setIsFieldsDirty] = useState(false);
  const emailRef = useRef();
  const passwordRef = useRef();
  const [status, setStatus] = useState('idle');

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const data = { email: email, password: password };
    setStatus('loading');

    try {
      const response = await axios.post('http://localhost/login', data);
      
      if (response.data.status === 'success') {
        navigate("/home");
        console.log(response.data);
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      alert('Login failed. Please check your credentials.');
    } finally {
      setStatus('idle');
    }
  };

  return (
    <div className="login-container1">
      <div className="login-card1">
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
            disabled={status === 'loading'}
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
