import React, { useEffect, useState } from "react";
import axios from "axios";
import "../common.css";
import "./newcleaner.css";

// Type definition for the certificate data
interface Certificate {
  cleaner: string;
  type: string;
  client: string;
  refNumber: string;
  startDate: string;
  expiryDate: string;
  fileUrl: string | null;
}

const CleanerCertificateV1Page = () => {
  const [certificateData, setCertificateData] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get("http://localhost:4000/certificates")
      .then((response) => {
        setCertificateData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError("Error fetching certificate data.");
        setLoading(false);
      });
  }, []);

  // Format date helper function
  const formatDate = (timestamp: string) => {
    if (!timestamp) return "N/A";
    const date = new Date(timestamp);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // Loading state
  if (loading) return <div>Loading certificate data...</div>;

  // Error state
  if (error) return <div>{error}</div>;

  return (
    <div className="container">
      <h1 className="page-title">Cleaner Certificate Overview</h1>
      <p className="subtext">This page displays cleaner certificate details.</p>

      <table className="table table-striped">
        <thead>
          <tr>
            <th>Cleaner</th>
            <th>Certificate Type</th>
            <th>Client</th>
            <th>Ref No.</th>
            <th>Start Date</th>
            <th>Expiry Date</th>
            <th>File</th>
          </tr>
        </thead>
        <tbody>
          {certificateData.length === 0 ? (
            <tr>
              <td colSpan={7} className="no-data">
                No certificate data available.
              </td>
            </tr>
          ) : (
            certificateData.map((item, index) => (
              <tr key={index}>
                <td>{item.cleaner}</td>
                <td>{item.type}</td>
                <td>{item.client || "-"}</td>
                <td>{item.refNumber}</td>
                <td>{formatDate(item.startDate)}</td>
                <td>{formatDate(item.expiryDate)}</td>
                <td>
                  {item.fileUrl ? (
                    <a
                      href={item.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="file-link"
                    >
                      View File
                    </a>
                  ) : (
                    "-"
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CleanerCertificateV1Page;
