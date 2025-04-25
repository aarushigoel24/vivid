import React, { useEffect, useState } from "react";
import axios from "axios";
import "../common.css";
import "./newcleaner.css";
import { FaUpload, FaEdit, FaTrash, FaTimes } from "react-icons/fa";

interface Certificate {
  id: string;
  cleaner: string;
  type: string;
  client: string;
  refNumber: string;
  startDate: string;
  expiryDate: string;
  fileUrl: string | null;
}

interface ClientSite {
  clientsiteassocid: string;
  site_name: string;
  client_name: string;
}

const CleanerCertificateV1Page = () => {
  const [certificateData, setCertificateData] = useState<Certificate[]>([]);
  const [clientSites, setClientSites] = useState<ClientSite[]>([]);
  const [loading, setLoading] = useState(true);
  const [peopleList, setPeopleList] = useState<any[]>([]);

  const [clientsLoading, setClientsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [formData, setFormData] = useState({
    cert_type: "",
    cert_ref: "",
    client_site_id: "",
    client_name:"",
    data_type: "Certificates",
    file: null as File | null,
      cleaner: ""
  });

  useEffect(() => {
    fetchCertificates();
    fetchClientSites();
  }, []);

  const fetchCertificates = () => {
    setLoading(true);
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
  };

  const fetchClientSites = () => {
    setClientsLoading(true);
    axios
      .get("http://localhost:4000/siteClients-Distinct")
      .then((response) => {
        setClientSites(response.data);
        setClientsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching client sites:", error);
        setClientsLoading(false);
      });
  };

  axios.get("http://localhost:4000/cleanerList")
  .then((response) => {
    if (response.data.success) {
      setPeopleList(response.data.data);
    }
  })
  .catch((error) => {
    console.error("Error fetching people:", error);
  });


  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this certificate?")) {
      axios.delete(`http://localhost:4000/certificates/${id}`)
        .then(() => {
          fetchCertificates();
        })
        .catch(error => {
          console.error("Error deleting certificate:", error);
        });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({ ...prev, file: e.target.files![0] }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Find the selected client site
    const selectedClient = clientSites.find(
      client => client.client_name === formData.client_name
    );
    
    if (!selectedClient) {
      alert("Please select a valid client");
      return;
    }
    const selectedCleaner = peopleList.find(
      person => `${person.firstname} ${person.lastname}` === formData.cleaner
    );
  
    if (!selectedCleaner) {
      alert("Please select a valid cleaner");
      return;
    }
  
    // Create FormData for file upload
    const submitData = new FormData();
    submitData.append('type', formData.cert_type);
    submitData.append('refNumber', formData.cert_ref);
    submitData.append('client', selectedClient.client_name);
    submitData.append('cleanerId', selectedCleaner.peopleid);  
    submitData.append('dataType', formData.data_type);
    submitData.append('epoch', Date.now().toString()); 
    if (formData.file) {
      submitData.append('file', formData.file);
    }

    axios.post("http://localhost:4000/certificates", submitData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then(() => {
      fetchCertificates();
      setShowUploadModal(false);
      setFormData({
        cert_type: "",
        cert_ref: "",
        client_site_id: "",
        data_type: "Certificates",
        file: null,
          cleaner: "",
          client_name:""
      });
    })
    .catch(error => {
      console.error("Error adding certificate:", error);
      alert("Error adding certificate. Please try again.");
    });
  };

  const formatDate = (timestamp: string) => {
    if (!timestamp) return "N/A";
    const date = new Date(timestamp);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  if (loading) return <div className="loading">Loading certificate data...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="container">
      <div className="header-actions">
        <h1 className="page-title">Cleaner Certificate Overview</h1>
        <button 
          className="btn btn-primary"
          onClick={() => setShowUploadModal(true)}
        >
          <FaUpload /> New Certificate Upload
        </button>
      </div>
      <p className="subtext">This page displays cleaner certificate details.</p>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Upload New Certificate</h2>
              <button 
                className="btn-icon btn-close"
                onClick={() => setShowUploadModal(false)}
              >
                <FaTimes />
              </button>
            </div>
            
            <form onSubmit={handleSubmit}>
            <div className="form-group">
  <label htmlFor="cert_type">Certificate Type</label>
  <select
    id="cert_type"
    name="cert_type"
    value={formData.cert_type}
    onChange={handleInputChange}
    required
  >
    <option value="">Select Certificate Type</option>
    <option value="Police Check">Police Check</option>
    <option value="JLL Onsite Induction">JLL Onsite Induction</option>
    <option value="Services Australia Pre Employment Pack (PEP)">
      Services Australia Pre Employment Pack (PEP)
    </option>
  </select>
</div>

              <div className="form-group">
  <label htmlFor="cleaner">Cleaner</label>
  <select
    id="cleaner"
    name="cleaner"
    value={formData.cleaner || ""}
    onChange={handleInputChange}
    required
  >
    <option value="">Select Cleaner</option>
    {peopleList.map((person) => (
      <option key={person.peopleid} value={`${person.firstname} ${person.lastname}`}>
        {person.firstname} {person.lastname} ({person.loginid})
      </option>
    ))}
  </select>
</div>

              <div className="form-group">
                <label htmlFor="cert_ref">Reference Number</label>
                <input type="text"
                  id="cert_ref"
                  name="cert_ref"
                  value={formData.cert_ref}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="client_site_id">Client/Site</label>
                {clientsLoading ? (
                  <select disabled>
                    <option>Loading clients...</option>
                  </select>
                ) : (
                  <select
                  id="client_name"
                  name="client_name" 
                  value={formData.client_name}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Client/Site</option>
                  {clientSites.map((clientSite) => (
                    <option 
                      key={clientSite.clientsiteassocid} 
                      value={clientSite.client_name}
                    >
                      {clientSite.client_name}
                    </option>
                  ))}
                </select>
                
                )}
              </div>
              
              <div className="form-group">
                <label htmlFor="data_type">Data Type</label>
                <select
                  id="data_type"
                  name="data_type"
                  value={formData.data_type}
                  onChange={handleInputChange}
                  required
                >
                  <option value="Certificates">Certificates</option>
                  <option value="Inductions">Inductions</option>
                </select>
              </div>
              
              <div className="form-group">
                <label htmlFor="file">Certificate File</label>
                <input
                  type="file"
                  id="file"
                  name="file"
                  onChange={handleFileChange}
                  required
                />
              </div>
              
              <div className="modal-actions">
                <button 
                  type="button" 
                  className="btn btn-secondary" 
                  onClick={() => setShowUploadModal(false)}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="btn btn-primary"
                  disabled={clientsLoading}
                >
                  Upload Certificate
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

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
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {certificateData.length === 0 ? (
            <tr>
              <td colSpan={8} className="no-data">
                No certificate data available.
              </td>
            </tr>
          ) : (
            certificateData.map((item) => (
              <tr key={item.id}>
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
                <td className="actions">
                  <button 
                    className="btn-icon btn-edit"
                    onClick={() => console.log("Edit", item.id)}
                    title="Edit"
                  >
                    <FaEdit />
                  </button>
                  <button 
                    className="btn-icon btn-delete"
                    onClick={() => handleDelete(item.id)}
                    title="Delete"
                  >
                    <FaTrash />
                  </button>
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