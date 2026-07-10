import React, { useEffect, useState, useCallback } from "react";
// axios import removed; using api instance
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./AdminDash.css";
import api from "../axiosConfig";

const AdminDash = ({ darkMode }) => {
  const [users, setUsers] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("users");
  const [selectedImage, setSelectedImage] = useState(null);
  const [newWarning, setNewWarning] = useState("");
  const [currentWarning, setCurrentWarning] = useState(null);

  const fetchWarning = useCallback(async () => {
    try {
      const res = await api.get("/api/warning");
      setCurrentWarning(res.data);
    } catch {
      setCurrentWarning(null);
    }
  }, []);

  useEffect(() => {
    fetchWarning();
  }, [fetchWarning]);


  const fetchAll = useCallback(async () => {
    try {
      const [uRes, cRes, bRes] = await Promise.all([
        api.get("/api/admin/users"),
        api.get("/admin/contacts"),
        api.get("/api/admin/bookings")
      ]);
      setUsers(uRes.data);
      setContacts(cRes.data);
      setBookings(bRes.data);
    } catch {
      setError("Error loading data");
    }
  }, []);

  const fetchByDate = useCallback(async (dateObj) => {
    if (!dateObj) return;
    const formattedDate = dateObj.toDateString();
    try {
      const res = await api.get("/api/admin/bookings", {
        params: { date: formattedDate }
      });
      setBookings(res.data);
      setSelectedDate(dateObj);
    } catch {
      setError("Error filtering bookings");
    }
  }, []);

  useEffect(() => {
    fetchAll();
    fetchByDate(new Date());
  }, [fetchAll, fetchByDate]);

  const equipmentList = [...new Set(bookings.map(b => b.equipment))].sort();

  const qrCodeFilenames = Array.from({ length: 16 }, (_, i) => `qr${i + 1}.jpg`);


  return (
    <div className={`admin-dash-container ${darkMode ? "dark" : ""}`}>
      <br></br>
      <br></br>
      <h1 style={{ fontFamily: "'Trade Winds', cursive",fontSize:"35px" }}>
  Admin Dashboard
</h1>
<br></br>

      {error && <p className="error">{error}</p>}

      {/* Toggle Buttons */}
      <div className="admin-tab-buttons">
        <button className={activeTab === "users" ? "active-tab" : ""} onClick={() => setActiveTab("users")} style={{fontFamily: "'Orbitron', sans-serif", fontWeight: 900}}>
          Users
        </button>
        <button className={activeTab === "contacts" ? "active-tab" : ""} onClick={() => setActiveTab("contacts")} style={{fontFamily: "'Orbitron', sans-serif", fontWeight: 900}}>
          Contacts
        </button>
        <button className={activeTab === "bookings" ? "active-tab" : ""} onClick={() => setActiveTab("bookings")} style={{fontFamily: "'Orbitron', sans-serif", fontWeight: 900}}>
          Bookings
        </button>
        <button className={activeTab === "qrcodes" ? "active-tab" : ""} onClick={() => setActiveTab("qrcodes")} style={{fontFamily: "'Orbitron', sans-serif", fontWeight: 900}}>
          QR Codes
        </button>
        <button className={activeTab === "warning" ? "active-tab" : ""} onClick={() => setActiveTab("warning")} style={{fontFamily: "'Orbitron', sans-serif", fontWeight: 900}}>
          Gym Warning
        </button>
      </div>

      {/* Users Section */}
      {activeTab === "users" && (
        <section>
          <h2 style={{ fontFamily: "'Orbitron', sans-serif", fontWeight: 900 }}>
  Users
</h2>
          <table className="admin-table" style={{fontWeight:600}}>
            <thead>
              <tr><th>#</th><th>Name</th><th>Email</th></tr>
            </thead>
            <tbody>
              {users.map((u, i) => (
                <tr key={u._id}>
                  <td>{i + 1}</td>
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                  </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}

      {/* Contacts Section */}
      {activeTab === "contacts" && (
        <section>
          <h2 style={{ fontFamily: "'Orbitron', sans-serif", fontWeight: 900 }}>
  Contact Messages
</h2>
          <table className="admin-table" style={{fontWeight:600}}>
            <thead>
              <tr><th>#</th><th>Name</th><th>Email</th><th>Message</th></tr>
            </thead>
            <tbody>
              {contacts.map((c, i) => (
                <tr key={c._id}>
                  <td>{i + 1}</td>
                  <td>{c.name}</td>
                  <td>{c.email}</td>
                  <td>{c.message}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}

      {/* Bookings Section */}
      {activeTab === "bookings" && (
        <>
          <section className="filter-section">
            <h2 style={{ fontFamily: "'Orbitron', sans-serif", fontWeight: 900 }}>
  Filter Bookings by Date
</h2>

            <DatePicker
              selected={selectedDate}
              onChange={fetchByDate}
              dateFormat="yyyy-MM-dd"
              placeholderText="Click to select a date"
              isClearable
            />
          </section>
          <section>
            <h2 style={{ fontFamily: "'Orbitron', sans-serif", fontWeight: 900 }}>Bookings {selectedDate && `on ${selectedDate.toDateString()}`}</h2>
            {bookings.length === 0 ? (
              <p style={{fontWeight:600}}>No bookings found for this date.</p>
            ) : (
              equipmentList.map((eq, i) => {
                const list = bookings.filter(b => b.equipment === eq);
                return (
                  <div key={i} className="equipment-booking-block">
                    <h3 style={{ fontFamily: "'Orbitron', sans-serif", fontWeight: 900 }}>{eq}</h3>
                    <table className="admin-table" style={{fontWeight:600}}>
                      <thead>
                        <tr><th>#</th><th>Email</th><th>Slot</th><th>Date</th></tr>
                      </thead>
                      <tbody>
                        {list.length > 0 ? list.map((b, idx) => (
                          <tr key={b._id}>
                            <td>{idx + 1}</td>
                            <td>{b.email}</td>
                            <td>{b.slot}</td>
                            <td>{b.date}</td>
                          </tr>
                        )) : (
                          <tr><td colSpan="4">Not Booked</td></tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                );
              })
            )}
          </section>
        </>
      )}

      {/* QR Codes Section */}
{activeTab === "qrcodes" && (
  <section>
    <h2 style={{ fontFamily: "'Orbitron', sans-serif", fontWeight: 900 }}>
  QR Code Images
</h2>
    <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", justifyContent: "center" }}>
      {qrCodeFilenames.map((filename, index) => (
        <div key={index} style={{ textAlign: "center", cursor: "pointer" }}>
          <img
            src={`/QrCodes/${filename}`}
            alt={`QR Code ${index + 1}`}
            onClick={() => setSelectedImage(`/QrCodes/${filename}`)}
            style={{
              maxWidth: "200px",
              maxHeight: "200px",
              borderRadius: "12px",
              boxShadow: "0 2px 10px rgba(0,0,0,0.2)"
            }}
          />
          <p>{filename}</p>
        </div>
      ))}
    </div>

    {/* Fullscreen Modal */}
    {selectedImage && (
      <div
        onClick={() => setSelectedImage(null)}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          backgroundColor: "rgba(0, 0, 0, 0.85)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 9999
        }}
      >
        <img
          src={selectedImage}
          alt="Zoomed QR"
          style={{
            maxWidth: "90%",
            maxHeight: "90%",
            borderRadius: "8px",
            boxShadow: "0 0 30px rgba(255,255,255,0.3)"
          }}
        />
      </div>
    )}
  </section>
)}
{activeTab === "warning" && (
  <section className="warning-section">
    <h2 style={{ fontFamily: "'Orbitron', sans-serif", fontWeight: 900 }}>
  Manage Gym Warning Message
</h2>
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        if (!newWarning.trim()) return;
        await api.post("/api/warning", { message: newWarning });
        alert("Warning added!");
        setNewWarning("");
        fetchWarning();
      }}
    >
      <textarea
        rows={4}
        value={newWarning}
        onChange={(e) => setNewWarning(e.target.value)}
        placeholder="Enter a strong warning message"
        style={{
          width: "100%",
          padding: "10px",
          borderRadius: "5px",
          fontSize: "15px",
          marginBottom: "10px",
          fontWeight:600,
        }}
      />
      <button type="submit"  style={{fontWeight:600, width: "100%",height:"42px",fontFamily: "'Orbitron', sans-serif", fontWeight: 900}}>Replace Warning Message</button>
    </form>

    <div style={{ marginTop: "20px" }}>
      <h3 style={{ fontFamily: "'Orbitron', sans-serif", fontWeight: 900 }}>
  Current Warning
</h3>
      {currentWarning ? (
        <>
          <p style={{ backgroundColor: "#333", color: "#fff", padding: "10px", borderRadius: "6px",fontWeight:600}}>
            {currentWarning.message}
          </p>
          <br></br>
          <button
            
            onClick={async () => {
              await api.delete("/api/warning");
              setCurrentWarning(null);
              alert("Warning deleted.");
            }}
           style={{fontWeight:600,width:"100%",height:"42px",fontFamily: "'Orbitron', sans-serif", fontWeight: 900}}>
            Delete Warning
          </button>
        </>
      ) : (
        <p style={{fontWeight:600}}>No warning message found.</p>
      )}
    </div>
  </section>
)}


      {/* Bottom Info Line */}
      <div
        style={{
          textAlign: "center",
          marginTop: "50px",
          fontSize: "14px",
          color: darkMode ? "#ccc" : "#444",
          fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        }}
      >
        <p style={{fontWeight:600}}>
          Not an admin?{" "}
          <a
            href="/"
            style={{
              color: "#007bff",
              textDecoration: "none",
              fontWeight: "600",
            }}
          >
            Return to Home
          </a>
        </p>
      </div>
    </div>
  );
};

export default AdminDash;
