import { useState, useRef, useCallback } from 'react';
import './Login.css';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isFieldsDirty, setIsFieldsDirty] = useState(false);
  const emailRef = useRef();
  const passwordRef = useRef();
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [status, setStatus] = useState('idle');

  const navigate = useNavigate();

  const handleShowPassword = useCallback(() => {
    setIsShowPassword((value) => !value);
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    const data = { username: email, password };
    setStatus('loading');

    try {
      const response = await axios.post('/restapi/login.php', data);
      
      if (response.data.status === 'success') {
        localStorage.setItem('accessToken', 'true');
        localStorage.setItem('userId', response.data.u_id);
        navigate('/main/movies');
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
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1>Welcome Back</h1>
          <p>Please sign in to continue</p>
        </div>
        
        <form onSubmit={handleLogin} className="login-form">
          <div className="form-group">
            <input
              ref={emailRef}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
              className="form-input"
            />
            <i className="fas fa-envelope input-icon"></i>
          </div>

          <div className="form-group">
            <input
              ref={passwordRef}
              type={isShowPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              className="form-input"
            />
            <button
              type="button"
              className="password-toggle"
              onClick={handleShowPassword}
            >
              {isShowPassword ? '👁️' : '👁️‍🗨️'}
            </button>
          </div>

          <div className="forgot-password">
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
