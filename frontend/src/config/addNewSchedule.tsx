import React, { useState } from 'react';
import './AddScheduleForm.css';

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const AddScheduleForm: React.FC = () => {
  const [formData, setFormData] = useState({
    customer: '',
    site: '',
    workOrderId: '',
    startDate: '',
    endDate: '',
    dailyHours: {} as Record<string, number>,
    dailyCleaners: {} as Record<string, number>,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDayChange = (
    day: string,
    field: 'dailyHours' | 'dailyCleaners',
    value: string
  ) => {
    setFormData(prev => ({
      ...prev,
      [field]: {
        ...prev[field],
        [day]: Number(value),
      },
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitted:', formData);
    // Add backend call here
  };

  return (
    <form className="schedule-form">
  <h2>Add Site Schedule</h2>

  <div className="form-grid">
    <div className="form-row">
      <label>Customer</label>
      <select>{/* Options */}</select>
    </div>

    <div className="form-row">
      <label>Site</label>
      <select>{/* Options */}</select>
    </div>

  

    <div className="form-row">
      <label>Start Date</label>
      <input type="date" />
    </div>

    <div className="form-row">
      <label>End Date</label>
      <input type="date" />
    </div>
      <div className="form-row">
      <label>Work Order ID</label>
      <select>{/* Options */}</select>
      
    </div>
    
   <div className="form-row">
  <label>Comments</label>
  <textarea rows={2} placeholder="Enter your comments here..."></textarea>
</div>
  </div>
    
  <div className="form-table">
    <h3>Weekly Schedule</h3>
    <div className="day-row header">
      <div>Day</div><div>No. of Hours</div><div>No. of Cleaners</div>
    </div>
    {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(day => (
      <div className="day-row" key={day}>
        <div>{day}</div>
        <input type="number" min="0" />
  
        <input type="number" min="0" style={{ marginLeft: '12px' }} />
      </div>
    ))}
  </div>

  <button type="submit" className="submit-btn">Submit Schedule</button>
</form>

  );
};

export default AddScheduleForm;
