import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMoon,
  faSun,
  faBars,
  faXmark,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "../App.css";

const Navbar = ({ darkMode, setDarkMode }) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false); // added

  const menuRef = useRef();

  const navigate = useNavigate();
  const location = useLocation();

  const isLoggedIn = !!localStorage.getItem("name"); // true if name exists in localStorage

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
    setShowLogoutModal(false);
  };

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Contact", path: "/contact" },
  ];

  const showFullNav = windowWidth > 600;

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      if (window.innerWidth > 600 && menuOpen) setMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [menuOpen]);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    const handleScroll = () => setMenuOpen(false);
    if (menuOpen) {
      window.addEventListener("mousedown", handleOutsideClick);
      window.addEventListener("scroll", handleScroll);
    }
    return () => {
      window.removeEventListener("mousedown", handleOutsideClick);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [menuOpen]);

    const handleBack = () => {
    if (location.pathname === '/QrScanner') {
      const iframe = document.querySelector("iframe");
      if (iframe) {
        // 👇 Custom event to tell QrScanner to go back to camera
        window.dispatchEvent(new CustomEvent("goBackToScanner"));
        return;
      }
    }

    // default back
    if (window.history.length > 2) {
      navigate(-1);
    } else {
      navigate("/", { replace: true });
    }
  };

  return (
    <nav
      className="navbar"
      style={{
        backgroundColor: darkMode ? "#222" : "#fff",
        color: darkMode ? "#eee" : "#333",
        borderBottom: darkMode ? "1px solid #444" : "1px solid #ccc",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 16px",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <button
          onClick={handleBack}
          title="Go Back"
          style={{
            background: "none",
            border: "none",
            color: darkMode ? "#eee" : "#333",
            cursor: "pointer",
            fontSize: "18px",
          }}
        >
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>

        <h1
          className="logo"
          style={{
            color: darkMode ? "#eee" : "#333",
            display: "flex",
            paddingLeft:"0px",
            alignItems: "center",
            gap: "8px",
            fontWeight: "bold",
            fontSize: "19px",
            userSelect: "none",
          }}
        >
          GYM APP
        </h1>
      </div>

      {showFullNav ? (
        <ul className="nav-links">
          {navItems.map(({ name, path }) => (
            <li key={name}>
              <Link
                to={path}
                className="nav-link"
                style={{ color: darkMode ? "#eee" : "#333" }}
              >
                {name}
                <span className="underline"></span>
              </Link>
            </li>
          ))}
          <li>
            {isLoggedIn ? (
              <span
                onClick={() => setShowLogoutModal(true)}
                className="nav-auth"
              >
                Logout
                <span className="underline"></span>
              </span>
            ) : (
              <Link
                to="/login"
                className="nav-auth"
              >
                Login
                <span className="underline"></span>
              </Link>
            )}
          </li>
          <li>
            <div className="mode-wrapper">
              <div
                className="mode-icon"
                onClick={() => setDarkMode(!darkMode)}
                style={{ cursor: "pointer" }}
                title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
              >
                <FontAwesomeIcon icon={darkMode ? faSun : faMoon} />
              </div>
            </div>
          </li>
        </ul>
      ) : (
        <div className="menu-wrapper">
          <div
            className="menu-icon"
            onClick={() => setMenuOpen(!menuOpen)}
            style={{ color: darkMode ? "#eee" : "#333" }}
          >
            <FontAwesomeIcon icon={menuOpen ? faXmark : faBars} />
          </div>
        </div>
      )}

      {!showFullNav && menuOpen && (
        <ul
          className="mobile-menu"
          ref={menuRef}
          style={{
            backgroundColor: darkMode ? "#222" : "#f5f5f5",
            color: darkMode ? "#eee" : "#333",
          }}
        >
          {navItems.map(({ name, path }) => (
            <li key={name}>
              <Link
                to={path}
                className="nav-link"
                onClick={() => setMenuOpen(false)}
                style={{ color: darkMode ? "#eee" : "#333", textDecoration: "none" }}
              >
                {name}
                <span className="underline"></span>
              </Link>
            </li>
          ))}

          <li>
            {isLoggedIn ? (
              <span
              className="nav-link"
                onClick={() => {
                  setShowLogoutModal(true);
                  setMenuOpen(false);
                }}
                style={{ textDecoration: 'none' }}
              >
                <Link className="nav-link" style={{ textDecoration: 'none' }}>
                Logout
                <span className="underline"></span>
                </Link>
              </span>
            ) : (
              <Link
                to="/login"
                className="nav-link"
                onClick={() => setMenuOpen(false)}
                style={{ textDecoration: 'none' }}
              >
                Login
                <span className="underline"></span>
              </Link>
            )}
          </li>

          <li
            className="nav-link mode-text"
            onClick={() => {
              setDarkMode(!darkMode);
              setMenuOpen(false);
            }}
            style={{ cursor: "pointer", color: darkMode ? "#eee" : "#333", textDecoration: "none" }}
          >
            {darkMode ? "Light Mode" : "Dark Mode"}
            <span className="underline"></span>
          </li>
        </ul>
      )}

      {/* Logout Modal */}
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

    </nav>
  );
};

export default Navbar;
