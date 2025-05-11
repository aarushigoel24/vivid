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
          <div className="page-header-buttons">
            <button className="btn blue">Back</button>
            <button className="btn blue">Delete this cleaner</button>
            <button className="btn blue">Submit to Vivid</button>
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
  <button className="btn edit">Edit / Add Certificate</button>

            </div>
          
          </section>

          <section className="section-card">
            <h3>My Updated Cleaner Inductions</h3>
             <div className="page-header-buttons">
          <button className="btn edit">
  ✏️ Edit / Add Induction
</button>

             </div>
         
          </section>

          <section className="section-card">
            <h3>Notes From VIVID</h3>
          </section>

          <section className="section-card">
            <h3>My Notes To VIVID</h3>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PeopleIdPage;