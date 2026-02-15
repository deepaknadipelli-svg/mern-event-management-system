import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "./Events.css";

function Events() {
  const { user } = useContext(AuthContext);
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/events");
      setEvents(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const registerEvent = async (eventId) => {
    try {
      await axios.post(
        `http://localhost:5000/api/registrations/${eventId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      alert("Registered successfully!");
    } catch (error) {
      alert(error.response?.data?.message || "Error registering");
    }
  };

  const filteredEvents = events.filter((event) => {
    const name = event.description || "";
    const loc = event.location || "";

    return (
      name.toLowerCase().includes(search.toLowerCase()) &&
      loc.toLowerCase().includes(location.toLowerCase()) &&
      (date === "" ||
        new Date(event.date).toISOString().split("T")[0] === date)
    );
  });

  return (
    <div className="events-container">
      <h1>Events</h1>

      <button onClick={() => navigate("/dashboard")}>
        Go to Dashboard
      </button>

      <div className="filters">
        <input
          type="text"
          placeholder="Search events"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>

      {filteredEvents.map((event) => (
        <div key={event._id} className="event-card">
          <h3>{event.description}</h3>
          <p>Location: {event.location}</p>
          <p>Date: {new Date(event.date).toLocaleDateString()}</p>

          <button
            className="register-btn"
            onClick={() => registerEvent(event._id)}
          >
            Register
          </button>
        </div>
      ))}
    </div>
  );
}

export default Events;