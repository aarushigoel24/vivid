import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./cleanerConfig.css";


interface CleanerFormData {
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  loginid: string;
  password: string;
  confirmPassword: string;
  gender: string;
}

const CleanerConfigPage: React.FC = () => {
  const navigate = useNavigate();
  const { peopleid } = useParams<{ peopleid: string }>(); // ✅

  console.log("Editing cleaner with ID:", peopleid);
  const [formData, setFormData] = useState<CleanerFormData>({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    loginid: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);
  const [documentFile, setDocumentFile] = useState<File | null>(null);
  const [documentPreview, setDocumentPreview] = useState<string | null>(null); // State for the document preview

  // Fetch cleaner data for editing
  useEffect(() => {
    if (peopleid) {
      axios.get(`http://localhost:4000/cleanerList/${peopleid}`).then((response) => {
        const cleaner = response.data.data;
        setFormData({
          firstname: cleaner.firstname,
          lastname: cleaner.lastname,
          email: cleaner.email,
          phone: cleaner.contact,
          loginid: cleaner.loginid,
          password: "",
          confirmPassword: "",
          gender: cleaner.gender,
        });

        // If the document URL exists, set it as the preview
        if (cleaner.documentUrl) {
          setDocumentPreview(cleaner.documentUrl);
        }
      }).catch((error) => {
        setMessage({ text: "Failed to fetch cleaner data", type: 'error' });
        console.error(error);
      });
    }
  }, [peopleid]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      setDocumentFile(file);  // Store the selected file
      setDocumentPreview(URL.createObjectURL(file)); // Create a temporary URL for the file to show as a preview
    }
  };

  const resetForm = () => {
    setFormData({
      firstname: "",
      lastname: "",
      email: "",
      phone: "",
      loginid: "",
      password: "",
      confirmPassword: "",
      gender: "",
    });
    setDocumentFile(null); // Reset file
    setDocumentPreview(null); // Reset file preview
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(null);

    // Validate password match if creating a new cleaner
    if (formData.password !== formData.confirmPassword) {
      setMessage({ text: "Passwords do not match", type: 'error' });
      setIsSubmitting(false);
      return;
    }

    try {
      const { confirmPassword, ...submitData } = formData;
      let response;
      if (peopleid) {
        // Edit existing cleaner
        response = await axios.put(`http://localhost:4000/updateCleaner/${peopleid}`, submitData);
      } else {
        // Add new cleaner
        response = await axios.post("http://localhost:4000/addCleaner", submitData);
      }

      if (response.status === 200) {
        setMessage({ text: peopleid ? "Cleaner updated successfully!" : "Cleaner added successfully!", type: 'success' });
      } else {
        setMessage({ text: response.data.error || "Failed to save cleaner", type: 'error' });
      }
    } catch (error) {
      setMessage({ text: "An error occurred while saving the cleaner", type: 'error' });
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="cleaner-config-container">
      <div className="cleaner-config-header">
        <h1>{peopleid ? "Edit Cleaner" : "Add New Cleaner"}</h1>
        <button className="btn-back" onClick={() => navigate(-1)}>
          &larr; Back
        </button>
      </div>

      <div className="cleaner-config-card">
        <form onSubmit={handleSubmit} className="cleaner-form">
          <div className="form-grid">
            {/* First Name & Last Name */}
          

            <div className="form-group">
              <label htmlFor="firstname">First Name</label>
              <input
                type="text"
                id="firstname"
                name="firstname"
                value={formData.firstname}
                onChange={handleChange}
                required
                placeholder="Enter first name"
              />
            </div>
          
            <div className="form-group">
              <label htmlFor="lastname">Last Name</label>
              <input
                type="text"
                id="lastname"
                name="lastname"
                value={formData.lastname}
                onChange={handleChange}
                required
                placeholder="Enter last name"
              />
            </div>

            {/* Email & Phone */}
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Enter email"
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                placeholder="Enter phone number"
              />
            </div>

            {/* Login ID */}
            <div className="form-group">
              <label htmlFor="loginid">Login ID</label>
              <input
                type="text"
                id="loginid"
                name="loginid"
                value={formData.loginid}
                onChange={handleChange}
                required
                placeholder="Enter login ID"
              />
            </div>

            {/* Gender */}
            <div className="form-group">
              <label htmlFor="gender">Gender</label>
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>

            {/* Password & Confirm Password */}
            {!peopleid && (
              <>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    placeholder="Enter password"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="confirmPassword">Confirm Password</label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    placeholder="Confirm password"
                  />
                </div>
              </>
            )}
          </div>

          {/* Document Upload */}
         
          <div className="image-preview-container">
  <img
    src={documentPreview || 'https://www.pngfind.com/pngs/m/610-6104451_image-placeholder-png-user-profile-placeholder-image-png.png'}
    alt="Profile"
    className="preview-image"
  />
  <div className="upload-icon-container">
    <label htmlFor="document" className="upload-icon-btn" title="Upload document">
      📷
    </label>
    <input
      type="file"
      id="document"
      name="document"
      onChange={handleFileChange}
      className="hidden-file-input"
      accept="image/*" /* Optional: restricts to image files */
    />
  </div>
</div>




          <div className="form-actions">
            <button
              type="button"
              onClick={resetForm}
              className="btn-secondary"
              disabled={isSubmitting}
            >
              Reset
            </button>
            <button
              type="submit"
              className="btn-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className="spinner"></span>
                  Saving...
                </>
              ) : peopleid ? "Save Changes" : "Add Cleaner"}
            </button>
          </div>
        </form>

        {message && (
          <div className={`alert alert-${message.type}`}>
            {message.text}
          </div>
        )}
      </div>
    </div>
  );
};

export default CleanerConfigPage;
