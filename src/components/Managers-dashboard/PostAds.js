import React, { useState } from "react";
import '../../styles/Managers-dashboard.css';
import { useLocation } from "react-router-dom";

const PostAds = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const Email = queryParams.get("email");
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');
  const [requirements, setRequirements] = useState('');
  const [amount, setAmount] = useState('');
  const [events, setEvents] = useState(false);
  const [education, setEducation] = useState(false);
  const [business, setBusiness] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`/api/addAvert`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        Title: title,
        Description: description,
        Email: Email,
        Deadline: deadline,
        Requirements: requirements,
        Amount: amount,
        Events: events,
        Education: education,
        Business: business
      }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`Failed to add advert`);
        } else {
          alert("Advert Submitted ");
          setTitle('');
          setDescription('');
          setDeadline('');
          setRequirements('');
          setAmount('');
          setEvents(false);
          setEducation(false);
          setBusiness(false);
        }
      })
      .catch(error => {
        console.error('Error:', error.message);
      });
  };

  const handleCheckboxChange = (type) => {
    setEvents(type === 'events');
    setEducation(type === 'education');
    setBusiness(type === 'business');
  };

  return (
    <div className="App">
      <div className="container">
        <h2>Welcome to FundDocker Manager Portal</h2>
        <p>This portal allows you to manage funding advertisements and review applications seamlessly.</p>
      </div>
      <form id="funding-form" onSubmit={handleSubmit}>

        <label htmlFor="fund-title">Fund Title:</label><br />
        <input type="text" id="fund-title" name="fund-title" value={title} onChange={(e) => setTitle(e.target.value)} /><br />
        <label htmlFor="fund-description">Description:</label><br />
        <textarea id="fund-description" name="fund-description" value={description} onChange={(e) => setDescription(e.target.value)} /><br />

        <label htmlFor="fund-email">Email:</label><br />
        <input type="email" id="fund-email" name="fund-email" value={Email} disabled /><br />
        <label htmlFor="fund-deadline">Deadline:</label><br />
        <input type="date" id="fund-deadline" name="fund-deadline" value={deadline} onChange={(e) => setDeadline(e.target.value)} /><br />
        <label htmlFor="fund-requirements">Requirements:</label><br />
        <textarea id="fund-requirements" name="fund-requirements" value={requirements} onChange={(e) => setRequirements(e.target.value)} /><br />
        <label htmlFor="fund-amount">Amount:</label><br />
        <input type="number" id="fund-amount" name="fund-amount" value={amount} onChange={(e) => setAmount(e.target.value)} /><br />

        <label className="container_details">Education
          <input
            type="checkbox"
            id="EducationCheckbox"
            checked={education}
            onChange={() => handleCheckboxChange('education')}
          />
          <span className="checkmark"></span>
        </label>
        <label className="container_details">Business
          <input
            type="checkbox"
            id="BusinessCheckbox"
            checked={business}
            onChange={() => handleCheckboxChange('business')}
          />
          <span className="checkmark"></span>
        </label>
        <label className="container_details">Events
          <input
            type="checkbox"
            id="EventsCheckbox"
            checked={events}
            onChange={() => handleCheckboxChange('events')}
          />
          <span className="checkmark"></span>
        </label>

        <button type="submit">Advertise</button>
      </form>
    </div>
  );
}

export default PostAds;
