import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/fa"; // 👈 Icons
import Alert from "./alert";
import "../common.css";
import "./configSiteClientData.css";

interface SiteClientRecord {
  clientsiteassocid: number;
  site_name: string;
  client_name: string;
}

const ConfigSiteClientData: React.FC = () => {
  const [site, setSite] = useState("");
  const [client, setClient] = useState("");
  const [records, setRecords] = useState<SiteClientRecord[]>([]);
  const [editId, setEditId] = useState<number | null>(null);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState<"success" | "error" | "warning">("success");
  const [showAlert, setShowAlert] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchRecords();
  }, []);

  const fetchRecords = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:4000/siteClients");
      const data = await response.json();
      if (response.ok) {
        setRecords(data);
      } else {
        throw new Error(data.error || "Failed to fetch records");
      }
    } catch (error) {
      showAlertMessage("Error fetching records", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const showAlertMessage = (message: string, type: "success" | "error" | "warning") => {
    setAlertMessage(message);
    setAlertType(type);
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 5000);
  };

  const handleBack = () => {
    console.log("Back button clicked");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!site || !client) {
      showAlertMessage("Please fill in both fields", "warning");
      return;
    }

    setIsLoading(true);
    try {
      const url = editId
        ? `http://localhost:4000/updateSiteClient/${editId}`
        : "http://localhost:4000/addSiteClient";

      const method = editId ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ site, client }),
      });

      const result = await response.json();

      if (response.ok) {
        if (result.message === "Another record with these values already exists") {
          showAlertMessage(`Record already exists: ${result.existingRecord.client_name} - ${result.existingRecord.site_name}`, "warning");
        } else {
          showAlertMessage(editId ? "Record updated successfully!" : "Record added successfully!", "success");
          fetchRecords();
          resetForm();
        }
      } else {
        throw new Error(result.error || result.message || "Operation failed");
      }
    } catch (error: any) {
      showAlertMessage(error.message || "An error occurred", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (record: SiteClientRecord) => {
    setSite(record.site_name);
    setClient(record.client_name);
    setEditId(record.clientsiteassocid);
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this record?")) return;

    setIsLoading(true);
    try {
      const response = await fetch(`http://localhost:4000/deleteSiteClient/${id}`, {
        method: "DELETE",
      });

      const result = await response.json();

      if (response.ok) {
        showAlertMessage("Record deleted successfully!", "success");
        fetchRecords();
        if (editId === id) resetForm();
      } else {
        throw new Error(result.error || "Deletion failed");
      }
    } catch (error: any) {
      showAlertMessage(error.message || "An error occurred during deletion", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setSite("");
    setClient("");
    setEditId(null);
  };

  return (
    <div className="config-container">
      <h2 className="config-title">
        {editId ? "Update Site & Client" : "Configure Site & Client"}
      </h2>

      <form onSubmit={handleSubmit} className="config-form">
        <div className="input-group">
          <input
            type="text"
            id="client"
            value={client}
            onChange={(e) => setClient(e.target.value)}
            required
            className="modern-input"
          />
          <label htmlFor="client" className="modern-label">Client</label>
        </div>

        <div className="input-group">
          <input
            type="text"
            id="site"
            value={site}
            onChange={(e) => setSite(e.target.value)}
            required
            className="modern-input"
          />
          <label htmlFor="site" className="modern-label">Site</label>
        </div>

        <div className="modern-button-group">
          <button type="button" onClick={handleBack} className="btn-outline" disabled={isLoading}>
            Back
          </button>
          {editId && (
            <button type="button" onClick={resetForm} className="btn-outline" disabled={isLoading}>
              Cancel
            </button>
          )}
          <button type="submit" className="btn-filled" disabled={isLoading}>
            {isLoading ? "Processing..." : editId ? "Update" : "Submit"}
          </button>
        </div>
      </form>

      <div className="records-table">
        <h3>Existing Site-Client Records</h3>
        {isLoading && !records.length ? (
          <p>Loading records...</p>
        ) : records.length === 0 ? (
          <p>No records found</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Client</th>
                <th>Site</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {records.map((record) => (
                <tr key={record.clientsiteassocid}>
                  <td>{record.client_name}</td>
                  <td>{record.site_name}</td>
                  <td className="actions-cell">
                    <button onClick={() => handleEdit(record)} className="icon-btn edit" title="Edit">
                      <FaEdit />
                    </button>
                    <button onClick={() => handleDelete(record.clientsiteassocid)} className="icon-btn delete" title="Delete">
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {showAlert && (
        <Alert type={alertType} message={alertMessage} onClose={() => setShowAlert(false)} />
      )}
    </div>
  );
};

export default ConfigSiteClientData;
