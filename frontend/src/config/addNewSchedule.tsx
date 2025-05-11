import React, { useState, useEffect } from 'react';
import axios from 'axios';
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

  const [clients, setClients] = useState<string[]>([]);
  const [sites, setSites] = useState<{ client_name: string; site_name: string }[]>([]);
  const [clientOptions, setClientOptions] = useState<OptionType[]>([]);
  const [siteOptions, setSiteOptions] = useState<OptionType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [workOrders, setWorkOrders] = useState<{ vivid_job_number: string }[]>([]);

  interface OptionType {
    label: string;
    value: string;
  }

  useEffect(() => {
    const fetchClientAndSiteData = async () => {
      try {
        const response = await axios.get('http://localhost:4000/siteClients');

        // Cast the response data to the expected type
        const data = response.data as { client_name: string; site_name: string }[];

        // Set clients and sites with the casted data
        const uniqueClients = new Set(data.map(item => item.client_name));
        const clientsData = Array.from(uniqueClients);
        setClients(clientsData);

        const sitesData = data.map(item => ({
          client_name: item.client_name,
          site_name: item.site_name,
        }));
        setSites(sitesData);

        const clientOptions = clientsData.map(client => ({
          label: client,
          value: client,
        }));
        setClientOptions(clientOptions);

      } catch (error) {
        console.error('Failed to fetch client and site data:', error);
        setError('Failed to load data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchClientAndSiteData();

    const fetchWorkOrders = async () => {
    try {
      const response = await axios.get('http://localhost:4000/workorders');
      const data = response.data as { vivid_job_number: string }[];
      setWorkOrders(data);
    } catch (err) {
      console.error('Failed to fetch work orders:', err);
    }
  };

  fetchWorkOrders();
  }, []);

  useEffect(() => {
    if (formData.customer) {
      const filteredSites = sites
        .filter(site => site.client_name === formData.customer)
        .map(site => ({
          label: site.site_name,
          value: site.site_name,
        }));
      setSiteOptions(filteredSites);
    }
  }, [formData.customer, sites]);

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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <form className="schedule-form" onSubmit={handleSubmit}>
      <h2>Add Site Schedule</h2>

      <div className="form-grid">
        <div className="form-row">
          <label>Customer</label>
          <select
            name="customer"
            value={formData.customer}
            onChange={handleChange}
          >
            <option value="">Select customer</option>
            {clientOptions.map((client, idx) => (
              <option key={idx} value={client.value}>
                {client.label}
              </option>
            ))}
          </select>
        </div>

        <div className="form-row">
          <label>Site</label>
          <select
            name="site"
            value={formData.site}
            onChange={handleChange}
            disabled={!formData.customer}
          >
            <option value="">Select site</option>
            {siteOptions.map((site, idx) => (
              <option key={idx} value={site.value}>
                {site.label}
              </option>
            ))}
          </select>
        </div>

        <div className="form-row">
          <label>Start Date</label>
          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
          />
        </div>

        <div className="form-row">
          <label>End Date</label>
          <input
            type="date"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
          />
        </div>

        <div className="form-row">
  <label>Work Order ID</label>
  <select name="workOrderId" value={formData.workOrderId} onChange={handleChange}>
    <option value="">Select work order</option>
    {workOrders.map((order, idx) => (
      <option key={idx} value={order.vivid_job_number}>
        {order.vivid_job_number}
      </option>
    ))}
  </select>
</div>

        <div className="form-row">
          <label>Comments</label>
          <textarea rows={2} placeholder="Enter your comments here..." />
        </div>
      </div>

      <div className="form-table">
        <h3>Weekly Schedule</h3>
        <div className="day-row header">
          <div>Day</div>
          <div>No. of Hours</div>
          <div>No. of Cleaners</div>
        </div>
        {days.map(day => (
          <div className="day-row" key={day}>
            <div>{day}</div>
            <input
              type="number"
              min="0"
              value={formData.dailyHours[day] || ''}
              onChange={(e) => handleDayChange(day, 'dailyHours', e.target.value)}
            />
            <input
              type="number"
              min="0"
              value={formData.dailyCleaners[day] || ''}
              onChange={(e) => handleDayChange(day, 'dailyCleaners', e.target.value)}
              style={{ marginLeft: '12px' }}
            />
          </div>
        ))}
      </div>

      <button type="submit" className="submit-btn">Submit Schedule</button>
    </form>
  );
};

export default AddScheduleForm;
