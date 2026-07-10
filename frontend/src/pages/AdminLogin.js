// AdminLogin.js
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './AdminLogin.css';
import api from "../axiosConfig";
function AdminLogin({ darkMode }) {
  const location = useLocation();
  const navigate = useNavigate();

  const darkFromState = location.state?.darkMode;
  const storedDarkMode = localStorage.getItem("darkMode") === "true";
  const finalDarkMode = darkFromState ?? darkMode ?? storedDarkMode;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    localStorage.removeItem('admin');
    sessionStorage.clear();
  }, []);

  useEffect(() => {
    if (finalDarkMode) {
      document.body.classList.add("admin-dark");
    } else {
      document.body.classList.remove("admin-dark");
    }
    return () => {
      document.body.classList.remove("admin-dark");
    };
  }, [finalDarkMode]);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === 'SantoshKumar@gmail.com' && password === 'SantoshKumar') {
      alert('Welcome, Admin!');
      localStorage.setItem('admin', email);
      navigate('/admin/dashboard', {
        replace: true,
        state: { darkMode: finalDarkMode }
      });
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="admin-login-container">
      <h1 className="admin-title">Admin Control Center</h1>
      <p className="admin-subtitle">
        Manage the platform with confidence and clarity.
      </p>
      <form className="admin-form" onSubmit={handleSubmit}>
        <div className="input-group">
          <i className="fa-solid fa-user icon"></i>
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="input-group">
          <i className="fa-solid fa-lock icon"></i>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" style={{fontFamily: "'Orbitron', sans-serif", fontWeight: 900}}>Sign In</button>
      </form>

      <p className="admin-note">Access restricted to authorized administrators only.</p>

      <p className="admin-warning-text">
        Not an admin?&nbsp;
        <a
          href="/home"
          onClick={() => {
            localStorage.setItem("darkMode", finalDarkMode);
          }}
          style={{ color: '#007bff', textDecoration: 'none', fontWeight: 500 }}
        >
          Return to Home
        </a>
      </p>
    </div>
  );
}

export default AdminLogin;
