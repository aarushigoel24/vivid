import React, { useEffect, useState } from "react";
import "../common.css";
import "./newcleaner.css"; // added this line

// Type definitions for cleaner data
interface Certificate {
  type: string;
  ref: string;
  start: string;
  expiry: string;
}

interface Induction {
  client: string;
  ref: string;
  start: string;
  expiry: string;
}

interface Cleaner {
  id: number;
  name: string;
  certificates: Certificate[];
  inductions: Induction[];
  newVividNotes: string;
}

const CleanerAdminV1Page = () => {
  const [cleaners, setCleaners] = useState<Cleaner[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch cleaner data
  useEffect(() => {
    fetch("http://localhost:4000/cleaners")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        return response.json();
      })
      .then((data) => {
        setCleaners(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // Format date helper
  const formatDate = (timestamp: string) => {
    if (!timestamp) return "N/A";
    const date = new Date(timestamp);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // Reusable detail row component
  const renderDetailRow = (label: string, value: string | null) => (
    <div className="detail-row">
      <div className="detail-label">{label}:</div>
      <div className="detail-value">{value || "N/A"}</div>
    </div>
  );

  // Display loading state or error message
  if (loading) return <div>Loading data, please wait...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container">
      <h1 className="page-title">Cleaner Admin</h1>

      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Certificates</th>
            <th>Inductions</th>
            <th>New Vivid Notes</th>
          </tr>
        </thead>
        <tbody>
          {cleaners.map((cleaner) => (
            <tr key={cleaner.id}>
              <td>
                <strong>{cleaner.name}</strong>
                <br />
                <span className="cleaner-id">ID: {cleaner.id}</span>
              </td>
              <td>
                {Array.isArray(cleaner.certificates) && cleaner.certificates.length > 0 ? (
                  <ul className="nested-list">
                    {cleaner.certificates
                      .filter(cert => cert !== null)
                      .map((cert, index) => (
                        <li key={index}>
                          {renderDetailRow("Certificate", cert.type)}
                          {renderDetailRow("Ref", cert.ref)}
                          {renderDetailRow("Start", formatDate(cert.start))}
                          {renderDetailRow("Expiry", formatDate(cert.expiry))}
                        </li>
                      ))}
                  </ul>
                ) : (
                  "No Certificates"
                )}
              </td>
              <td>
                {Array.isArray(cleaner.inductions) && cleaner.inductions.length > 0 ? (
                  <ul className="nested-list">
                    {cleaner.inductions
                      .filter(induction => induction !== null)
                      .map((induction, index) => (
                        <li key={index}>
                          <div className="induction-entry">
                            <div className="induction-client">
                              {induction.client || ""}
                            </div>
                            <div>
                              {renderDetailRow("Ref", induction.ref)}
                              {renderDetailRow("Start", formatDate(induction.start))}
                              {renderDetailRow("Expiry", formatDate(induction.expiry))}
                            </div>
                          </div>
                        </li>
                      ))}
                  </ul>
                ) : (
                  "No Inductions"
                )}
              </td>
              <td>
                {cleaner.newVividNotes === "NEW" ? (
                  <span className="new-badge">⭐</span>
                ) : (
                  cleaner.newVividNotes || "N/A"
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CleanerAdminV1Page;
