import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './Contact.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const warningMessages = [
  "WARNING: Messages are monitored...",
  "WARNING: False messages may lead to punishment...",
  "WARNING: Police take strict actions for false claims..."
];

const Contact = ({ darkMode }) => {
  const warningMessageRef = useRef(null);
  const [messageIndex, setMessageIndex] = useState(0);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const navigate = useNavigate();
  useEffect(() => {
  document.body.classList.add('contact-page');
  if (darkMode) {
    document.body.classList.add('dark');
  } else {
    document.body.classList.remove('dark');
  }

  return () => {
    document.body.classList.remove('contact-page');
    document.body.classList.remove('dark');
  };
}, [darkMode]);


  useEffect(() => {
    const element = warningMessageRef.current;
    if (!element) return;

    let i = 0;
    element.innerHTML = '';

    const cursor = document.createElement('span');
    cursor.textContent = '|';
    cursor.style.display = 'inline-block';
    cursor.style.marginLeft = '2px';
    cursor.style.color = '#fff';
    cursor.style.animation = 'blink 1s steps(2, start) infinite';

    element.appendChild(cursor);

    const typeMessage = () => {
      if (i < warningMessages[messageIndex].length) {
        
        cursor.insertAdjacentText('beforebegin', warningMessages[messageIndex].charAt(i));
        i++;
        setTimeout(typeMessage, 80);
      } else {
        setTimeout(() => {
          i = 0;
          element.innerHTML = '';
          element.appendChild(cursor);
          setMessageIndex((prev) => (prev + 1) % warningMessages.length);
        }, 3000);
      }
    };

    typeMessage();

    return () => {
      element.innerHTML = '';
    };
  }, [messageIndex]);

  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    const savedName = localStorage.getItem("savedName");
    const savedMessage = localStorage.getItem("savedMessage");

    if (storedEmail) {
      setEmail(storedEmail);
    }

    if (savedName) setName(savedName);
    if (savedMessage) setMessage(savedMessage);
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("admin-dark");
    } else {
      document.body.classList.remove("admin-dark");
    }
  }, [darkMode]);

  const handleSubmit = (e) => {
  e.preventDefault();
  const storedEmail = localStorage.getItem("email");

  if (!storedEmail) {
    localStorage.setItem("savedName", name);
    localStorage.setItem("savedMessage", message);

    setShowLoginPrompt(true); // ✅ Show the modal
    return;
  }

    fetch("http://localhost:5000/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        email: email,
        message: message,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setShowSuccessModal(true);
setName("");
setMessage("");
localStorage.removeItem("savedName");
localStorage.removeItem("savedMessage");

      })
      .catch((err) => {
        console.error(err);
        alert("Something went wrong. Please try again.");
      });
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className={`edu-contact-page ${darkMode ? 'dark' : 'light'}`}>
      <div className="edu-container">
        <div
          style={{
            backgroundColor: 'transparent',
            color: darkMode ? '#fff' : '#000',
            fontSize: '14px',
            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
            fontWeight: '600',
            textAlign: 'center',
            marginBottom: '1rem',
            minHeight: '24px',
            userSelect: 'none',
            whiteSpace: 'normal',
            overflowWrap: 'break-word',
            maxWidth: '600px',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
          ref={warningMessageRef}
        ></div>

        <h1 className="edu-title">Contact SK Fitness</h1>

        <div className="edu-grid">
          <div className="edu-contact-info">
            <h2>Official Information</h2>
            <p><strong>Owner:</strong> Santosh Kumar</p>
            <p><strong>Email:</strong> <a href="mailto:santoshkumarkowru@gmail.com">santoshkumarkowru@gmail.com</a></p>
            <p><strong>Phone:</strong> <a href="tel:+919705635139">+91 97056 35139</a></p>
            <p><strong>Location:</strong> Utada Village, Andhra Pradesh</p>
            <p>
              <strong>Find us on map:</strong>{' '}
              <a
                href="https://maps.app.goo.gl/ZKq2XYerpoBHRSiA7"
                target="_blank"
                rel="noopener noreferrer"
              >
                View Location
              </a>
            </p>
            <p><strong>Institution:</strong> SRKREC</p>

            <div className="edu-socials">
              <a href="https://wa.me/919705635139" target="_blank" rel="noreferrer"><i className="fa-brands fa-whatsapp"></i></a>
              <a href="mailto:santoshkumarkowru@gmail.com"><i className="fa-solid fa-envelope"></i></a>
              <a href="#"><i className="fa-brands fa-facebook"></i></a>
              <a href="#"><i className="fa-brands fa-twitter"></i></a>
            </div>
          </div>

          <div className="edu-contact-form">
            <h2>Send an Enquiry</h2>
            <form onSubmit={handleSubmit}>
              <label>Full Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />

              {email && (
                <>
                  <label>Email</label>
                  <input
                    type="email"
                    value={email}
                    readOnly
                  />
                </>
              )}

              <label>Message</label>
              <textarea
                rows="6"
                placeholder="Type your message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              ></textarea>

              <button type="submit">Submit Enquiry</button>
            </form>
          </div>
        </div>
      </div>

      <br /><br />

      <div
        style={{
          textAlign: "center",
          marginTop: "30px",
          fontSize: "14px",
          color: darkMode ? "#fff" : "#000",
          maxWidth: "400px",
          marginLeft: "auto",
          marginRight: "auto",
          lineHeight: 1.6,
          fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
          fontWeight: "600",
        }}
      >
        {localStorage.getItem("email") ? (
          <>
            <p style={{ marginBottom: "10px", fontWeight: "600" }}>
              You’re logged in as{" "}
              <span style={{ fontWeight: "600", color: "#007bff" }}>
                {localStorage.getItem("email")}
              </span>
            </p>
            <p>
              Want to logout?{" "}
              <span
                onClick={() => setShowLogoutModal(true)}
                style={{
                  color: "#007bff",
                  fontWeight: "600",
                  cursor: "pointer",
                  textDecoration: "none",
                }}
              >
                Logout
              </span>
            </p>
          </>
        ) : (
          <>
            <p style={{ marginBottom: "10px", fontWeight: "600" }}>
              Ready to crush your fitness goals? Whether you're returning or new here, we’ve got you covered.
            </p>
            <p>
              Already have an account?{" "}
              <Link
                to="/login?tab=signin"
                state={{ darkMode, from: "/contact" }}
                style={{
                  color: "#007bff",
                  textDecoration: "none",
                  cursor: "pointer",
                  fontWeight: "600",
                  marginRight: "6px",
                }}
              >
                Sign In
              </Link>
              or
              <Link
                to="/login?tab=signup"
                state={{ darkMode, from: "/contact" }}
                style={{
                  color: "#007bff",
                  textDecoration: "none",
                  cursor: "pointer",
                  fontWeight: "600",
                  marginLeft: "6px",
                }}
              >
                Sign Up
              </Link>
              {" "}
              to get started with your personalized training journey today!
            </p>

            <div className="admin-login-link" style={{ marginTop: "10px" }}>
              <p>
                Are you an admin?{" "}
                <Link to="/admin-login" className="admin-link">Login here</Link>
              </p>
            </div>
          </>
        )}
      </div>

      <br />

      {showLogoutModal && (
        <div className="logout-modal-overlay">
          <div
            className="logout-modal"
            style={{
              backgroundColor: darkMode ? "#333" : "#fff",
              color: darkMode ? "#fff" : "#000",
            }}
          >
            <div className="top-icon-wrapper">
              <FontAwesomeIcon icon={faXmark} onClick={() => setShowLogoutModal(false)} />
            </div>
            <h3>Are you sure you want to log out?<br />You will need to sign in again to access your account.</h3>
            <div className="logout-buttons">
              <button onClick={handleLogout} className="yes-btn">Yes</button>
              <button onClick={() => setShowLogoutModal(false)} className="no-btn">No</button>
            </div>
          </div>
        </div>
      )}
      {showLoginPrompt && (
  <div className="logout-modal-overlay">
    <div
      className="logout-modal"
      style={{
        backgroundColor: darkMode ? "#333" : "#fff",
        color: darkMode ? "#fff" : "#000",
      }}
    >
      <div className="top-icon-wrapper">
        <FontAwesomeIcon icon={faXmark} onClick={() => setShowLoginPrompt(false)} />
      </div>
      <h3>Please log in to submit your enquiry.</h3>
      <div className="logout-buttons">
        <button
          onClick={() =>
            navigate("/login", {
              state: { from: "/contact", darkMode },
            })
          }
          className="yes-btn"
        >
          Login
        </button>
        <button
          onClick={() => setShowLoginPrompt(false)}
          className="no-btn"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
)}
{showSuccessModal && (
  <div className="logout-modal-overlay">
    <div
      className="logout-modal"
      style={{
        backgroundColor: darkMode ? "#333" : "#fff",
        color: darkMode ? "#fff" : "#000",
      }}
    >
      <div className="top-icon-wrapper">
        <FontAwesomeIcon icon={faXmark} onClick={() => setShowSuccessModal(false)} />
      </div>
      <h3>Your enquiry has been submitted successfully!</h3>
      <div className="logout-buttons">
        <button
          onClick={() => setShowSuccessModal(false)}
          className="yes-btn"
        >
          OK
        </button>
      </div>
    </div>
  </div>
)}
    </div>
  );
};

export default Contact;
