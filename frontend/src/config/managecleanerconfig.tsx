import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaEdit, FaTrash } from "react-icons/fa"; // Import icons
import "../common.css"; // Import CSS for styling
import "./cleanersList.css";

interface Cleaner {
    peopleid: number;
  firstname: string;
  lastname: string;
  email: string;
  contact: string;
}

const CleanersListPage = () => {
  const navigate = useNavigate();
  const [cleaners, setCleaners] = useState<Cleaner[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchCleaners = async () => {
      try {
        const response = await axios.get("http://localhost:4000/cleanerList");
        setCleaners(response.data.data);
        console.log("Received cleaners:", response.data.data);
      } catch (err) {
        setError("Failed to fetch cleaners");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCleaners();
  }, []);

  

  const filteredCleaners = cleaners.filter(
    (cleaner) =>
      `${cleaner.firstname} ${cleaner.lastname}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      cleaner.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (peopleid: number) => {
    console.log("Editing cleaner with peopleid:", peopleid);
    navigate(`/layout/CleanerConfigPage/${peopleid.toString()}`);
  };
  
  

  const handleDelete = async (peopleid: number) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this cleaner?");
    if (!confirmDelete) return;
  
    try {
      const response = await axios.delete("http://localhost:4000/delete_cleaner", {
        data: {
          peopleid,
        },
      });
  
      if (response.data.success) {
        console.log(`Cleaner with ID ${peopleid} deleted successfully.`);
        setCleaners((prevCleaners) =>
          prevCleaners.filter((cleaner) => cleaner.peopleid !== peopleid)
        );
      } else {
        console.error("Failed to delete cleaner:", response.data);
      }
    } catch (error) {
      console.error("Error during delete request:", error);
    }
  };
  

  if (loading) return <div className="loading">Loading cleaners...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="container">
      <div className="header">
        <h1>Cleaners Management</h1>
        <button
          className="btn-primary"
          onClick={() => navigate("/layout/CleanerConfigPage")}
        >
          + Add New Cleaner
        </button>
      </div>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by name, email ..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <span className="results-count">
          Showing {filteredCleaners.length} of {cleaners.length} cleaners
        </span>
      </div>

      <div className="table-container">
        {filteredCleaners.length === 0 ? (
          <div className="no-results">No results found</div>
        ) : (
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCleaners.map((cleaner) => (
                <tr key={cleaner.peopleid}>
                  <td>{cleaner.firstname} {cleaner.lastname}</td>
                  <td>{cleaner.email}</td>
                  <td>{cleaner.contact}</td>
                  <td>
                    <button
                      className="btn-action edit"
                      onClick={() => handleEdit(cleaner.peopleid)}
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="btn-action delete"
                      onClick={() => handleDelete(cleaner.peopleid)}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default CleanersListPage;