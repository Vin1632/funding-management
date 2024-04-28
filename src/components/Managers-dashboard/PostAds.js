import React, { useState } from "react";
import app from "../../firebase.js";
import '../../styles/Managers-dashboard.css';

const PostAds = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Push data to Firebase
    const adsRef = app.firestore().collection('ads');
    adsRef.add({
      title: title,
      description: description
    })
    .then(() => {
      console.log("Advertisement posted successfully!");
      // Optionally, you can reset the form fields here
      setTitle('');
      setDescription('');
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
        <textarea id="fund-description" name="fund-description" value={description} onChange={(e) => setDescription(e.target.value)} /><br /><br />
        <button type="submit">Advertise</button>
      </form>
    </div>
  );
}

export default PostAds;

