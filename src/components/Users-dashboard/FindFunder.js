import React, { useState, useEffect } from "react";
import "../../styles/FindFunder.css";
import { Link } from "react-router-dom";

const FindFunder = () => {
  const [data, setData] = useState([]);
  const [showForm, setShowForm] = useState(false); 
  const [selectedAdID, setSelectedAdID] = useState("");
  const [email, setEmail] = useState('');

  const fetchGetAdvertsData = async () => {
    try {
      const response = await fetch(`/api/GetAdverts`);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      setData(data);

      setupEventListeners(); 
    } catch (error) {
      console.error('Error fetching Adverts:', error);
    }
  };

  useEffect(() => {
  
    fetchGetAdvertsData();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`/api/AddFundApplication`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
            Email: email, 
            AdID : selectedAdID
      }),
      })
      .then(response => {
          if (!response.ok) {
              throw new Error(`failed to submit application`);
          } else {
            alert("application Submitted ");
          }
      })
      .catch(error => {
          console.error('Error:', error.message);
      });
  };

  const setupEventListeners = () => {
    const filterItems = document.querySelectorAll(".items .item");
    const galleryBoxes = document.querySelectorAll(".gallery .box");

    filterItems.forEach(item => {
      item.addEventListener("click", function() {
        const filterName = this.getAttribute("data-name");
        
        galleryBoxes.forEach(box => {
          const boxName = box.getAttribute("data-name");
          if (filterName === "all" || filterName === boxName) {
            box.classList.remove("hide");
            box.classList.add("show");
          } else {
            box.classList.add("hide");
            box.classList.remove("show");
          }
        });
        filterItems.forEach(item => {
          item.classList.remove("active");
        });
        this.classList.add("active");
      });
    });
  };

  const handleAdClick = (AdID) => {
    setSelectedAdID(AdID); // Set the selected Ad ID
    setShowForm(true); 
  };
  const handleCloseForm = () => {
    setShowForm(false);
  };

  return (
    <div className="wrapper">
      {showForm && (
        <div class="apply-container" style={{ paddingBottom: "20px" }}>
        <div class="apply-box">
          <button className="close-btn" onClick={handleCloseForm}>X</button> 
          <h1>Funding Application</h1>
    
          <form action="">
            <div class="form-container">
              <div class="form-control">
                <label for="first-name">First Name</label>
                <input type="text" id="first-name" name="first-name" placeholder="Enter First Name"></input>
              </div>
    
              <div class="form-control">
                <label for="last-name">Last Name</label>
                <input type="text" id="last-name" name="last-name" placeholder="Enter Last Name"></input>
              </div>
    
              <div class="form-control">
                <label for="email">Email</label>
                <input type="email" id="email" name="email" placeholder="Enter Email" value={email} onChange={(e) => setEmail(e.target.value)}></input>
              </div>
    
              <div class="form-control">
                <label for="Advert-ID">Advert ID</label>
                <input type="text" id="AdID" name="AdID" placeholder="Advert ID" value={selectedAdID} readOnly></input>
              </div>
    
              <div class="textarea-control">
                <label for="address">Address</label>
                <textarea name="address" id="" cols="30" rows="10" placeholder="Enter Full Address"></textarea>
              </div>
    
              <div class="form-control">
                <label for="date">Date</label>
                <input type="date" id="first-name" name="first-name"></input>
              </div>
  
              {/* <div class="upload-box">
                <h2 class="upload-area-title">Upload File (.doc,.docx,.pdf)</h2>
                  <input type="file" id="upload" accept=".doc,.docx,.pdf" hidden></input>
                  <label for="upload" class="uploadlabel">
                    <span><i class="fa fa-cloud-upload"></i></span>
                    <p>Click to Upload</p>
                </label> 
              </div> */}
  
              <div class="upload-box">
              <form action="/upload" method="post" enctype="multipart/form-data">
                <label for="fileInput">Select a document:</label>
                  <input type="file" id="fileInput" name="document" accept=".pdf,.doc,.docx,.txt" multiple></input>
                  {/* <button type="submit">Upload</button> */}
              </form>
              </div>
  
  
              <div id="filewrapper">
                <h5 class="uploaded">Uploaded Documents</h5>
                {/*<div class="showfilebox">
                  <div class="left">
                    <span class="filetype">PDF</span>
                    <p>Ravi Web.pdf</p>
                  </div>
                  <div class="right">
                    <span>&#215;</span>
                  </div>
                </div>*/}
              </div>
    
              <div class="button-container">
                <button onClick={handleSubmit}>Apply Now</button>
              </div>
    
            </div>
          </form>
        </div>
          
      </div>
      )}
      <nav>
        <div className="items">
          <span className="item active" data-name="all">All</span>
          <span className="item" data-name="education">Education</span>
          <span className="item" data-name="business">Business</span>
          <span className="item" data-name="events">Events</span>
        </div>
      </nav>

      <div className="gallery">
        {data.map((item, index) => (
          <div className="box" key={index} data-name={item.Education ? "education" : (item.Events ? "events" : "business")} onClick={() => handleAdClick(item.AdID)}>
            <span>{item.Title}</span>
            <span>{item.Description}</span>
            <span>{item.Email}</span>
            <span>{item.AdID}</span>
          </div>
        ))}
      </div>
      
    </div>
  );
};

export default FindFunder;
