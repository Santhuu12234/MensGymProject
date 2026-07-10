// ... (all previous imports stay the same)
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AdminLogin.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import api from "../axiosConfig";

const Login = ({ darkMode }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const inputStyle = {
    fontWeight: 600,
    padding: "10px",
    marginBottom: "10px",
    width: "100%",
    borderRadius: "5px",
    border: "1px solid #ccc",
  };

  const darkFromState = location.state?.darkMode;
  const storedDarkMode = localStorage.getItem("darkMode") === "true";
  const finalDarkMode = darkFromState ?? darkMode ?? storedDarkMode;

  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const [modalMessage, setModalMessage] = useState('');
  const [showModal, setShowModal] = useState(false);

  const [message, setMessage] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showForgot, setShowForgot] = useState(false);
  const [showResetFields, setShowResetFields] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tab = params.get("tab");
    setIsSignUp(tab === "signup");
  }, [location.search]);

  useEffect(() => {
    const userEmail = localStorage.getItem("email");
    if (userEmail && location.state?.from !== "/booking") {
      navigate("/home");
    }
  }, [navigate, location.state]);

  useEffect(() => {
    if (finalDarkMode) {
      document.body.classList.add("admin-dark", "dark-mode");
    } else {
      document.body.classList.remove("admin-dark", "dark-mode");
    }
    return () => document.body.classList.remove("admin-dark", "dark-mode");
  }, [finalDarkMode]);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const showCenteredModal = (message) => {
    setModalMessage(message);
    setShowModal(true);
    setTimeout(() => {
      setShowModal(false);
      setModalMessage('');
    }, 2500);
  };

  const handleSendOtp = async () => {
    try {
<<<<<<< HEAD
      const res = await axios.post("http://localhost:5000/api/auth/forgot-password", { email });
=======
      const res = await axios.post("/api/auth/forgot-password", { email });
>>>>>>> 3f368ca9af31d9632c98283f56ee5097ba977f6c
      setMessage(res.data.msg);
      setShowResetFields(true);
    } catch (error) {
      setMessage(error.response?.data?.msg || "Error sending OTP");
    }
  };

  const handleResetPassword = async () => {
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const res = await axios.post("/api/auth/reset-password", {
        email,
        otp,
        newPassword,
      });
      alert(res.data.msg);
      setShowResetFields(false);
      setShowForgot(false);
      setOtp('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err) {
      alert(err.response?.data?.msg || "Password reset failed");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/auth/login", { email, password });
      const userName = res.data.user.name;
      localStorage.setItem("email", email);
      localStorage.setItem("name", userName);

      showCenteredModal(`Welcome back, ${userName}!`);

      const redirectTo = location.state?.from || "/home";
      setTimeout(() => {
        navigate(redirectTo, {
          replace: true,
          state: { darkMode: finalDarkMode }
        });
      }, 2600);
    } catch (err) {
      showCenteredModal(err.response?.data?.msg || "Login failed");
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/auth/register", { name, email, password });
      showCenteredModal(`Welcome, ${name}! Your account has been created.`);
      setName('');
      setEmail('');
      setPassword('');
      setTimeout(() => {
        setIsSignUp(false);
        navigate('/login?tab=signin', {
          replace: true,
          state: {
            darkMode: finalDarkMode,
            from: location.state?.from || null
          }
        });
      }, 2600);
    } catch (err) {
      const msg = err.response?.data?.msg || "Registration failed";
      showCenteredModal(msg.includes("already exists") ? "User already exists." : msg);
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
    <div className="admin-login-container">
      <h1 style={{ fontFamily: "'Trade Winds', cursive", fontSize: '49px', textAlign: 'center', marginBottom: '3px', color: finalDarkMode ? '#fff' : '#222' }}>
        {isSignUp ? "Register account" : "User login center"}
      </h1>
      <p style={{ fontWeight: 600, textAlign: 'center', fontSize: '16px', marginBottom: '25px', color: finalDarkMode ? '#f1f1f1' : '#555' }}>
        {isSignUp ? "Create your account to get started" : "Access your account securely"}
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
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} style={{ fontWeight: 600 }} required />
        </div>
        <button type="submit" style={{ fontFamily: "'Orbitron', sans-serif", fontWeight: 900 }}>
          {isSignUp ? "Create Account" : "Sign In"}
        </button>
      </form>

      {!isSignUp && (
        <p style={{ textAlign: "center", marginTop: "8px" }}>
          <button
            onClick={() => {
              setShowForgot(!showForgot);
              setShowResetFields(false);
              setMessage('');
            }}
            style={{
              background: "none",
              border: "none",
              color: "#007bff",
              cursor: "pointer",
              fontWeight: 600,
              textDecoration: "none",
            }}
          >
            Forgot Password..?
          </button>
        </p>
      )}

{showForgot && (
  <div className="logout-modal-overlay">
    <div
      className="logout-modal"
      style={{
        width: "500px", // <-- added line to increase width
        backgroundColor: darkMode ? "#333" : "#fff",
        color: darkMode ? "#fff" : "#000",
        padding: "20px", // optional: to keep content neat
        borderRadius: "8px", // optional: for better aesthetics
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)", // optional: subtle shadow
      }}
    >
      <div className="top-icon-wrapper" onClick={() => setShowForgot(false)}>
        <FontAwesomeIcon icon={faXmark} />
      </div>
      <h3
        style={{
          marginBottom: "10px",
          fontFamily: "'Orbitron', sans-serif",
          fontWeight: 900,
          color: darkMode ? "#fff" : "#000",
        }}
      >
        Forgot Password..?
      </h3>
      <p
        style={{
          marginBottom: "10px",
          fontFamily: "'Orbitron', sans-serif",
          fontWeight: 500,
          color: darkMode ? "#ccc" : "#333",
        }}
      >
        Enter your email address to receive an OTP.
      </p>
      <br></br>
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{
          width: "95%",
          padding: "10px 0",
          border: "none",
          fontWeight:600,
          borderBottom: "2px solid rgba(99, 99, 99, 0.9)",
          backgroundColor: "transparent",
          color: darkMode ? "rgba(197, 197, 197, 0.9)" : "#333",
          fontSize: "16px",
          outline: "none",
          transition: "border-color 0.3s ease",
        }}
        onFocus={(e) =>
  (e.target.style.borderBottom = darkMode
    ? '2px solid #ffffffff'
    : '2px solid #000000')
}

        onBlur={(e) => (e.target.style.borderBottom = "2px solid #ccc")}
      />
      <br></br>

      {showResetFields && (
        <>
          <br></br>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            style={{
              width: "95%",
              padding: "10px 0",
              fontWeight:600,
              border: "none",
              borderBottom: "2px solid rgba(99, 99, 99, 0.9)",
              backgroundColor: "transparent",
              color: darkMode ? "rgba(197, 197, 197, 0.9)" : "#333",
              fontSize: "16px",
              outline: "none",
              transition: "border-color 0.3s ease",
            }}
           onFocus={(e) =>
  (e.target.style.borderBottom = darkMode
    ? '2px solid #ffffffff'
    : '2px solid #000000')
}

            onBlur={(e) => (e.target.style.borderBottom = "2px solid #ccc")}
          />
          <br></br>
          <br></br>
          <div
            style={{
              display: "flex",
              gap: "20px",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <input
              type="password"
              placeholder="Enter New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              style={{
                width: "45%",
                padding: "10px 0",
                border: "none",
                fontWeight:600,
                borderBottom: "2px solid rgba(99, 99, 99, 0.9)",
                backgroundColor: "transparent",
                color: darkMode ? "rgba(197, 197, 197, 0.9)" : "#333",
                fontSize: "16px",
                outline: "none",
                transition: "border-color 0.3s ease",
              }}
              onFocus={(e) =>
  (e.target.style.borderBottom = darkMode
    ? '2px solid #ffffffff'
    : '2px solid #000000')
}

              onBlur={(e) =>
                (e.target.style.borderBottom = "2px solid #ccc")
              }
            />

            <input
              type="password"
              placeholder="Confirm New Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              style={{
                width: "45%",
                fontWeight:600,
                padding: "10px 0",
                border: "none",
                borderBottom: "2px solid rgba(99, 99, 99, 0.9)",
                backgroundColor: "transparent",
                color: darkMode ? "rgba(197, 197, 197, 0.9)" : "#333",
                fontSize: "16px",
                outline: "none",
                transition: "border-color 0.3s ease",
              }}
              onFocus={(e) =>
  (e.target.style.borderBottom = darkMode
    ? '2px solid #ffffffff'
    : '2px solid #000000')
}

              onBlur={(e) =>
                (e.target.style.borderBottom = "2px solid #ccc")
              }
            />
          </div>
        </>
      )}

      <div className="logout-buttons">
        {!showResetFields ? (
          <button
            style={{
              fontFamily: "'Orbitron', sans-serif",
              fontWeight: 900,
              backgroundColor: darkMode ? "#555" : "#e0e0e0",
              color: darkMode ? "#fff" : "#000",
            }}
            className="yes-btn"
            onClick={handleSendOtp}
          >
            Send OTP
          </button>
        ) : (
          <button
            style={{
              fontFamily: "'Orbitron', sans-serif",
              fontWeight: 900,
              backgroundColor: darkMode ? "#555" : "#e0e0e0",
              color: darkMode ? "#fff" : "#000",
            }}
            className="yes-btn"
            onClick={handleResetPassword}
          >
            Reset
          </button>
        )}
        <button
          className="no-btn"
          style={{
            fontFamily: "'Orbitron', sans-serif",
            fontWeight: 900,
            backgroundColor: darkMode ? "#444" : "#f8f8f8",
            color: darkMode ? "#fff" : "#000",
          }}
          onClick={handleCancel}
        >
          Cancel
        </button>
      </div>
      <br></br>
    </div>
  </div>
)}


      <p className="admin-note" style={{ fontWeight: 600 }}>
        {isSignUp ? "Already have an account?" : "Don't have an account?"}
      </p>
      <p className="admin-warning-text">
        <button
          style={{ color: '#007bff', background: 'transparent', border: 'none', fontWeight: 600, cursor: 'pointer', fontSize: '1rem' }}
          onClick={() => {
            const newTab = !isSignUp ? "signup" : "signin";
            setIsSignUp(!isSignUp);
            navigate(`/login?tab=${newTab}`, {
              replace: true,
              state: {
                darkMode: finalDarkMode,
                from: location.state?.from || null
              }
            });
          }}
        >
          {isSignUp ? "Login here" : "Register Now"}
        </button>
      </p>

      {showModal && (
        <div className="logout-modal-overlay">
          <div className="logout-modal" style={{ backgroundColor: finalDarkMode ? "#1e1e1e" : "#ffffff", color: finalDarkMode ? "#f5f5f5" : "#222" }}>
            <div className="top-icon-wrapper" onClick={() => { setShowModal(false); setModalMessage(''); }}>
              <i className="fa-solid fa-xmark"></i>
            </div>
            <h3>{modalMessage}</h3>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
