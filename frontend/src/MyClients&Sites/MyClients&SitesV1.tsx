import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaFlag, FaKey } from "react-icons/fa";
import "./cleanerschedule.css";

// Days of the week
const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

// Define the types for the cleaner data structure
interface Cleaner {
  name: string;
  isPrimary: boolean;
  hasKey: boolean;
}

interface Manager {
  name: string;
  contact: string;
  email: string;
}

interface CleanerSchedule {
  client: string;
  site: string[];
  manager: Manager;
  cleaners: Cleaner[];
  schedule: number[];
}

const CleanerScheduleTable = () => {
  const [cleanerData, setCleanerData] = useState<CleanerSchedule[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCleanerChanges = async () => {
      try {
        const response = await axios.get("http://localhost:4000/all_cleaner_changes");
        console.log("API Response:", response.data);

        // Group by site_name
        const grouped = response.data.reduce((acc: Record<string, CleanerSchedule>, item: any) => {
          const siteKey = item.site_name;

          if (!acc[siteKey]) {
            acc[siteKey] = {
              client: item.clientsiteid,
              site: [item.site_name],
              manager: {
                name: item.manager_name,
                contact: item.manager_contact,
                email: item.manager_email,
              },
              cleaners: [],
              schedule: item.schedule || [0, 0, 0, 2, 0, 0, 4], // fallback
            };
          }

          acc[siteKey].cleaners.push({
            name: `${item.cleaner_firstname} ${item.cleaner_lastname}`,
            isPrimary: Number(item.primary_cleaner) === 1,
            hasKey: Number(item.keyholder) === 1,
          });

          return acc;
        }, {});

        setCleanerData(Object.values(grouped));
      } catch (error) {
        console.error("Failed to fetch cleaner changes:", error);
        setError("Failed to load cleaner data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchCleanerChanges();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="cleanup-container">
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "20px", fontSize: "14px", marginBottom: "8px" }}>
        <div><FaFlag className="flag-icon" /> Primary Cleaner</div>
        <div><FaKey className="key-icon" /> Signed For Key</div>
      </div>

      <div className="container">
        <table className="table">
          <thead>
            <tr>
              <th>Client</th>
              <th>Site address</th>
              <th>Vivid operations manager</th>
              <th className="col-wide">Cleaner</th>
              <th colSpan={7} style={{ textAlign: "center" }}>Cleaning schedule (hours)</th>
            </tr>
            <tr>
              <th colSpan={4}></th>
              {days.map((day, idx) => (
                <th key={idx}>{day}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {cleanerData.map((row, index) => (
              <tr key={index}>
                <td>{row.client}</td>
                <td>{row.site.map((line, i) => <div key={i}>{line}</div>)}</td>
                <td>
                  {row.manager.name} ({row.manager.contact})
                  <br />
                  <span className="email">{row.manager.email}</span>
                </td>
                <td>
                  <ul>
                    {row.cleaners.map((cleaner, i) => (
                      <li key={i} style={{ marginBottom: "8px" }}>
                        {cleaner.isPrimary && <FaFlag className="flag-icon" />}
                        {cleaner.hasKey && <FaKey className="key-icon" />}
                        {cleaner.name}
                      </li>
                    ))}
                  </ul>
                </td>
                {row.schedule.map((hour, i) => (
                  <td key={i}>{hour !== 0 ? hour : ""}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CleanerScheduleTable;
