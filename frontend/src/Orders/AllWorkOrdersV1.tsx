

import "./OrdersPage.css";
import MainHeader from "./header";
import React, { useEffect, useState } from "react";
import axios from "axios";
interface WorkOrder {
    workorderid: string;
    vivid_job_number: string;
    request_date: string;
    required_completion_time: string;
    client: string;
    site: string;
    order_type: string;
    activity: string;
    priority: string;
    job_description: string;
    current_status: string;
    status_time: string;
    pdf_links: string; // comma-separated
    price: string;
  }
  

   

const AllWorkOrdersV1Page = () => {

    const [workOrders, setWorkOrders] = useState<WorkOrder[]>([]);
  
    useEffect(() => {
      axios
        .get("http://localhost:4000/workorders")
        .then((res) => setWorkOrders(res.data))
        .catch((err) => console.error("Error fetching work orders:", err));
    }, []);


    return (
        <div className="app-container">
       
      <div className="wo-page">
        
        <div className="wo-header">
          <span>🛒 Orders &gt; <strong>All Work Orders V1</strong></span>
        </div>
  
        <div className="wo-form">
          <div className="row">
            <div className="input-field full">
          
<select defaultValue="">
  <option value="" disabled hidden>-- select client --</option>
 
</select>

            </div>
            <div className="input-field full">
           
            <select defaultValue="">
              <option value="" disabled hidden>-- select site --</option>
              <option value="Site A">Site A</option>
              <option value="Site B">Site B</option>
            </select>
          </div>
          <div className="input-field full">
          
            <select defaultValue="">
              <option value="" disabled hidden>-- select state --</option>
              <option value="State A">State A</option>
              <option value="State B">State B</option>
            </select>
          </div>
          </div>
  
          <div className="grid">
            <div className="input-field">
              <label><b>Vivid reference</b></label>
              <input type="text" placeholder="Vivid reference" />
            </div>
            <div className="input-field">
              <label><b>Client reference</b></label>
              <input type="text" placeholder="Client reference" />
            </div>
            <div className="input-field">
              <label><b>Request date from</b> <span className="required">*</span></label>
              <input type="date" defaultValue="2025-03-01" />
            </div>
            <div className="input-field">
              <label><b>Request date to</b> <span className="required">*</span></label>
              <input type="date" defaultValue="2025-06-05" />
            </div>
            <div className="input-field">
              <label><b>Order Type</b></label>
              <select>
                <option>Nothing selected</option>
              </select>
            </div>
            <div className="input-field">
              <label><b>Activity</b></label>
              <select>
                <option>Nothing selected</option>
              </select>
            </div>
            <div className="input-field">
              <label><b>Priority</b></label>
              <select>
                <option>Nothing selected</option>
              </select>
            </div>
            <div className="radio-group">
  <label className="radio-group-heading">WO Outstanding</label>
  <div className="radio-options">
    <label><input type="radio" name="wo" /> All W/O</label>
    <label><input type="radio" name="wo" /> Outstanding W/O</label>
  </div>
</div>

          </div>
          <div className="wo-bottom">
          <div className="status-label">
    <label><b>Status</b></label>
  </div>
  <div className="checkboxes">
  {[
    "Dispatched to provider",
    "W/O in progress",
    "W/O Completed",
    "Payment Processed",
    "Sign Off",
    "W/O Follow Up Date",
    "W/O Closed",
    "W/O Extended/On Hold",
    "W/O Cancelled",
  ].map((label, i) => (
    <label key={i} className="custom-checkbox">
      <input type="checkbox" />
      <span className="checkmark"></span>
      {label}
    </label>
  ))}
</div>

  
          <div className="wo-actions">
            
            <div className="note-check">
              <label><b>New Vivid Notes</b></label>
              <input type="checkbox" />
            </div>
            <div className="button-row">
              <button className="btn blue"><span role="img">🔍</span> Filter</button>
              <button className="btn blue"><span role="img">📄</span> Excel</button>
            </div>
          </div>
         
        </div>
        
        </div>
            
        <div className="table-container">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Vivid Job #</th>
              <th>Request Date</th>
              <th>Required Completion Time</th>
              <th>Client</th>
              <th>Site</th>
              <th>Order Type</th>
              <th>Activity</th>
              <th>Priority</th>
              <th>Job Description</th>
              <th>Current Status</th>
              <th>PDF Files</th>
              <th>Price</th>
              <th>My Updated Status</th>
              <th>New Vivid Notes</th>
            </tr>
          </thead>
          <tbody>
            {workOrders.map((order, index) => (
              <tr key={index}>
              <td className="job-number-cell">
  <div className="job-number-wrapper">
    <div className="job-number">{order.vivid_job_number}</div>
    <button className="search-btn">
      <svg viewBox="0 0 24 24" width="16" height="16">
        <path fill="currentColor" d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 0 0 1.48-5.34c-.47-2.78-2.79-5-5.59-5.34a6.505 6.505 0 0 0-7.27 7.27c.34 2.8 2.56 5.12 5.34 5.59a6.5 6.5 0 0 0 5.34-1.48l.27.28v.79l4.25 4.25c.41.41 1.08.41 1.49 0 .41-.41.41-1.08 0-1.49L15.5 14zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
      </svg>
    </button>
  </div>
</td>
                <td>{order.request_date}</td>
                <td>{order.required_completion_time}</td>
                <td>{order.client}</td>
                <td>{order.site}</td>
                <td>{order.order_type}</td>
                <td>{order.activity}</td>
                <td>
                  <span className={`priority-badge priority-${order.priority.toLowerCase()}`}>
                    {order.priority}
                  </span>
                </td>
                <td className="job-description">{order.job_description}</td>
                <td className="status-cell">
                  <span className={`status-badge status-${order.current_status.toLowerCase().replace(/\s+/g, '-')}`}>
                    {order.current_status}
                  </span>
                  <div className="status-time">{order.status_time}</div>
                </td>
                <td className="pdf-links">

                </td>
                <td className="price-cell">${order.price}</td>
                <td>
                  
                </td>
                <td>
                 
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      </div>
      </div>
    );
  };
  

export default AllWorkOrdersV1Page;
