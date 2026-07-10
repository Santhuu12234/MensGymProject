// src/App.js
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Faqs from "./pages/Faqs";
import BmiCalculator from "./pages/BmiCalculator"; // Import BMI Calculator page
import "./App.css";
import Booking from './pages/Booking';
import AdminLogin from './pages/AdminLogin'; // Adjust path if your file is in a different folder
import DailyWorkoutPlan from "./pages/DailyWorkoutPlan";
import Access from "./pages/Access";
import ScrollToTop from './components/ScrollToTop';
import Testimonials from "./pages/Testimonials";
import ProgressPage from './pages/ProgressPage';
import MealPlans from "./pages/MealPlans";
import EquipmentPage from "./pages/EquipmentPage";
import QrScanner from './pages/QrScanner';

import Vedios from "./pages/Vedios";
import AdminDash from './pages/AdminDash';
import CertifiedTrainers from './pages/CertifiedTrainers';

// Contains NavBar

 // Make sure path is correct!


const App = () => {
  // Load dark mode state from localStorage
  
  const [darkMode, setDarkMode] = useState(() => {
    const storedMode = localStorage.getItem("darkMode");
    return storedMode === "true"; // default is false
  });

  // Save dark mode state to localStorage on change
  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);
  useEffect(() => {
  document.body.classList.toggle("dark-mode", darkMode);
}, [darkMode]);


  return (
    <div className={darkMode ? "dark-mode" : ""}>
      <Router>
        <ScrollToTop />
        <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
        <Routes>
          <Route path="/" element={<Home darkMode={darkMode} />} />
          <Route path="/home" element={<Home darkMode={darkMode} />} /> {/* Added /home route */}
          <Route path="/about" element={<About darkMode={darkMode} />} />
          <Route path="/services" element={<Services darkMode={darkMode} />} />
          <Route path="/contact" element={<Contact darkMode={darkMode} />} />
          <Route path="/login" element={<Login darkMode={darkMode} />} />
          <Route path="/bmi" element={<BmiCalculator darkMode={darkMode} />} /> {/* BMI route */}
          <Route path="/booking" element={<Booking darkMode={darkMode} />} />

          <Route path="/Faqs" element={<Faqs darkMode={darkMode} />} />
          <Route path="/DailyWorkoutPlan" element={<DailyWorkoutPlan darkMode={darkMode} />} />
          <Route path="/Access" element={<Access darkMode={darkMode} />} />
          <Route path="/testimonials" element={<Testimonials darkMode={darkMode} />} />
          <Route path="/MealPlans" element={<MealPlans darkMode={darkMode} />} />
          <Route path="/EquipmentPage" element={<EquipmentPage darkMode={darkMode} />} />
          <Route path="/trainers" element={<CertifiedTrainers darkMode={darkMode} />} />
          <Route path="/QrScanner" element={<QrScanner darkMode={darkMode} />} />
          <Route path="/Vedios" element={<Vedios darkMode={darkMode} />} />

          <Route path="/admin/dashboard" element={<AdminDash darkMode={darkMode} />} />
          <Route path="/ProgressPage" element={<ProgressPage mode={darkMode ? "dark" : "light"} />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
