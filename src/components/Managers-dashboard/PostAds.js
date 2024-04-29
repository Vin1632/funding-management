import React, { useState } from "react";
import app from "../../firebase.js";
import '../../styles/Managers-dashboard.css';

const PostAds = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [email, setEmail] = useState('');
  const [deadline, setDeadline] = useState('');
  const [requirements, setRequirements] = useState('');
  const [events, setEvents] = useState(false);
  const [education, setEducation] = useState(false);
  const [business, setBusiness] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Push data to Firebase
    const adsRef = app.firestore().collection('ads');
    adsRef.add({
      title: title,
      description: description,
      email: email,
      deadline: deadline,
      requirements: requirements,
      events: events,
      education: education,
      business: business
    })
    .then(() => {
      console.log("Advertisement posted successfully!");
      // Optionally, you can reset the form fields here
      setTitle('');
      setDescription('');
      setEmail('');
      setDeadline('');
      setRequirements('');
      setEvents(false);
      setEducation(false);
      setBusiness(false);
    })
    .catch((error) => {
      console.error("Error adding advertisement: ", error);
    });
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
        <input type="email" id="fund-email" name="fund-email" value={email} onChange={(e) => setEmail(e.target.value)} /><br />
        <label htmlFor="fund-deadline">Deadline:</label><br />
        <input type="date" id="fund-deadline" name="fund-deadline" value={deadline} onChange={(e) => setDeadline(e.target.value)} /><br />
        <label htmlFor="fund-requirements">Requirements:</label><br />
        <textarea id="fund-requirements" name="fund-requirements" value={requirements} onChange={(e) => setRequirements(e.target.value)} /><br />
        <label className="container_details" >Education
          <input
            type="checkbox"
            id="EducationCheckbox"
            checked={education}  // Set checked state based on the education state variable
            onChange={(e) => setEducation(e.target.checked)}  // Update education state when checkbox is changed
          />
          <span className="checkmark"></span>
        </label>
        <label className="container_details" >Business
          <input
            type="checkbox"
            id="BusinessCheckbox"
            checked={business}  // Set checked state based on the business state variable
            onChange={(e) => setBusiness(e.target.checked)}  // Update business state when checkbox is changed
          />
          <span className="checkmark"></span>
        </label>
        <label className="container_details">Events
          <input
            type="checkbox"
            id="EventsCheckbox"
            checked={events}  // Set checked state based on the events state variable
            onChange={(e) => setEvents(e.target.checked)}  // Update events state when checkbox is changed
          />
          <span className="checkmark"></span>
        </label>


        <button type="submit">Advertise</button>
      </form>

    </div>
  );
}

export default PostAds;


