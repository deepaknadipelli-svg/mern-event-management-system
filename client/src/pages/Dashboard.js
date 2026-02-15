import { useEffect, useState, useContext, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "./Dashboard.css";

function Dashboard() {
  const { user, logout } = useContext(AuthContext);
  const [registrations, setRegistrations] = useState({
    upcoming: [],
    past: [],
  });

  const navigate = useNavigate();

  const fetchRegistrations = useCallback(async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/registrations/my",
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      setRegistrations(res.data);
    } catch (error) {
      console.log(error);
    }
  }, [user.token]);

  useEffect(() => {
    fetchRegistrations();
  }, [fetchRegistrations]);

  const cancelRegistration = async (registrationId) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/registrations/${registrationId}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      fetchRegistrations();
    } catch (error) {
      alert("Error cancelling registration");
    }
  };

  return (
    <div className="dashboard-container">
      <h1>Dashboard</h1>

      <button className="logout-btn" onClick={logout}>
        Logout
      </button>

      <button
        className="back-btn"
        onClick={() => navigate("/events")}
      >
        Back to Events
      </button>

      <div className="section">
        <h2>Upcoming Events</h2>

        {registrations.upcoming.length === 0 ? (
          <p>No upcoming events</p>
        ) : (
          registrations.upcoming.map((reg) => (
            <div key={reg._id} className="event-card">
              <h3>{reg.event.description}</h3>
              <p>
                {new Date(
                  reg.event.date
                ).toLocaleDateString()}
              </p>

              <button
                className="cancel-btn"
                onClick={() =>
                  cancelRegistration(reg._id)
                }
              >
                Cancel Registration
              </button>
            </div>
          ))
        )}
      </div>

      <div className="section">
        <h2>Past Events</h2>

        {registrations.past.length === 0 ? (
          <p>No past events</p>
        ) : (
          registrations.past.map((reg) => (
            <div key={reg._id} className="event-card past">
              <h3>{reg.event.description}</h3>
              <p>
                {new Date(
                  reg.event.date
                ).toLocaleDateString()}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Dashboard;