import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "./newcleaner.css";
import "../common.css";

// Define the type for cleaner change data
interface CleanerChange {
  site_name: string;
  clientsiteid: string;
  change_cleaner_start_date: string;
  comments: string;
  status: string;
  cleaner_firstname: string;
  cleaner_lastname: string;
}

// Define the type for grouped cleaner data
interface GroupedCleaner {
  site_name: string;
  client_name: string;
  effective_date: string;
  my_comment: string;
  vivid_comment: string;
  status: string;
  cleaners: string[];
}

const ChangeCleanerPage = () => {
  const navigate = useNavigate();
  const [cleanerChanges, setCleanerChanges] = useState<CleanerChange[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const goToNewCleanerChange = () => {
    navigate("/layout/NewCleanerChange");
  };

  useEffect(() => {
    const fetchCleanerChanges = async () => {
      try {
        const response = await axios.get("http://localhost:4000/all_cleaner_changes");
        setCleanerChanges(response.data);
      } catch (error) {
        console.error("Failed to fetch cleaner changes:", error);
        setError("Failed to load cleaner data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchCleanerChanges();
  }, []);

  // Group data by site name
  const groupedBySite = cleanerChanges.reduce((acc: Record<string, GroupedCleaner>, row: CleanerChange) => {
    const key = row.site_name;

    if (!acc[key]) {
      acc[key] = {
        site_name: row.site_name,
        client_name: row.clientsiteid,
        effective_date: row.change_cleaner_start_date,
        my_comment: row.comments,
        vivid_comment: row.comments,
        status: row.status,
        cleaners: [],
      };
    }

    const fullName = `${row.cleaner_firstname} ${row.cleaner_lastname}`;
    acc[key].cleaners.push(fullName);
    return acc;
  }, {});

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container">
      <div className="inline-header">
        <h2 className="section-header">Cleaner Changes</h2>
        <button className="btn add" onClick={goToNewCleanerChange}>
          + New Cleaner Change
        </button>
      </div>

      <div className="table-wrapper">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Client</th>
              <th>Site</th>
              <th>New Assigned Cleaners</th>
              <th>Effective Date</th>
              <th>My Comment</th>
              <th>Vivid Comment</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {Object.values(groupedBySite).map((row, index) => (
              <tr key={index}>
                <td>{row.client_name}</td>
                <td>
                  {row.site_name}
                  <br />
                  <span className="status-draft">(Draft Site)</span>
                </td>
                <td>
                  <ul className="cleaner-list">
                    {row.cleaners.map((name, i) => (
                      <li key={i}>{name}</li>
                    ))}
                  </ul>
                </td>
                <td>
                  {new Date(Number(row.effective_date) * 1000).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </td>
                <td>
                  <div className="comment-text">{row.my_comment}</div>
                </td>
                <td>
                  <div className="comment-text">{row.vivid_comment}</div>
                </td>
                <td>
                  <div className="status-text">
                    {row.status?.toUpperCase()}
                    <div className="status-date">
                      {new Date(Number(row.effective_date) * 1000).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </div>
                  </div>
                </td>
                <td>
                  <button className="btn small">
                    <i className="fas fa-search"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ChangeCleanerPage;
