import React, { useState, useEffect } from "react";
import axios from "axios";
import "./newcleaner.css";
import "../common.css";
import { useNavigate } from "react-router-dom";

// Define types for the cleaner and site data
interface Cleaner {
  cleaner_lastname: string;
  cleaner_firstname: string;
  peopleid: string;
  firstname: string;
  lastname: string;
  primary: boolean;
  keyholder: boolean;
}

interface ClientSiteData {
  client: string;
  site: string;
}

const NewCleanerChangePage: React.FC = () => {
  const [clientSiteData, setClientSiteData] = useState<ClientSiteData[]>([]);
  const [selectedClient, setSelectedClient] = useState<string>("");
  const [selectedSite, setSelectedSite] = useState<string>("");
  const [showForm, setShowForm] = useState<boolean>(false);

  const [comments, setComments] = useState<string>("");
  const [keysdropon, setkeysdropon] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [dropDate, setDropDate] = useState<string>("");
  const [collectDate, setCollectDate] = useState<string>("");
  const [collectOn, setCollectOn] = useState<string>("");
  const [inductionDate, setInductionDate] = useState<string>("");

  const [allCleaners, setAllCleaners] = useState<Cleaner[]>([]);
  const [selectedCleaners, setSelectedCleaners] = useState<Cleaner[]>([]);
  const [siteCleaners, setSiteCleaners] = useState<Cleaner[]>([]);
  const [showCleanerRoles, setShowCleanerRoles] = useState<boolean>(false);

  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:4000/client-sites")
      .then(res => setClientSiteData(res.data))
      .catch(err => console.error("Failed to fetch client-site data", err));

    axios.get("http://localhost:4000/cleanerRecord")
      .then(res => setAllCleaners(res.data))
      .catch(err => console.error("Failed to fetch cleaners", err));
  }, []);

  const handleSiteChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const site = e.target.value;
    setSelectedSite(site);
    setShowForm(!!site);

    if (site) {
      axios.get(`http://localhost:4000/vivid_sitepeople_assoc?site=${site}`)
        .then(res => setSiteCleaners(res.data))
        .catch(err => console.error("Failed to fetch site cleaners", err));
    } else {
      setSiteCleaners([]);
    }
  };

  const handleRemoveCleaner = (cleaner: Cleaner) => {
    axios.delete(`http://localhost:4000/vivid_sitepeople_assoc`, {
      data: { site: selectedSite, peopleid: cleaner.peopleid }
    })
      .then(() => {
        setSelectedCleaners(prev => prev.filter(c => c.peopleid !== cleaner.peopleid));
        setSiteCleaners(prev => prev.filter(c => c.peopleid !== cleaner.peopleid));
      })
      .catch(err => {
        console.error("Failed to remove cleaner from DB", err);
        setSelectedCleaners(prev => prev.filter(c => c.peopleid !== cleaner.peopleid));
        setSiteCleaners(prev => prev.filter(c => c.peopleid !== cleaner.peopleid));
      });
  };

  const handleEditCleaner = (cleaner: Cleaner) => {
    setShowCleanerRoles(true);
    const exists = selectedCleaners.some(c => c.peopleid === cleaner.peopleid);
    if (!exists) {
      const cleanerToEdit: Cleaner = {
        peopleid: cleaner.peopleid,
        firstname: cleaner.cleaner_firstname,
        lastname: cleaner.cleaner_lastname,
        primary: cleaner.primary,
        keyholder: cleaner.keyholder,
        cleaner_lastname: cleaner.cleaner_lastname,
        cleaner_firstname: cleaner.cleaner_firstname
      };
      setSelectedCleaners(prev => [...prev, cleanerToEdit]);
    }
  };

  const togglePrimary = (index: number) => {
    const updated = selectedCleaners.map((c, i) => ({ ...c, primary: i === index }));
    setSelectedCleaners(updated);
    setSiteCleaners(prev => prev.map(sc => ({
      ...sc,
      primary: updated.find(c => c.peopleid === sc.peopleid)?.primary || false
    })));
  };

  const toggleKeyholder = (index: number) => {
    const updated = [...selectedCleaners];
    updated[index].keyholder = !updated[index].keyholder;
    setSelectedCleaners(updated);
    setSiteCleaners(prev => prev.map(sc => ({
      ...sc,
      keyholder: updated.find(c => c.peopleid === sc.peopleid)?.keyholder || false
    })));
  };

  const uniqueClients = [...new Set(clientSiteData.map(entry => entry.client))];
  const filteredSites = clientSiteData.filter(entry => entry.client === selectedClient);

  const handleAdd = () => {
    const toEpoch = (dateStr: string) => dateStr ? Math.floor(new Date(dateStr).getTime() / 1000) : null;
    const payload = {
      comments,
      site: selectedSite,
      client: selectedClient,
      keysdropon,
      startDate: toEpoch(startDate),
      endDate: toEpoch(endDate),
      dropDate: toEpoch(dropDate),
      collectDate: toEpoch(collectDate),
      collectOn,
      inductionDate: toEpoch(inductionDate),
      cleaners: selectedCleaners.map(c => ({
        peopleid: c.peopleid,
        firstname: c.firstname,
        lastname: c.lastname,
        primary: c.primary,
        keyholder: c.keyholder
      }))
    };

    axios.post("http://localhost:4000/vivid_sitepeople_assoc", payload)
      .then(() => navigate("/layout/ChangeCleaner"))
      .catch(err => console.error("Error submitting data", err));
  };

  return (
    <div className="container">
      {/* Site Selection */}
      <div className="section-card">
        <div className="section-header">Site Selection</div>
        <div className="form-row">
          <div className="form-group">
            <label>Client</label>
            <select value={selectedClient} onChange={(e) => setSelectedClient(e.target.value)}>
              <option value="">Select a client</option>
              {uniqueClients.map((client, index) => (
                <option key={index} value={client}>{client}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Site</label>
            <select value={selectedSite} onChange={handleSiteChange}>
              <option value="">Select a site</option>
              {filteredSites.map((entry, index) => (
                <option key={index} value={entry.site}>{entry.site}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-row no-border">
          <div className="form-static"><label>Client</label><div>{selectedClient || "—"}</div></div>
          <div className="form-static"><label>Site</label><div>{selectedSite || "—"}</div></div>
          <div className="form-static"><label>Status</label><div className="status-draft">Draft</div></div>
        </div>
      </div>
      <div className="section-card">
            <div className="section-header">Associated Cleaners</div>
            <div className="container">
              {siteCleaners.length > 0 ? (
                <table className="table">
                  <thead>
                    <tr>
                      <th>First Name</th>
                      <th>Last Name</th>
                      <th>Primary</th>
                      <th>Keyholder</th>
                      <th>Edit</th>
                    </tr>
                  </thead>
                  <tbody>
                    {siteCleaners.map(cleaner => (
                      <tr key={cleaner.peopleid}>
                        <td>{cleaner.cleaner_firstname}</td>
                        <td>{cleaner.cleaner_lastname}</td>
                        <td>{cleaner.primary ? "Yes" : "No"}</td>
                        <td>{cleaner.keyholder ? "Yes" : "No"}</td>
                        <td><button className="btn small" onClick={() => handleEditCleaner(cleaner)}>✏️ Edit</button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div>No cleaners assigned to this site.</div>
              )}
            </div>
          </div>        
      {/* Cleaner Management */}
      {showForm && (
        <>
          <div className="section-card">
            <div className="section-header inline-header">
              <button className="btn small toggle-btn" onClick={() => setShowCleanerRoles(prev => !prev)}>
                {showCleanerRoles ? "✖ Close" : "+ Add Cleaner"}
              </button>
            </div>

            {showCleanerRoles && (
              <>
                <div className="form-row">
                  <div className="form-group">
                    <label>Select Cleaner to add/update</label>
                    <select
                      onChange={(e) => {
                        const selectedId = e.target.value;
                        if (!selectedId) return;
                        const selectedCleaner = allCleaners.find(c => c.peopleid === selectedId);
                        if (!selectedCleaner) return;

                        const exists = selectedCleaners.some(c => c.peopleid === selectedCleaner.peopleid);
                        if (!exists) {
                          const cleanerWithRoles = { ...selectedCleaner, primary: false, keyholder: false };
                          setSelectedCleaners(prev => [...prev, cleanerWithRoles]);
                          setSiteCleaners(prev => [...prev, {
                            ...cleanerWithRoles,
                            cleaner_firstname: selectedCleaner.firstname,
                            cleaner_lastname: selectedCleaner.lastname
                          }]);
                        }
                        e.target.value = "";
                      }}
                    >
                      <option value="">Select cleaner</option>
                      {allCleaners.filter(c =>
                        !selectedCleaners.some(s => s.peopleid === c.peopleid) &&
                        !siteCleaners.some(s => s.peopleid === c.peopleid)
                      ).map(cleaner => (
                        <option key={cleaner.peopleid} value={cleaner.peopleid}>
                          {cleaner.firstname} {cleaner.lastname}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {selectedCleaners.map((cleaner, index) => (
                  <div className="form-row" key={cleaner.peopleid}>
                    <div className="form-static"><strong>{cleaner.firstname} {cleaner.lastname}</strong></div>
                   
                    <div className="form-group checkbox-group">
                      <label><input type="checkbox" checked={cleaner.primary} onChange={() => togglePrimary(index)} /> Primary</label>
                    </div>
                    <div className="form-group checkbox-group">
                      <label><input type="checkbox" checked={cleaner.keyholder} onChange={() => toggleKeyholder(index)} /> Keyholder</label>
                    </div>
                    <div>
                      <button className="btn small danger  remove-btn" onClick={() => handleRemoveCleaner(cleaner)}>🗑️ Remove</button>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>

          

          <div className="section-card">
            <div className="section-header">Change Cleaner Comments</div>
            <div className="form-row">
              <div className="form-group quarter-width">
                <label>Site Induction Date <span className="required">*</span></label>
                <input type="date" value={inductionDate} onChange={(e) => setInductionDate(e.target.value)} />
              </div>
              <div className="form-group three-quarter-width">
                <label>Comments</label>
                <textarea rows={1} value={comments} onChange={(e) => setComments(e.target.value)} />
              </div>
            </div>
          </div>

          <div className="button-group">
            <button className="btn add" onClick={handleAdd}>➕ Add</button>
            <button className="btn back" onClick={() => navigate("/layout/ChangeCleaner")}>⬅ Back</button>
          </div>
        </>
      )}
    </div>
  );
};

export default NewCleanerChangePage;
