import React from "react";
import "../common.css";
import "./DailyCleanReportV1.css";

const DailyCleanReportV1Page = () => {
  
  return (
    <div className="container">
      <div className="section-card filter-section">
        
        <div className="filter-row" >
        
          <div className="form-group">
          
          <label className="static-label">{"Select Client"}</label>
      
      
          </div>
          <div className="form-group">
          
          <label className="static-label">{"Select Site"}</label>
      
      
          </div>
          <div className="button-group">
          <button className="btn blue">🔍Filter</button>
          <button className="btn blue">📄Excel</button>
          </div>
        </div>
      </div>
      <div className="section-card filter-section">
      <div className="info-banner">
        System will only generate report up to 6 weeks.
      </div>

      <div className="heading">Client Clean Status</div>

      <div className="button-group center-buttons">
        <button className="btn"  onClick={() => window.open("/status-screen", "_blank")}>
          <span role="img" aria-label="view">🖥️</span> View on screen
        </button>

        <div className="button-row">
          <button className="btn">
            <span role="img" aria-label="excel">📊</span> Generate Excel (V)
          </button>
         
        </div>

        <button className="btn">
          <span role="img" aria-label="excel">📊</span> Generate Excel (H)
        </button>
        
      </div>
    
      <div className="info-banner-bottom">
      Please only click excel button once per 5 minutes as you will kill the system.
      </div>

        
      </div>
      
    </div>
  );
};

export default DailyCleanReportV1Page;
