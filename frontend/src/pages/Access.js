// src/pages/Access.js
import React, { useEffect } from 'react';
import './Access.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt, faLock, faCheckCircle, faQrcode } from '@fortawesome/free-solid-svg-icons';
import api from "../axiosConfig";

function Access({ darkMode }) {
  useEffect(() => {
    document.body.classList.add('access-background');
    if (darkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }

    return () => {
      document.body.classList.remove('access-background');
      document.body.classList.remove('dark');
    };
  }, [darkMode]);

  const isLoggedIn = localStorage.getItem('email');

  return (
    <div className={`access-page ${darkMode ? 'dark' : 'light'}`}>
      <div className={`access-box ${darkMode ? 'dark' : 'light'}`}>
        <h1 className="access-title">
          <FontAwesomeIcon icon={faSignInAlt} className="fire-icon" /> Login Access
        </h1>
        <p className="access-subtitle">Secure and instant access to your fitness dashboard anytime.</p>

        <div className="info-card">
          <h2><FontAwesomeIcon icon={faLock} style={{ marginRight: '8px' }} />What You Can Do</h2>
          <ul>
            <li>Access your personalized dashboard</li>
            <li>Track workout progress and history</li>
            <li>View and book gym slots in real-time</li>
            <li>Update personal and fitness profile</li>
            <li>Get notifications and trainer updates</li>
            <li><FontAwesomeIcon icon={faQrcode} style={{ marginRight: '8px', color: '#ffcc00' }} />Scan QR codes to access equipment info</li>
          </ul>
        </div>

        <div className="access-footer">
          {!isLoggedIn ? (
            <button className="join-btn" onClick={() => window.location.href = "/login"}>
              Login Now
            </button>
          ) : (
            <p className="welcome-text">Welcome back! You are already logged in.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Access;
