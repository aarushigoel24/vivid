import React, { useEffect, useState } from "react";
import axios from "axios";
import "../common.css";
import "./TimeOnSiteProgressPage.css";

interface Contract {
  clientcontractassocid: string;
  client_name: string;
  site_name: string;
  contractdate: string;
  contracthrs: string;
  deliveredhrs: string;
  loss: string;
  attendance: string;
  servicecomments?: string;
}

interface Totals {
  totalContractHours: string;
  totalDeliveredHours: string;
  totalTOSLessContractedHours: string;
  totalLoss: string;
  totalAttendance: string;
}

// Helper to get Sunday of the week a date belongs to
const getWeekEndingSunday = (dateStr: string): string => {
  const date = new Date(dateStr);
  const day = date.getDay();
  const diff = 7 - day;
  const sunday = new Date(date);
  sunday.setDate(date.getDate() + diff);
  return sunday.toISOString().split("T")[0];
};

const formatDate = (timestamp: string): string => {
  if (!timestamp) return "N/A";
  const date = new Date(timestamp);
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

// Group contracts by week ending Sunday
const groupByWeek = (contracts: Contract[]): Record<string, Contract[]> => {
  const groups: Record<string, Contract[]> = {};

  contracts.forEach((item) => {
    const weekEnding = getWeekEndingSunday(item.contractdate);
    if (!groups[weekEnding]) groups[weekEnding] = [];
    groups[weekEnding].push(item);
  });

  return groups;
};

const TimeOnSiteProgressPage: React.FC = () => {
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [selectedSite, setSelectedSite] = useState("");
  useEffect(() => {
    axios
      .get<Contract[]>("http://localhost:4000/all_contracts")
      .then((res) => setContracts(res.data))
      .catch((err) => console.error("Error fetching contracts:", err));
  }, []);

  const grouped = groupByWeek(contracts);

  const handleCommentChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
    clientContractAssocId: string
  ) => {
    const updatedContracts = contracts.map((contract) =>
      contract.clientcontractassocid === clientContractAssocId
        ? { ...contract, servicecomments: event.target.value }
        : contract
    );
    setContracts(updatedContracts);
  };

  const saveComments = () => {
    contracts.forEach((contract) => {
      if (contract.servicecomments) {
        axios
          .put(`http://localhost:4000/update_contract/${contract.clientcontractassocid}`, {
            comment: contract.servicecomments,
          })
          .then((res) => {
            console.log(`Comment saved for contract ${contract.clientcontractassocid}`);
          })
          .catch((err) => console.error(`Error saving comment for contract ${contract.clientcontractassocid}:`, err));
      }
    });
  };

  // Calculate totals
  const calculateTotals = (): Totals => {
    let totalContractHours = 0;
    let totalDeliveredHours = 0;
    let totalTOSLessContractedHours = 0;
    let totalLoss = 0;
    let totalAttendance = 0;
    let count = 0;

    contracts.forEach((contract) => {
      totalContractHours += parseFloat(contract.contracthrs || "0");
      totalDeliveredHours += parseFloat(contract.deliveredhrs || "0");
      totalTOSLessContractedHours += parseFloat(contract.contracthrs || "0") - parseFloat(contract.deliveredhrs || "0");
      totalLoss += parseFloat(contract.loss || "0");
      totalAttendance += parseFloat(contract.attendance || "0");
      count++;
    });

    return {
      totalContractHours: totalContractHours.toFixed(2),
      totalDeliveredHours: totalDeliveredHours.toFixed(2),
      totalTOSLessContractedHours: totalTOSLessContractedHours.toFixed(2),
      totalLoss: totalLoss.toFixed(2),
      totalAttendance: count > 0 ? (totalAttendance / count).toFixed(2) : "0.00",
    };
  };

  const totals = calculateTotals();

  return (
    <div className="container">
      <div className="wo-header">
      <strong>⚙️ Operations {">"} ⏱️ Time On Site Progress</strong>

        </div>
        <div className="section-card filter-section">
        
  <div className="filter-row" >
  
    <div className="form-group">
    
    <label className="static-label">{selectedSite || "Select Client"}</label>


    </div>
    <div className="form-group">
    
    <label className="static-label">{selectedSite || "Select Site"}</label>


    </div>
    <div className="button-group">
    <button className="btn blue">🔍Filter</button>
    <button className="btn blue">📄Excel</button>
    </div>
  </div>
</div>
      <div className="section-card">
        
        <div className="section-header"></div>

        <div className="table-wrapper">
          <table className="table">
            <thead>
              <tr>
                <th className="col-wide">Client</th>
                <th className="col-wide">Site</th>
                <th className="col-wide">Clean date</th>
                <th>Clean day</th>
                <th className="contract">Contract Hours</th>
                <th className="deliverhrs">Delivered hours</th>
                <th className="contractedhrs">TOS less contracted hours</th>
                <th className="actualloss">Actual Loss $</th>
                <th className="attendance">Attendance Rate %</th>
                <th className="col-xwide">
                  <div className="header-with-button">
                    <div className="button-group">
                      <button className="btn" onClick={saveComments}>Save Comments</button>
                    </div>
                    <div className="header-label">Service Provider Comments</div>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(grouped)
                .sort(([a], [b]) => new Date(a).getTime() - new Date(b).getTime())
                .map(([weekEnd, items]) => {
                  const sortedItems = items.sort(
                    (a, b) => new Date(a.contractdate).getTime() - new Date(b.contractdate).getTime()
                  );

                  const formattedWeek = new Date(weekEnd).toLocaleDateString(
                    "en-GB",
                    { day: "2-digit", month: "short", year: "numeric" }
                  );

                  return (
                    <React.Fragment key={weekEnd}>
                      <tr className="week-heading-row">
                        <td colSpan={10} className="week-heading">
                          Week ending {formattedWeek}
                        </td>
                      </tr>
                      {sortedItems.map((row, idx) => (
                        <tr key={idx}>
                          <td>{row.client_name}</td>
                          <td>{row.site_name}</td>
                          <td>{formatDate(row.contractdate)}</td>
                          <td>
                            {new Date(row.contractdate).toLocaleDateString(
                              "en-GB",
                              { weekday: "short" }
                            )}
                          </td>
                          <td>{row.contracthrs}</td>
                          <td>{row.deliveredhrs}</td>
                          <td className="red-text">
                            {(
                              parseFloat(row.contracthrs || "0") -
                              parseFloat(row.deliveredhrs || "0")
                            ).toFixed(2)}
                          </td>
                          <td>{row.loss}</td>
                          <td>{row.attendance}</td>
                          <td>
                            <textarea
                              className="comment-box"
                              rows={2}
                              value={row.servicecomments || ""}
                              onChange={(e) => handleCommentChange(e, row.clientcontractassocid)}
                              placeholder="Enter comments"
                            />
                          </td>
                        </tr>
                      ))}
                    </React.Fragment>
                  );
                })}
            </tbody>
            <tfoot>
              <tr className="total-row">
                <td colSpan={4}>Total</td>
                <td>{totals.totalContractHours}</td>
                <td>{totals.totalDeliveredHours}</td>
                <td>{totals.totalTOSLessContractedHours}</td>
                <td>{totals.totalLoss}</td>
                <td>{totals.totalAttendance}</td>
                <td>
                  <div className="button-group">
                    <button className="btn" onClick={saveComments}>Save Comments</button>
                  </div>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TimeOnSiteProgressPage;