import React from 'react';
import { useParams } from 'react-router-dom';
import Sidebar from '../sidebar/Sidebar';
import "./PeopleIdPage.css";
import SidebarLayout from '../sidebar/SidebarLayout';


const PeopleIdPage: React.FC = () => {
  const { cleanerId } = useParams<{ cleanerId: string }>();

  return (
    <div className="layout-container">
      <div className="sidebar">
        <SidebarLayout />
      </div>

      <div className="content">
         
        <div className="cleaner-admin-wrapper">
            <div className="wo-header">
      <strong><span style={{ marginRight: '4px', display: 'inline-block', verticalAlign: 'middle' }}>
  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="orange" viewBox="0 0 24 24">
    <path d="M16 11c1.66 0 3-1.34 3-3S17.66 5 16 5s-3 1.34-3 3 1.34 3 3 3zM8 11c1.66 0 3-1.34 3-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V20h14v-3.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 2.01 1.97 3.45V20h6v-3.5c0-2.33-4.67-3.5-7-3.5z"/>
  </svg>
</span>
My Cleaner  <span style={{ color: '#888' }}>&gt;</span>
 👦 My Cleaner Admin V1</strong>

        </div>
          <div className="page-header-buttons">
         <button className="btn blue">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    fill="white"
    viewBox="0 0 24 24"
    style={{ marginLeft: '18px', verticalAlign: 'middle' }}
  >
    <path d="M19 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H19v-2z" />
  </svg>
  Back
</button>


          <button className="btn blue">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    fill="white"
    viewBox="0 0 24 24"
    style={{ marginLeft: '18px', verticalAlign: 'middle' }}
  >
    <path d="M18.3 5.71a1 1 0 0 0-1.41 0L12 10.59 7.11 5.7a1 1 0 1 0-1.41 1.41L10.59 12l-4.89 4.89a1 1 0 0 0 1.41 1.41L12 13.41l4.89 4.89a1 1 0 0 0 1.41-1.41L13.41 12l4.89-4.89a1 1 0 0 0 0-1.4z"/>
  </svg>
  Delete this cleaner
</button>

            <button className="btn blue">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    fill="white"
    viewBox="0 0 24 24"
    style={{ marginLeft: '18px', verticalAlign: 'middle' }}
  >
    <path d="M9 16.17L4.83 12 3.41 13.41 9 19l12-12-1.41-1.41z" />
  </svg>
  Submit to Vivid
</button>

          </div>

          <section className="section-card">
            <h3>My Updated Cleaner Personal Details</h3>
            <table className="personal-details-table">
              <tbody>
                <tr>
                  <th>Name</th>
                  <td>MD Imtiaz UDDIN</td>
                  <th>Gender</th>
                  <td>Male</td>
                  <th>DOB</th>
                  <td>10 Oct 2001</td>
                  <th>Is Indigenous</th>
                  <td>NO</td>
                </tr>
                <tr>
                  <th>Email</th>
                  <td colSpan={3}>mdimtiazuddin49@gmail.com</td>
                  <th>Mobile</th>
                  <td colSpan={3}>+61 416035827</td>
                </tr>
                <tr>
                  <td colSpan={8} className="request-info">Requested by N Singh on 17 Mar 2025</td>
                </tr>
              </tbody>
            </table>
          </section>

          {/* Rest of your sections remain the same */}
          <section className="section-card">
            <h3>My Updated Cleaner Certificates</h3>
            <table className="certificate-table">
              <thead>
                <tr>
                  <th>Certificate type</th>
                  <th>Reference number</th>
                  <th>Start date</th>
                  <th>Expiry date</th>
                  <th>File</th>
                  <th>More details</th>
                  <th>Delete update</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Police Check</td>
                  <td>Police check</td>
                  <td>25 Sep 2024</td>
                  <td>24 Sep 2026</td>
                  <td><a href="#" className="file-link">MD Imtiaz_UDDIN_policecheck_170325030329.pdf</a></td>
                  <td></td>
                  <td><button className="delete-btn">X</button></td>
                </tr>
              </tbody>
            </table>
            <div className="page-header-buttons">
     <button className="btn edit">
  <span style={{ marginLeft: '18px', display: 'inline-block', verticalAlign: 'middle' }}>
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="white" viewBox="0 0 24 24">
    <path d="M3 17.25V21h3.75l11.06-11.06-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
  </svg>
</span>
  Edit / Add Certificate
</button>  

            </div>
          
          </section>

          <section className="section-card">
            <h3>My Updated Cleaner Inductions</h3>
             <div className="page-header-buttons">
              <button className="btn edit">
  <span style={{ marginLeft: '18px', display: 'inline-block', verticalAlign: 'middle' }}>
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="white" viewBox="0 0 24 24">
    <path d="M3 17.25V21h3.75l11.06-11.06-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
  </svg>
</span>
  Edit / Add Induction
</button>   

             </div>
         
          </section>
    
          <section className="section-card">
            <label className="viewherder1">Notes From VIVID</label>
          </section>

          <section className="section-card">
            <h3>My Notes To VIVID</h3>
            <div className="page-header-buttons">
             <button className="btn edit">
  <span style={{ marginLeft: '38px', display: 'inline-block', verticalAlign: 'middle' }}>
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="white" viewBox="0 0 24 24">
      <path d="M21 3H3c-1.1 0-2 .9-2 2v14a2 2 0 0 0 2 2h18c1.1 0 2-.9 2-2V5a2 2 0 0 0-2-2zm0 16H3V5h18v14zM5 7h14v2H5V7zm0 4h10v2H5v-2zm0 4h7v2H5v-2z"/>
    </svg>
  </span>
  New Notes
</button>
  

             </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PeopleIdPage;