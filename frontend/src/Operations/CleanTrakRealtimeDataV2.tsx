import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  FaMapMarkerAlt,
  FaExclamationTriangle,
  FaClock,
  FaTimesCircle,
} from "react-icons/fa";
import "./LiveStats.css";
import "../common.css";

interface LiveStat {
  client: string;
  siteKey: string;
  site: string;
  login_server_recevier_time: string | number;
  login_gps: string;
  logout_server_recevier_time: string | number;
  forgot_logout_server_receive_time: string | number;
  Variance: string;
  logout_gps: string;
  cleanerName: string;
  cleanerPhoto?: string;
  photoMatchRatio: number | string;
}

const CleanTrakRealtimeDataV2Page: React.FC = () => {
  const [stats, setStats] = useState<LiveStat[]>([]);

  useEffect(() => {
    axios
      .get<LiveStat[]>("http://localhost:4000/livestats")
      .then((response) => {
        setStats(response.data);
      })
      .catch((error) =>
        console.error("Error fetching live stats:", error)
      );
  }, []);

  const getGoogleMapsLink = (site: string): string => {
    const encodedSite = encodeURIComponent(site);
    return `https://www.google.com/maps/search/?api=1&query=${encodedSite}`;
  };

  const formatDateTime = (epochString: string | number): string => {
    const epochNumber = typeof epochString === 'string' 
      ? Number(epochString) 
      : epochString;
    
    if (!isNaN(epochNumber) && epochNumber > 0) {
      return new Date(epochNumber).toLocaleString();
    }
    return "";
  };

  return (
    <div className="container">
      {/* Legends */}
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
      
      <div className="warning-section">
        <div className="warning-banner">
          <strong>Do not Share Photos on these reports</strong><br />
          The personal information is required for the business activities of the Company and will not be used for other purposes
        </div>

        <div className="button-container">
          <button className="cleantrak-button">
            <i className="fas fa-th"></i> CleanTrak live
          </button>
        </div>
      </div>

      {/* Table or message */}
      {stats.length === 0 ? (
        <p className="no-stats">No live stats available.</p>
      ) : (
        <div className="table-wrapper">
          <table className="realtime-table">
            <thead>
              <tr>
                <th>Client</th>
                <th className="col-wide">Site Key</th>
                <th className="col-xwide">Site</th>
                <th>Login Server Receive Time</th>
                <th>Login GPS</th>
                <th>Logout Server Receive Time</th>
                <th>Forgot Logout Server Receive Time</th>
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
                      <span>{stat.site}</span>
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
                  <td>
                    {formatDateTime(stat.forgot_logout_server_receive_time)}
                  </td>
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

export default CleanTrakRealtimeDataV2Page;