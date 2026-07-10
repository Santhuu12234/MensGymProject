import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Testimonials.css";
import { useNavigate } from "react-router-dom";
import api from "../axiosConfig";

const Testimonials = ({ darkMode }) => {
  const [testimonials, setTestimonials] = useState([]);
  const [form, setForm] = useState({
    name: "",
    role: "",
    feedback: "",
    rating: 5,
    image: null,
  });

  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
<<<<<<< HEAD
    axios.get("http://localhost:5000/api/testimonials").then((res) => {
=======
    axios.get("/api/testimonials").then((res) => {
>>>>>>> 3f368ca9af31d9632c98283f56ee5097ba977f6c
      setTestimonials(res.data);
    });

    const saved = JSON.parse(localStorage.getItem("testimonialForm"));
    if (saved) {
      setForm((prev) => ({
        ...prev,
        ...saved,
        rating: saved.rating || 5,
        image: null,
      }));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    const updatedForm = {
      ...form,
      [name]: files ? files[0] : value,
    };
    setForm(updatedForm);

    const formToSave = { ...updatedForm };
    delete formToSave.image;
    localStorage.setItem("testimonialForm", JSON.stringify(formToSave));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fd = new FormData();
    Object.keys(form).forEach((key) => fd.append(key, form[key]));

<<<<<<< HEAD
    await axios.post("http://localhost:5000/api/testimonials", fd);
    const updated = await axios.get("http://localhost:5000/api/testimonials");
=======
    await axios.post("/api/testimonials", fd);
    const updated = await axios.get("/api/testimonials");
>>>>>>> 3f368ca9af31d9632c98283f56ee5097ba977f6c
    setTestimonials(updated.data);
    setForm({ name: "", role: "", feedback: "", rating: 5, image: null });
    localStorage.removeItem("testimonialForm");
    setShowSuccessModal(true);
    setShowForm(false);
  };

  const handleFeedbackClick = () => {
    const email = localStorage.getItem("email");
    if (!email) {
      localStorage.setItem("testimonialForm", JSON.stringify({ ...form, image: null }));
      setShowLoginPrompt(true);
    } else {
      setShowForm(true);
    }
  };

  return (
    <div className={`testimonials-wrapper ${darkMode ? "dark" : ""}`}>
      <h2 className="testimonial-title">Our Client Testimonial</h2>
      <p className="testimonial-subtitle">
        You don’t need to guess. Our clients are extremely satisfied. Here’s what they’ve said.
      </p>

      <div className="testimonial-boxes">
        {testimonials.map((t, i) => (
          <div className={`testimonial-box ${darkMode ? "dark-box" : ""}`} key={i}>
            <img
              src={
                t.image.startsWith("http")
                  ? t.image
                  : `http://localhost:5000${t.image}`
              }
              alt={t.name}
              className="testimonial-pic"
            />
            <div className="testimonial-name-line">
              <div className="testimonial-name">{t.name}</div>
              <div className="testimonial-line"></div>
            </div>
            <div className="testimonial-role">{t.role}</div>
            <p className="testimonial-feedback">"{t.feedback}"</p>
            <div className="testimonial-stars">
              {"★".repeat(t.rating)}{"☆".repeat(5 - t.rating)}
            </div>
          </div>
        ))}
      </div>

      {!showForm && (
        <button
          onClick={handleFeedbackClick}
          className="give-feedback-btn"
        >
          Give Feedback
        </button>
      )}

      {showForm && (
        <form
          className={`testimonial-form ${darkMode ? "dark-form" : ""}`}
          onSubmit={handleSubmit}
        >
          <h3>Submit Your Testimonial</h3>
          <input
            style={{fontWeight:600}}
            name="name"
            placeholder="Your Name"
            required
            value={form.name}
            onChange={handleChange}
          />
          <input
          style={{fontWeight:600}}
            name="role"
            placeholder="Your Role"
            required
            value={form.role}
            onChange={handleChange}
          />
          <textarea
          style={{fontWeight:600}}
            name="feedback"
            placeholder="Your Feedback"
            required
            value={form.feedback}
            onChange={handleChange}
          />
          <div className="star-rating-input">
  {[1, 2, 3, 4, 5].map((star) => (
    <span
      key={star}
      className={`star ${
        (form.tempRating || form.rating) >= star ? "filled" : ""
      }`}
      onClick={() => setForm({ ...form, rating: star })}
      onMouseEnter={() => setForm((prev) => ({ ...prev, tempRating: star }))}
      onMouseLeave={() =>
        setForm((prev) => {
          const updated = { ...prev };
          delete updated.tempRating;
          return updated;
        })
      }
    >
      ★
    </span>
  ))}
</div>

          <div className="custom-file-input">
  <label htmlFor="file-upload" className="file-label" style={{fontWeight:600}}>
    Choose Image
  </label>
  <span className="file-name" style={{fontWeight:600}}>
    {form.image ? form.image.name : "No file chosen"}
  </span>
  <input
    type="file"
    id="file-upload"
    name="image"
    accept="image/*"
    required
    onChange={handleChange}
  />
</div>

          <button type="submit" style={{fontWeight:600}}>Submit</button>
        </form>
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
            <div className="top-icon-wrapper" onClick={() => setShowLoginPrompt(false)}>
              &times;
            </div>
            <h3>Please log in to submit your testimonial.</h3>
            <div className="logout-buttons">
              <button
                onClick={() =>
                  navigate("/login", {
                    state: { from: "/testimonials", darkMode },
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
            <div className="top-icon-wrapper" onClick={() => setShowSuccessModal(false)}>
              &times;
            </div>
            <h3>Your testimonial has been submitted successfully!</h3>
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

export default Testimonials;
