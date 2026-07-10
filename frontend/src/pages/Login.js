import React, { useEffect, useState } from 'react';
import './Login.css';
import { useLocation, useNavigate } from 'react-router-dom';
import api from '../axiosConfig';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

const Login = ({ darkMode }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showForgot, setShowForgot] = useState(false);
  const [showResetFields, setShowResetFields] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // Determine final dark mode (from prop, state or stored value)
  const finalDarkMode = location.state?.darkMode ?? darkMode ?? (localStorage.getItem('darkMode') === 'true');

  // Set sign‑up tab based on URL query param
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setIsSignUp(params.get('tab') === 'signup');
  }, [location.search]);

  // Redirect logged‑in users away from login page (unless coming from booking)
  useEffect(() => {
    const storedEmail = localStorage.getItem('email');
    if (storedEmail && location.state?.from !== '/booking') {
      navigate('/home');
    }
  }, [navigate, location.state]);

  // Apply dark mode class to body
  useEffect(() => {
    if (finalDarkMode) {
      document.body.classList.add('admin-dark', 'dark-mode');
    } else {
      document.body.classList.remove('admin-dark', 'dark-mode');
    }
    return () => document.body.classList.remove('admin-dark', 'dark-mode');
  }, [finalDarkMode]);

  // Prevent background scroll while modal is open
  useEffect(() => {
    document.body.style.overflow = (showForgot || showSuccessModal) ? 'hidden' : 'auto';
    return () => (document.body.style.overflow = 'auto');
  }, [showForgot, showSuccessModal]);

  const showCenteredModal = (msg) => {
    setMessage(msg);
    setShowModal(true);
    setTimeout(() => {
      setShowModal(false);
      setMessage('');
    }, 2500);
  };

  const handleSendOtp = async () => {
    try {
      const res = await api.post('/api/auth/forgot-password', { email });
      setMessage(res.data.msg);
      setShowResetFields(true);
    } catch (error) {
      setMessage(error.response?.data?.msg || 'Error sending OTP');
    }
  };

  const handleResetPassword = async () => {
    if (newPassword !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    try {
      const res = await api.post('/api/auth/reset-password', { email, otp, newPassword });
      alert(res.data.msg);
      setShowResetFields(false);
      setShowForgot(false);
      setOtp('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err) {
      alert(err.response?.data?.msg || 'Password reset failed');
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/api/auth/login', { email, password });
      const userName = res.data.user.name;
      localStorage.setItem('email', email);
      localStorage.setItem('name', userName);
      showCenteredModal(`Welcome back, ${userName}!`);
      const redirectTo = location.state?.from || '/home';
      setTimeout(() => {
        navigate(redirectTo, { replace: true, state: { darkMode: finalDarkMode } });
      }, 2600);
    } catch (err) {
      showCenteredModal(err.response?.data?.msg || 'Login failed');
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await api.post('/api/auth/register', { name, email, password });
      showCenteredModal(`Welcome, ${name}! Your account has been created.`);
      setName('');
      setEmail('');
      setPassword('');
      setTimeout(() => {
        setIsSignUp(false);
        navigate('/login?tab=signin', {
          replace: true,
          state: { darkMode: finalDarkMode, from: location.state?.from || null },
        });
      }, 2600);
    } catch (err) {
      const msg = err.response?.data?.msg || 'Registration failed';
      showCenteredModal(msg.includes('already exists') ? 'User already exists.' : msg);
    }
  };

  const handleCancel = () => {
    setShowForgot(false);
    setShowResetFields(false);
    setEmail('');
    setOtp('');
    setNewPassword('');
    setConfirmPassword('');
    setMessage('');
  };

  return (
    <div className={`admin-login-container ${finalDarkMode ? 'dark' : ''}`}>
      <h1 style={{ fontFamily: "'Trade Winds', cursive", fontSize: '49px', marginBottom: '3px', color: finalDarkMode ? '#fff' : '#222' }}>
        {isSignUp ? 'Register account' : 'User login center'}
      </h1>
      <p style={{ fontWeight: 600, fontSize: '16px', marginBottom: '25px', color: finalDarkMode ? '#f1f1f1' : '#555' }}>
        {isSignUp ? 'Create your account to get started' : 'Access your account securely'}
      </p>

      <form className="admin-form" onSubmit={isSignUp ? handleSignup : handleLogin}>
        {isSignUp && (
          <div className="input-group">
            <i className="fa-solid fa-user icon"></i>
            <input type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} required style={{ fontWeight: 600 }} />
          </div>
        )}
        <div className="input-group">
          <i className="fa-solid fa-envelope icon"></i>
          <input type="email" placeholder="Email address" value={email} onChange={(e) => setEmail(e.target.value)} required style={{ fontWeight: 600 }} />
        </div>
        <div className="input-group">
          <i className="fa-solid fa-lock icon"></i>
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required style={{ fontWeight: 600 }} />
        </div>
        <button type="submit" style={{ fontFamily: "'Orbitron', sans-serif", fontWeight: 900 }}>
          {isSignUp ? 'Create Account' : 'Sign In'}
        </button>
      </form>

      {!isSignUp && (
        <p style={{ textAlign: 'center', marginTop: '8px' }}>
          <button
            onClick={() => {
              setShowForgot(!showForgot);
              setShowResetFields(false);
              setMessage('');
            }}
            style={{ background: 'none', border: 'none', color: '#007bff', cursor: 'pointer', fontWeight: 600, textDecoration: 'none' }}
          >
            Forgot Password..?
          </button>
        </p>
      )}

      {showForgot && (
        <div className="logout-modal-overlay">
          <div className="logout-modal" style={{ backgroundColor: finalDarkMode ? '#333' : '#fff', color: finalDarkMode ? '#fff' : '#000' }}>
            <div className="top-icon-wrapper" onClick={() => setShowForgot(false)}>
              <FontAwesomeIcon icon={faXmark} />
            </div>
            <h3>Please log in to submit your enquiry.</h3>
            <div className="logout-buttons">
              <button className="yes-btn" onClick={() => setShowForgot(false)}>
                Login
              </button>
              <button className="no-btn" onClick={() => setShowForgot(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {showForgot && (
        <div className="logout-modal-overlay">
          <div className="logout-modal" style={{ backgroundColor: finalDarkMode ? '#333' : '#fff', color: finalDarkMode ? '#fff' : '#000' }}>
            <div className="top-icon-wrapper" onClick={() => setShowForgot(false)}>
              <FontAwesomeIcon icon={faXmark} />
            </div>
            <h3>Please log in to access this feature.</h3>
            <div className="logout-buttons">
              <button className="yes-btn" onClick={() => setShowForgot(false)}>
                Login
              </button>
              <button className="no-btn" onClick={() => setShowForgot(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {showForgot && (
        <div className="logout-modal-overlay">
          <div className="logout-modal" style={{ backgroundColor: finalDarkMode ? '#333' : '#fff', color: finalDarkMode ? '#fff' : '#000' }}>
            <div className="top-icon-wrapper" onClick={() => setShowForgot(false)}>
              <FontAwesomeIcon icon={faXmark} />
            </div>
            <h3>Forgot Password..?</h3>
            <input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            {showResetFields && (
              <>
                <input type="text" placeholder="Enter OTP" value={otp} onChange={(e) => setOtp(e.target.value)} required />
                <input type="password" placeholder="New Password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
                <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
              </>
            )}
            <div className="logout-buttons">
              <button className="yes-btn" onClick={showResetFields ? handleResetPassword : handleSendOtp}> {showResetFields ? 'Reset' : 'Send OTP'} </button>
              <button className="no-btn" onClick={handleCancel}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {showModal && (
        <div className="logout-modal-overlay">
          <div className="logout-modal" style={{ backgroundColor: finalDarkMode ? '#1e1e1e' : '#ffffff', color: finalDarkMode ? '#f5f5f5' : '#222' }}>
            <div className="top-icon-wrapper" onClick={() => { setShowModal(false); setMessage(''); }}>
              <FontAwesomeIcon icon={faXmark} />
            </div>
            <h3>{message}</h3>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
