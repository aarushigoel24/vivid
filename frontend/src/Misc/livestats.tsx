import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaMapMarkerAlt, FaExclamationTriangle, FaClock, FaTimesCircle } from "react-icons/fa"; // Import icons
import "./LiveStats.css"; // Import CSS for styling

// Type definition for LiveStats
interface LiveStat {
  client: string;
  siteKey: string;
  site: string;
  login_server_recevier_time: string;
  login_gps: string;
  logout_server_recevier_time: string;
  forgot_logout_server_receive_time: string;
  Variance: string;
  logout_gps: string;
  cleanerName: string;
  cleanerPhoto?: string; // Optional, might be undefined or null
  photoMatchRatio: string;
}

const LiveStats: React.FC = () => {
  const [stats, setStats] = useState<LiveStat[]>([]);

  useEffect(() => {
    // Fetch live stats from API
    axios
      .get("http://localhost:4000/livestats")
      .then((response) => {
        console.log("Fetched Live Stats:", response.data); // Debugging
        setStats(response.data);
      })
      .catch((error) => console.error("Error fetching live stats:", error));
  }, []);

  // Function to generate Google Maps URL
  const getGoogleMapsLink = (site: string): string => {
    const encodedSite = encodeURIComponent(site); // Encode site to be URL-safe
    return `https://www.google.com/maps/search/?api=1&query=${encodedSite}`;
  };

  // Format epoch time to readable date-time
  const formatDateTime = (epochString: string): string => {
    const epochNumber = Number(epochString); // Convert string to number
    if (!isNaN(epochNumber) && epochNumber > 0) {
      return new Date(epochNumber).toLocaleString(); // Convert to readable format
    }
    return "";
  };

  return (
    <div className="livestats-container">
      {/* Title */}
      <h1 className="livestats-title">Live Stats</h1>

      {/* Legends below the title */}
      <div className="legends-container">
        <div className="legend-item">
          <FaExclamationTriangle className="legend-icon gps-icon" />
          <span>GPS Spoofing</span>
        </div>
        <div className="legend-item">
          <FaClock className="legend-icon phone-time-icon" />
          <span>Cleaner Phone Time</span>
        </div>
        <div className="legend-item">
          <FaTimesCircle className="legend-icon wrong-cleaner-icon" />
          <span>Wrong Cleaner</span>
        </div>
      </div>

      {/* Table */}
      {stats.length === 0 ? (
        <p className="no-stats">No live stats available.</p>
      ) : (
        <div className="table-container">
          <table className="livestats-table">
            <thead>
              <tr>
                <th>Client</th>
                <th>Site Key</th>
                <th>Site</th>
                <th>Login Server Recieve Time</th>
                <th>Login GPS</th>
                <th>Logout Server Recieve Time</th>
                <th>Forgot Logout Server Recieve Time</th>
                <th>Variance</th>
                <th>Logout GPS</th>
                <th>Cleaner Name</th>
                <th>Cleaner Photo</th>
                <th>Photo Match Ratio</th>
              </tr>
            </thead>
            <tbody>
              {stats.map((stat, index) => (
                <tr key={index}>
                  <td>{stat.client}</td>
                  <td>{stat.siteKey}</td>
                  <td>
                    <div className="site-details">
                      <span className="site-name">{stat.site}</span>
                      <a
                        href={getGoogleMapsLink(stat.site)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="icon-container"
                      >
                        <FaMapMarkerAlt className="location-icon" />
                      </a>
                    </div>
                  </td>
                  <td>{formatDateTime(stat.login_server_recevier_time)}</td>
                  <td>{stat.login_gps}</td>
                  <td>{formatDateTime(stat.logout_server_recevier_time)}</td>
                  <td>{formatDateTime(stat.forgot_logout_server_receive_time)}</td>
                  <td>{stat.Variance}</td>
                  <td>{stat.logout_gps}</td>
                  <td>{stat.cleanerName}</td>
                  <td>
                    {stat.cleanerPhoto ? (
                      <img
                        src={`data:image/jpeg;base64,${stat.cleanerPhoto}`}
                        alt={stat.cleanerName}
                        className="cleaner-photo"
                      />
                    ) : (
                      <span className="no-photo">No Photo</span>
                    )}
                  </td>
                  <td>{`${stat.photoMatchRatio}%`}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default LiveStats;
