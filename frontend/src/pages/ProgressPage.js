import React, { useEffect, useState, useCallback } from 'react';
import api from '../axiosConfig';
import './ProgressPage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faDumbbell,
  faWeight,
  faList,
  faCalendarAlt,
  faSave,
  faChartBar,
} from '@fortawesome/free-solid-svg-icons';

const ProgressPage = ({ mode }) => {
  const userEmail = localStorage.getItem('email');
  const userName = localStorage.getItem('name');

  const [form, setForm] = useState({ weight: '', reps: '', sets: '' });
  const [data, setData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null); // no date selected by default

  const fetchData = useCallback(async () => {
    try {
      const res = await api.get(`/api/progress/${userEmail}`);
      setData(res.data);
    } catch (err) {
      console.error('Error fetching progress:', err);
    }
  }, [userEmail]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Helper function to get 'YYYY-MM-DD' in local timezone
  const formatDate = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = `${d.getMonth() + 1}`.padStart(2, '0');
    const day = `${d.getDate()}`.padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const filteredData = selectedDate
    ? data.filter((d) => formatDate(d.recordedAt) === selectedDate)
    : data;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/api/progress', {
        ...form,
        name: userName,
        email: userEmail,
      });
      setForm({ weight: '', reps: '', sets: '' });
      fetchData();
    } catch (err) {
      console.error('Error saving progress:', err);
    }
  };

  return (
    <div className={`progress-page-wrapper ${mode === 'dark' ? 'dark' : ''}`}>
      <h2>
        <FontAwesomeIcon icon={faDumbbell} /> Hello, {userName}! Track Your Progress
      </h2>

      <form className="progress-form" onSubmit={handleSubmit}>
        <div>
          <input
            type="number"
            placeholder="Weight (kg)"
            value={form.weight}
            onChange={(e) => setForm({ ...form, weight: e.target.value })}
            required
          />
          <input
            type="number"
            placeholder="Reps"
            value={form.reps}
            onChange={(e) => setForm({ ...form, reps: e.target.value })}
            required
          />
          <input
            type="number"
            placeholder="Sets"
            value={form.sets}
            onChange={(e) => setForm({ ...form, sets: e.target.value })}
            required
          />
        </div>
        <button type="submit">
          <FontAwesomeIcon icon={faSave} /> Save Progress
        </button>
      </form>

      <div className="date-filter-wrapper">
        <label htmlFor="date-filter">
          <FontAwesomeIcon icon={faCalendarAlt} /> Select Date:
        </label>
        <input
          type="date"
          id="date-filter"
          value={selectedDate || ''}
          onChange={(e) => setSelectedDate(e.target.value || null)}
        />
      </div>

      <h3>
        <FontAwesomeIcon icon={faList} />{' '}
        {selectedDate
          ? `Your Progress on ${new Date(selectedDate).toLocaleDateString()}`
          : 'All Your Progress'}
      </h3>

      {filteredData.length === 0 ? (
        <p style={{ textAlign: 'center', margin: '20px 0' }}>No progress records found.</p>
      ) : (
        <>
          <table className="progress-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Weight</th>
                <th>Reps</th>
                <th>Sets</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((d) => (
                <tr key={d._id}>
                  <td>{new Date(d.recordedAt).toLocaleDateString()}</td>
                  <td>{d.weight}</td>
                  <td>{d.reps}</td>
                  <td>{d.sets}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <h3>
            <FontAwesomeIcon icon={faChartBar} /> Weight Progress
          </h3>
          {filteredData.map((d) => (
            <div key={d._id} className="progress-bar-entry">
              <strong>
                <FontAwesomeIcon icon={faWeight} /> {new Date(d.recordedAt).toLocaleDateString()} — {d.weight} kg
              </strong>
              <progress value={d.weight} max="150" />
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default ProgressPage;
