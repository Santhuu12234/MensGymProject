// Home.js
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';
import './Home.css';
import api from "../axiosConfig";

function Home({ darkMode }) {
  const navigate = useNavigate();
  const warningMessageRef = useRef(null);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
const [redirectPath, setRedirectPath] = useState("");


 useEffect(() => {
  const fetchWarningMessage = async () => {
    const warningMessageElement = warningMessageRef.current;
    if (!warningMessageElement) return;

    try {
<<<<<<< HEAD
      const res = await fetch("http://localhost:5000/api/warning");
=======
      const res = await fetch("/api/warning");
>>>>>>> 3f368ca9af31d9632c98283f56ee5097ba977f6c
      
      if (!res.ok) {
        warningMessageElement.innerHTML = "No gym warning message available.";
        return;
      }

      const data = await res.json();
      const message = data.message;

      warningMessageElement.innerHTML = '';
      typeWarningMessage(message, warningMessageElement, 100);

    } catch (err) {
      warningMessageElement.innerHTML = "Error loading gym warning.";
      console.error(err);
    }
  };

  fetchWarningMessage();
}, []);


 const typeWarningMessage = (message, element, speed) => {
  let i = 0;
  const interval = setInterval(() => {
    if (i < message.length) {
      element.innerHTML = message.slice(0, i + 1) + '<span class="typing-cursor"></span>';
      i++;
    } else {
      clearInterval(interval);
    }
  }, speed);
};

  useEffect(() => {
  document.body.classList.toggle("dark-mode", darkMode);
}, [darkMode]);


  const callNumber = () => {
    window.location.href = 'tel:+919705635139';
  };

  const sendWhatsAppMessage = () => {
    window.location.href = 'https://wa.me/919705635139';
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className={darkMode ? 'dark-mode' : ''}>
      <div className="hero-container">
  <section className="hero">
    
    <h1 id="S">Achieve{" "}your{" "}fitness goals</h1>
    <p>Personalized training plans, expert guidance, and the best gym experience</p>
    <form method="POST">
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Link to="/booking" className="btn btn-primary" style={{ whiteSpace: 'nowrap' }}>
  <i className="fa-solid fa-calendar" style={{ fontSize: 25, marginRight: '10px' }}></i>
  <h3 className="orbitron-heading">Book a Session</h3>

</Link>
      </div>
    </form>
    <div className="warning-box">
      <div id="warningMessage" className="warning-message" ref={warningMessageRef}></div>
    </div>
  </section>
</div>



      <section className={`about-section ${darkMode ? 'dark' : 'light'}`}>
        <h2>Website Features</h2>
        <div className="features-grid">
          {features.map((feature, index) => (
  <div
  className="feature-card"
  key={index}
  onClick={() => {
    if (feature.action) {
      feature.action();
    } else if (feature.path) {
      if (feature.label === "FAQs" || feature.label === "Testimonials" || feature.label === "24/7 Gym Access") {
        // ✅ Allow FAQs and Testimonials without login
        navigate(feature.path);
      } else {
        const isLoggedIn = !!localStorage.getItem("email");
        if (isLoggedIn) {
          navigate(feature.path);
        } else {
          setRedirectPath(feature.path); // Save the path user intended
          setShowLoginPrompt(true);     // Ask login
        }
      }
    }
  }}
>

    <i className={`${feature.icon} feature-icon`}></i>
    <p style={{fontVariant: "small-caps",fontSize:"15px"}}>{feature.label}</p>
  </div>
))}

        </div>
      </section>



      {/* About the Gym */}
      <section className="about-section gym-section">
        <h2><i className="fa-solid fa-dumbbell section-icon"></i> About the Gym</h2>
        <p>
          <strong>SK Fitness</strong> is a state-of-the-art fitness facility offering strength training, cardio, CrossFit,
          and personal training programs. We combine technology, motivation, and expert guidance to help you reach your goals.
        </p>
        <p>
          Whether you're a beginner or a professional athlete, SK Fitness has the tools, trainers, and support system you need to thrive.
        </p>
      </section>

      {/* About the Website */}
<section className="about-section website-section">
  <h2><i className="fa-solid fa-globe section-icon"></i> About the Website</h2>
  <p>
    The SK Fitness digital platform extends your gym experience into your lifestyle. Track workouts, view videos, connect with trainers,
    and stay motivated — all from your mobile or desktop.
  </p>
  <ul>
    <li><i className="fa-solid fa-qrcode"></i> QR Code Scan Tool — Quickly scan codes for easy access to workouts and equipment info.</li>
    <li><i className="fa-brands fa-youtube"></i> Exclusive Training Videos — Watch professional workout tutorials anytime.</li>
    <li><i className="fa-solid fa-phone"></i> One-tap Contact Options — Instantly call trainers or support.</li>
    <li><i className="fa-solid fa-message"></i> Instant Messaging — Chat with trainers or support staff directly.</li>
    <li><i className="fa-solid fa-dumbbell"></i> State-of-the-art Equipment — Stay updated on gym gear and usage tips.</li>
    <li><i className="fa-solid fa-user-tie"></i> Certified Trainers — Access expert guidance and personalized coaching.</li>
    <li><i className="fa-solid fa-clock"></i> 24/7 Gym Access — Workout whenever you want with round-the-clock availability.</li>
    <li><i className="fa-solid fa-utensils"></i> Meal & Nutrition Plans — Get customized dietary advice to complement your workouts.</li>
    <li><i className="fa-solid fa-calculator"></i> Built-in BMI Calculator — Track your health stats easily.</li>
    <li><i className="fa-solid fa-dumbbell"></i> Daily Workout Plan — Follow tailored daily exercises for better results.</li>
    <li><i className="fa-solid fa-chart-line"></i> Member Progress Tracking — Monitor your fitness journey over time.</li>
    <li><i className="fa-solid fa-comments"></i> Testimonials & FAQs — Read success stories and find answers to common questions.</li>
  </ul>
</section>

{/* About Booking a Session */}
<section className="about-section booking-section">
  <h2><i className="fa-solid fa-calendar-check section-icon"></i> Book a Session</h2>
  <p>
    At SK Fitness, convenience meets flexibility with our seamless online session booking system. Whether you’re at home, at work, or on the go, you can <strong>reserve your preferred workout slot easily and instantly</strong>.
  </p>
  <p>
    No need to visit the gym or make a call—simply use our website or mobile app to select a date and time that suits your schedule. This advanced booking system helps you plan your fitness routine ahead, ensuring your session fits perfectly into your busy lifestyle.
  </p>
  <p>
    Our booking platform also helps maintain safe gym capacity limits, so you can enjoy a comfortable workout environment without overcrowding. Plus, with reminders and easy rescheduling options, managing your fitness commitments has never been simpler.
  </p>
  <p>
    Experience the freedom to train on your terms and stay committed to your goals with SK Fitness’s hassle-free online booking.
  </p>
</section>



      {/* About the Owner */}
      <section className="about-section owner-section">
        <h2><i className="fa-solid fa-user section-icon"></i> About the Owner</h2>
        <p>
          <strong>Santosh Kumar</strong>, founder of SK Fitness, built this gym and platform with the vision of merging traditional fitness with smart, modern tools.
          His mission is to make professional fitness guidance accessible to everyone.
        </p>
        <p>
          With a background in training and technology, he ensures members get a motivating experience both inside the gym and online.
        </p>
        <p><strong>Contact:</strong> <a href="tel:+919705635139">+91 97056 35139</a></p>
      </section>

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
                fontWeight: "400",
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
                  <p style={{fontWeight:600}}>
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
                  <p style={{fontWeight:600}}>
                    Already have an account?{" "}
                    <Link
                      to="/login?tab=signin"
                      state={{ darkMode }}
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
                      state={{ darkMode }}
                      style={{
                        color: "#007bff",
                        textDecoration: "none",
                        cursor: "pointer",
                        fontWeight: "600",
                        marginLeft: "6px",
                      }}
                    >
                      Sign Up
                    </Link>{" "}
                    to get started with your personalized training journey today..!
                  </p>
      
                  {/* ✅ Admin Login */}
                  <div className="admin-login-link" style={{ marginTop: "10px",fontWeight:600 }}>
                    <p>
                      Are you an admin?{" "}
                      <Link
                        to="/admin-login"
                        state={{ darkMode }}
                        style={{ fontWeight: "600", color: "#007bff", textDecoration: "none" }}
                      >
                        Login here
                      </Link>{" "}
                    </p>
                  </div>
                </>
              )}
            </div>
      
            {/* ✅ Logout Modal */}
            {showLogoutModal && (
              <div className="logout-modal-overlay">
                <div
                  className="logout-modal"
                  style={{
                    backgroundColor: darkMode ? "#333" : "#fff",
                    color: darkMode ? "#fff" : "#000",
                  }}
                >
                  <div className="top-icon-wrapper" onClick={() => setShowLogoutModal(false)}>
                    <FontAwesomeIcon icon={faXmark} />
                  </div>
                  <h3>
                    Are you sure you want to log out?<br />
                    You will need to sign in again to access your account.
                  </h3>
                  <div className="logout-buttons">
                    <button onClick={handleLogout} className="yes-btn">Yes</button>
                    <button onClick={() => setShowLogoutModal(false)} className="no-btn">No</button>
                  </div>
                </div>
              </div>
            )}
      

      <div className="con">
        <div className="contacts">
          <br /><br /><br /><br />
          <i id="santosh" className="fa-brands fa-whatsapp" style={{ fontSize: 25 }}></i>
          <i id="santosh" className="fa-solid fa-envelope" style={{ fontSize: 25 }}></i>
          <i id="santosh" className="fa-brands fa-facebook-f" style={{ fontSize: 25 }}></i>
          <i id="santosh" className="fa-brands fa-twitter" style={{ fontSize: 25 }}></i>
        </div>
      </div>
      <br></br>
      <p style={{textAlign: 'center'}}>
              <strong>Find us on map:</strong>{' '}
              <a
                href="https://maps.app.goo.gl/ZKq2XYerpoBHRSiA7"
                target="_blank"
                rel="noopener noreferrer"
                style={{color:"#4d8aea",fontWeight:600,textAlign: 'center'}}
              >
                View Location
              </a>
            </p>
      

      <footer style={{fontWeight:600}}>© 2025 Men's Gym. All Rights Reserved.</footer>

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
      <h3>Please log in to access this feature.</h3>
      <div className="logout-buttons">
        <button
          onClick={() => {
            setShowLoginPrompt(false);
            navigate("/login", {
              state: { from: redirectPath, darkMode },
            });
          }}
          className="yes-btn"
        >
          Login
        </button>
        <button onClick={() => setShowLoginPrompt(false)} className="no-btn">
          Cancel
        </button>
      </div>
    </div>
  </div>
)}

    </div>
  );
}

const features = [
  { icon: 'fa-solid fa-qrcode', label: 'scan tools', path: '/QrScanner' },
  { icon: 'fa-solid fa-envelope', label: 'contact', path: '/Contact' },
{
  icon: 'fa-solid fa-message',
  label: 'message',
  action: () => {
    const modal = document.createElement('div');
    modal.className = 'logout-modal-overlay';
    modal.innerHTML = `
      <div class="logout-modal">
        <div class="top-icon-wrapper" onclick="this.closest('.logout-modal-overlay').remove()">
          <i class="fa-solid fa-xmark"></i>
        </div>
        <h3>Connect with me via any platform</h3>
        <div class="logout-buttons">
          <button class="icon-btn" onclick="window.open('https://wa.me/919705635139', '_blank')">
            <i class="fa-brands fa-square-whatsapp"></i>
          </button>
          <button class="icon-btn" onclick="window.open('https://m.me/16mt9fogu5', '_blank')">
            <i class="fa-brands fa-square-facebook"></i>
          </button>
          <button class="icon-btn" onclick="window.open('https://www.instagram.com/direct/t/', '_blank')">
            <i class="fa-brands fa-square-instagram"></i>
          </button>
          <button class="icon-btn" onclick="window.open('mailto:santoshkumarkowru@gmail.com')">
            <i class="fa-solid fa-square-envelope"></i>
          </button>
        </div>
      </div>
    `;
    document.body.appendChild(modal);
  }
},

   { icon: 'fa-solid fa-dumbbell', label: 'state of the equipment', path: '/EquipmentPage' },
   { icon: 'fa-solid fa-calculator', label: 'bmi calculator', path: '/bmi' },
   { icon: 'fa-solid fa-user-tie', label: 'certified trainers',path:'/trainers' },
  { icon: 'fa-solid fa-utensils', label: 'meal & nutrition plans',path:'/MealPlans' },
    { icon: 'fa-brands fa-youtube', label: 'videos', path: '/Vedios' },
  { icon: 'fa-solid fa-dumbbell', label: 'daily workout plan', path:'/DailyWorkoutPlan' },
  { icon: 'fa-solid fa-chart-line', label: 'progress tracker', path: '/ProgressPage' },
  { icon: 'fa-solid fa-comments', label: 'testimonials',path:'/Testimonials' },
  { icon: 'fa-solid fa-clock', label: '24/7 gym access', path:'/Access' },
  { icon: 'fa-solid fa-circle-question', label: 'FAQs', path: '/Faqs'}
];

export default Home;
