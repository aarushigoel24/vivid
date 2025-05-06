import React, { useEffect, useState } from "react";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import "./createWorkOrderPage.css";

interface SiteClient {
  clientsiteassocid: number;
  site_name: string;
  client_name: string;
}

interface OptionType {
  label: string;
  value: string;
}

const CreateWorkOrderPage: React.FC = () => {
  const [data, setData] = useState<SiteClient[]>([]);
  const [selectedClient, setSelectedClient] = useState<OptionType | null>(null);
  const [selectedSite, setSelectedSite] = useState<OptionType | null>(null);
  const [workOrderType, setWorkOrderType] = useState<OptionType | null>(null);
  const [workOrderActivity, setWorkOrderActivity] = useState<OptionType | null>(null);
  const [priority, setPriority] = useState<OptionType | null>(null);
  const [completionTime, setCompletionTime] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [description, setDescription] = useState("");
  const [areaAffected, setAreaAffected] = useState("");
  const [specialNotes, setSpecialNotes] = useState("");
  const [showClassification, setShowClassification] = useState(true);
  const [showScope, setShowScope] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:4000/siteClients");
      const result = await response.json();
      if (Array.isArray(result)) {
        setData(result);
      } else {
        throw new Error("Invalid response format");
      }
    } catch (error) {
      console.error("Failed to fetch site-client data", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append("selectedClient", selectedClient?.value || "");
    formData.append("selectedSite", selectedSite?.value || "");
    formData.append("workOrderType", workOrderType?.value || "");
    formData.append("workOrderActivity", workOrderActivity?.value || "");
    formData.append("priority", priority?.value || "");
    formData.append("completionTime", completionTime);
    formData.append("description", description);
   
   
  
    try {
      // Sending the form data to the server
      const response = await fetch("http://localhost:4000/addWorkOrder", {
        method: "POST",
        body: formData,
      });
  
      const result = await response.json();
      if (response.ok) {
        alert("Work Order Submitted!");
        console.log(result); // Log the result for debugging
      } else {
        alert("Error submitting the work order.");
        console.error(result);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("There was an error with the submission.");
    }
  };
  


  const handleCancel = () => {
    setSelectedClient(null);
    setSelectedSite(null);
    setWorkOrderType(null);
    setWorkOrderActivity(null);
    setPriority(null);
    setCompletionTime("");
    setDescription("");
    setAreaAffected("");
    setSpecialNotes("");
    navigate(-1);
    
  };

  const clientOptions: OptionType[] = Array.from(
    new Set(data.map((item) => item.client_name))
  ).map((client) => ({ label: client, value: client }));

  const siteOptions: OptionType[] = data
    .filter((item) => item.client_name === selectedClient?.value)
    .map((item) => ({ label: item.site_name, value: item.site_name }));

  return (
    <div className="workorder-container">
      <h2>New Work Order</h2>

      <form onSubmit={handleSubmit}>
        <div className="collapsible-section">
          <h3 className="collapsible-heading" onClick={() => setShowClassification(!showClassification)}>
            Work Order Classification
          </h3>
          {showClassification && (
            <div className="form-grid">
              <div className="form-group">
                <label>Client</label>
                <Select
                
                  options={clientOptions}
                  value={selectedClient}
                  onChange={(client) => {
                    setSelectedClient(client);
                    setSelectedSite(null); // Clear selected site whenever client changes
                  }}
                  placeholder="Select Client"
                />
              </div>

              <div className="form-group">
                <label>Site</label>
                <Select
                  options={siteOptions}
                  value={selectedSite}
                  onChange={setSelectedSite}
                  placeholder="Select Site"
                  isDisabled={!selectedClient}
                />
              </div>

              <div className="form-group">
                <label>Work Order Type</label>
                <Select
                  options={[
                    { label: "Adhoc", value: "Adhoc" },
                    { label: "Periodical", value: "Periodical" },
                  ]}
                  value={workOrderType}
                  onChange={setWorkOrderType}
                  placeholder="Select Type"
                />
              </div>

              <div className="form-group">
                <label>Work Order Activity</label>
                <Select
                  options={[
                    { label: "Extra Clean", value: "Extra Clean" },
                    { label: "General Clean", value: "General Clean" },
                  ]}
                  value={workOrderActivity}
                  onChange={setWorkOrderActivity}
                  placeholder="Select Activity"
                />
              </div>

              <div className="form-group">
                <label>Work Order Priority</label>
                <Select
                  options={[
                    { label: "Priority 4 – within 5 days", value: "Priority 4 – within 5 days" },
                    { label: "Priority 3 – within 3 days", value: "Priority 3 – within 4 days" },
                    { label: "Priority 2 – within 1 days", value: "Priority 2 – within 1 days" },
                    { label: "Priority 1 – same day", value: "Priority 1 – same day" },
                  ]}
                  value={priority}
                  onChange={setPriority}
                  placeholder="Select Priority"
                />
              </div>

              <div className="form-group">
                <label>Required Completion Time</label>
                <input
                  type="datetime-local"
                  value={completionTime}
                  onChange={(e) => setCompletionTime(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Supported File</label>
                <input
                  type="file"
                  onChange={(e) => setFile(e.target.files?.[0] || null)} // Handle file change
                  accept=".pdf,.docx,.jpg,.png"
                />
              </div>
            </div>
          )}
        </div>

        <div className="collapsible-section">
          <h3 className="collapsible-heading" onClick={() => setShowScope(!showScope)}>
            Scope of Work
          </h3>
          {showScope && (
            <div className="form-grid">
              <div className="form-group">
                <label>Description</label>
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
              </div>
              <div className="form-group">
                <label>Area Affected</label>
                <textarea value={areaAffected} onChange={(e) => setAreaAffected(e.target.value)} />
              </div>
              <div className="form-group">
                <label>Special Notes</label>
                <textarea value={specialNotes} onChange={(e) => setSpecialNotes(e.target.value)} />
              </div>
            </div>
          )}
        </div>

        <div className="button-group">
          <button type="button" className="btn-cancel" onClick={handleCancel}>
            Cancel
          </button>
          <button type="submit" className="btn-submit ">
            Submit
          </button>
        </div>
      </form>

      {loading && <p>Loading data...</p>}
    </div>
  );
};

export default CreateWorkOrderPage;
