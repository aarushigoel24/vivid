import React from "react";
import "./ViewOnScreenPage.css";

const ViewOnScreenPage = () => {
  return (
    <div className="report-wrapper">
      <div className="report-header">
        <button className="close-btn" onClick={() => window.close()}>
          ❌ Close page
        </button>
      </div>

      <div className="legend-row">
        <span className="legend-item red">🔺 Wrong cleaner on site</span>
        <span className="legend-item orange">🔶 Wrong cleaner on site (solved)</span>
        <span className="legend-item green">🟢 My update</span>
      </div>
        <div className="legend-line"></div>
      <table className="clean-status-table">
        <thead>
  <tr>
    <th>Client</th>
    <th>State</th>
    <th>Site ID</th>
    <th>Site Title</th>
    {Array.from({ length: 7 }).map((_, index) => {
      const date = new Date();
      date.setDate(date.getDate() + index);
      const day = date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "2-digit",
      }); // e.g., 18/04/25
      const weekday = date.toLocaleDateString("en-GB", { weekday: "long" }); // e.g., Thursday
      return (
        <th key={index}>
          {day}
          <br />
          {weekday}
        </th>
      );
    })}
  </tr>
</thead>
        <tbody>
          <tr>
            <td>Bank of Australia</td>
            <td>VIC</td>
            <td>13648</td>
            <td>Ballarat - 327 Stuart Street</td>
            <td className="status-cell green">Cleaned</td>
            <td className="status-cell gray">Not Scheduled</td>
            <td className="status-cell blue">Unscheduled Clean</td>
            <td className="status-cell green">Cleaned</td>
            <td className="status-cell green">Cleaned</td>
            <td className="status-cell green">Cleaned</td>
            <td className="status-cell green">Cleaned</td>
          </tr>
          {/* Add more rows as needed */}
        </tbody>
      </table>
    </div>
  );
};

export default ViewOnScreenPage;
