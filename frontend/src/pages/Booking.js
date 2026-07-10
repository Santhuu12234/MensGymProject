import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import "./Booking.css";

// 🖼 Import all equipment images
import Treadmill from "./images/Treadmill.jpg";
import EllipticalTrainer from "./images/EllipticalTrainer.jpg";
import AdjustableGymBench from "./images/AdjustableGymBench.jpg";
import CableMachine from "./images/CableMachine.jpg";
import Dumbbells from "./images/ResistanceBands.jpg";
import HackSquatMachine from "./images/HackSquatMachine.jpg";
import LegPressMachine from "./images/LegPressMachine.jpg";
import PecDeckMachine from "./images/PecDeckMachine.jpg";
import PullUpBarStand from "./images/PullUpBarStand.jpg";
import PulldownMachine from "./images/PulldownMachine.jpg";
import RealisticRowingMachine from "./images/RealisticRowingMachine.jpg";
import ResistanceBands from "./images/ResistanceBands.jpg";
import SeatedChestPressMachine from "./images/SeatedChestPressMachine.jpg";
import SeatedRowMachine from "./images/SeatedRowMachine.jpg";
import StairClimberMachine from "./images/StairClimberMachine.jpg";
import StationaryExerciseBike from "./images/StationaryExerciseBike.jpg";
import T_BarRowMachine from "./images/T_BarRowMachine.jpg";
import Dumbells from "./images/Dumbells.jpg";

// 🎯 Backend server URL (change if deployed)
const SERVER = "http://localhost:5000/api/booking";

// 🏋️ Equipment list with descriptions
const equipments = [
  {
    name: "Adjustable Gym Bench",
    image: AdjustableGymBench,
    desc: "Perfect for full-body workouts, allows various incline and decline positions for targeting different muscle groups."
  },
  {
    name: "Cable Machine",
    image: CableMachine,
    desc: "Versatile machine for strength training with adjustable pulleys that enable multiple resistance exercises targeting arms, chest, back, and core."
  },
  {
    name: "Dumbells",
    image: Dumbells,
    desc: "Basic weight training equipment ideal for bicep curls, shoulder presses, chest flyes, and various isolation and compound movements."
  },
  {
    name: "Elliptical Trainer",
    image: EllipticalTrainer,
    desc: "Low-impact cardio equipment that mimics stair climbing, walking, or running without causing excessive pressure on joints."
  },
  {
    name: "Hack Squat Machine",
    image: HackSquatMachine,
    desc: "Targets quadriceps, hamstrings, and glutes; allows safe and controlled squatting with back support."
  },
  {
    name: "Leg Press Machine",
    image: LegPressMachine,
    desc: "Powerful lower-body machine that strengthens thighs, hips, hamstrings, and calves with adjustable resistance."
  },
  {
    name: "Pec Deck Machine",
    image: PecDeckMachine,
    desc: "Isolates and develops chest muscles, especially the pectorals, while also engaging shoulders and triceps."
  },
  {
    name: "Pull-up Bar Stand",
    image: PullUpBarStand,
    desc: "Builds upper body and core strength through pull-ups, chin-ups, and hanging leg raises."
  },
  {
    name: "Pulldown Machine",
    image: PulldownMachine,
    desc: "Strengthens the upper back, shoulders, and arms by simulating a pull-up motion using resistance."
  },
  {
    name: "Realistic Rowing Machine",
    image: RealisticRowingMachine,
    desc: "Full-body cardio workout that engages legs, back, arms, and core while improving endurance and heart health."
  },
  {
    name: "Seated Chest Press",
    image: SeatedChestPressMachine,
    desc: "Builds upper body strength by targeting the pectorals, deltoids, and triceps through a seated pressing motion."
  },
  {
    name: "Seated Row Machine",
    image: SeatedRowMachine,
    desc: "Targets the upper back, traps, rhomboids, and shoulders while promoting proper posture and muscle balance."
  },
  {
    name: "Stair Climber Machine",
    image: StairClimberMachine,
    desc: "High-intensity cardio equipment that simulates stair climbing; strengthens glutes, quads, calves, and burns calories quickly."
  },
  {
    name: "Stationary Bike",
    image: StationaryExerciseBike,
    desc: "Cardio equipment that improves endurance and stamina while being gentle on joints; good for warm-ups and fat burning."
  },
  {
    name: "T-Bar Row Machine",
    image: T_BarRowMachine,
    desc: "Strengthens the middle back, lats, and rear delts; ideal for building a thick, strong back."
  },
  {
    name: "Treadmill",
    image: Treadmill,
    desc: "Ideal for running and walking indoors; helps improve cardiovascular health, stamina, and leg muscle tone."
  },
];


// 🕒 Available booking time slots
const timeSlots = [
  "6:00 - 8:00 AM",
  "8:00 - 10:00 AM",
  "10:00 - 12:00 PM",
  "12:00 - 2:00 PM",
  "2:00 - 4:00 PM",
  "4:00 - 6:00 PM",
  "6:00 - 8:00 PM",
  "8:00 - 10:00 PM",
];

const Booking = ({ darkMode }) => {
  // 🔘 Component state
  const [selectedEquipment, setSelectedEquipment] = useState(() => {
    return localStorage.getItem("selectedEquipment") || null;
  });
  const [bookings, setBookings] = useState({});
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("email") !== null;

  // ✅ Show confirmation modal
  const showPopupMessage = (msg) => {
    setModalMessage(msg);
    setShowMessageModal(true);
    setTimeout(() => {
      setShowMessageModal(false);
      setModalMessage("");
    }, 2500);
  };

  // ✅ Handle "Book" click
  const handleBooking = (equipment) => {
    if (!isLoggedIn) {
      localStorage.setItem("selectedEquipment", equipment);
      setShowLoginModal(true);
      return;
    }
    setSelectedEquipment(equipment);
  };

  // 🟥 Check if all slots are booked for one equipment
  const isFullyBooked = (equipmentName) => {
    return timeSlots.every(slot => bookings[`${equipmentName}-${slot}`]);
  };

  // 🔁 Auto-load bookings and set 10PM refresh
  useEffect(() => {
    if (localStorage.getItem("selectedEquipment")) {
      localStorage.removeItem("selectedEquipment");
    }

    // 🔁 Fetch existing bookings from MongoDB
    const fetchBookings = async () => {
      try {
        const res = await fetch(SERVER);
        const data = await res.json();
        const booked = {};
        data.forEach((item) => {
          booked[`${item.equipment}-${item.slot}`] = true;
        });
        setBookings(booked);
      } catch (error) {
        console.error("Booking fetch error:", error);
      }
    };

    fetchBookings();

    // 🕒 Auto-refresh every 10:00 PM
    const now = new Date();
    const tenPM = new Date();
    tenPM.setHours(22, 0, 0, 0);
    if (now > tenPM) tenPM.setDate(now.getDate() + 1);
    const delay = tenPM.getTime() - now.getTime();
    const timeoutId = setTimeout(() => {
      window.location.reload();
    }, delay);

    return () => clearTimeout(timeoutId);
  }, []);

  // 🔁 Redirect to login
  const confirmLoginRedirect = () => {
    setShowLoginModal(false);
    navigate("/login", {
      state: {
        from: "/booking",
        darkMode: darkMode,
      },
    });
  };

  // 🚪 Handle logout
  const handleLogout = () => {
    localStorage.removeItem("email");
    setShowLogoutModal(false);
    window.location.reload();
  };

  // 🔎 Filter search results
  const filteredEquipments = equipments.filter((eq) =>
    eq.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={`booking-container ${darkMode ? "dark" : ""}`}>
      <h2 className="booking-title">Select gym equipment</h2>

      {/* 🔍 Search bar */}
      <input
        type="text"
        className="search-bar"
        placeholder="Search equipment..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      {/* 📋 Equipment Grid */}
      <div className="equipment-grid">
        {filteredEquipments.length === 0 ? (
          <p className="not-found-text">No equipment found.</p>
        ) : (
          filteredEquipments.map((equipment, index) => {
            const fullyBooked = isFullyBooked(equipment.name);
            return (
              <div className="equipment-card" key={index}>
                <img className="equipment-image" src={equipment.image} alt={equipment.name} />
                <div className="equipment-details">
                  <h3 className="equipment-title">{equipment.name}</h3>
                  <p className="equipment-desc">{equipment.desc}</p>
                  <button
                    className={`book-btn ${fullyBooked ? "fully-booked" : ""}`}
                    onClick={() => handleBooking(equipment.name)}
                    disabled={fullyBooked}
                    title={fullyBooked ? "All sessions booked" : ""}
                    style={{fontFamily: "'Orbitron', sans-serif", fontWeight: 900}}
                  >
                    {fullyBooked ? "Fully Booked" : "Book"}
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* 🕓 Slot selection */}
      {selectedEquipment && (
        <div className={`slot-bar ${darkMode ? "dark" : ""}`}>
          <div className="slot-bar-header">
            <span>Booking: {selectedEquipment}</span>
            <button onClick={() => setSelectedEquipment(null)}>✕</button>
          </div>
          <div className="slot-bar-content">
            {timeSlots.map((slot, i) => {
              const key = `${selectedEquipment}-${slot}`;
              const isBooked = bookings[key];
              return (
                <button
                style={{fontWeight:600}}
                  key={i}
                  className={`slot-btn ${isBooked ? "booked" : ""}`}
                  onClick={async () => {
                    if (!isBooked) {
                      setBookings({ ...bookings, [key]: true });
                      showPopupMessage(`Booked ${selectedEquipment} for ${slot}`);

                      // 📝 Save booking to database
                      const email = localStorage.getItem("email");
                      await fetch(SERVER, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                          email,
                          equipment: selectedEquipment,
                          slot: slot,
                        }),
                      });
                    }
                  }}
                  disabled={isBooked}
                >
                  {slot}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* 💬 Popup message */}
      {showMessageModal && (
        <div className="logout-modal-overlay">
          <div className={`logout-modal ${darkMode ? "dark-mode" : ""}`}>
            <h3>{modalMessage}</h3>
          </div>
        </div>
      )}

      {/* 🔐 Login modal */}
      {showLoginModal && (
        <div className="logout-modal-overlay">
          <div className={`logout-modal ${darkMode ? "dark-mode" : ""}`}>
            <div className="top-icon-wrapper" onClick={() => setShowLoginModal(false)}>
              <FontAwesomeIcon icon={faXmark} />
            </div>
            <h3>Please login to book a slot.</h3>
            <div className="logout-buttons">
              <button className="yes-btn" onClick={confirmLoginRedirect}>OK</button>
              <button className="no-btn" onClick={() => setShowLoginModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

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
                  <p style={{fontWeight:"600"}}>
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
                  <p style={{fontWeight:"600"}}>
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
                    to get started with your personalized training journey today!
                  </p>
      
                  {/* ✅ Admin Login */}
                  <div className="admin-login-link" style={{ marginTop: "10px", fontWeight:"600" }}>
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
      
    </div>
  );
};

export default Booking;
