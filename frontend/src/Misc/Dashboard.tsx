import React, { useState, useEffect } from "react";
import axios from "axios";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./Dashboard.css"; // Import CSS
import CustomToolbar from "../newtoolbar";
import { Link } from "react-router-dom";

// Localizer for the calendar
const localizer = momentLocalizer(moment);

// Type for event data
interface Event {
  title: string;
  start: Date;
  end: Date;
  status: boolean;
}

const Dashboard: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    // Fetch events from the backend
    axios
      .get("http://localhost:4000/events")
      .then((response) => {
        console.log("Fetched Events:", response.data); // Debugging

        // Format events
        const formattedEvents = response.data.map((event: any) => ({
          title: event.title,
          start: new Date(event.start),
          end: new Date(event.start), // Ensure end date is set correctly
          status: event.status.toLowerCase() === "true", // Convert to boolean
        }));

        console.log("Formatted Events:", formattedEvents); // Debugging
        setEvents(formattedEvents);
      })
      .catch((error) => console.error("Error fetching events:", error));
  }, []);

  // Style events based on status
  const eventStyleGetter = (event: Event) => {
    let className = event.status ? "yellow-event" : "green-event"; // Apply CSS class based on status
    return { className };
  };

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Team IQites</h1>

      {/* Link to LiveStats page */}
      <div className="button-container">
        <Link to="/livestats" className="livestats-link">
          <button className="livestats-button">Go to LiveStats</button>
        </Link>
      </div>

      {/* Calendar container */}
      <div className="calendar-container">
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          eventPropGetter={eventStyleGetter}
          components={{ toolbar: CustomToolbar }} // Custom toolbar
        />
      </div>

      {/* Legend for event status */}
      <div className="legend">
        <div className="legend-item">
          <div>Visit Status:</div>
          <span className="legend-color yellow-box"></span> True
        </div>
        <div className="legend-item">
          <span className="legend-color green-box"></span> False
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
