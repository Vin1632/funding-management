import React, { useState, useEffect } from "react";
import "../../styles/FindFunder.css";
import { Link } from "react-router-dom";
import {storage} from '../../firebase';
import "../../styles/Applications.css";
import { ref, uploadBytes} from "firebase/storage"

const FindFunder = () => {
  const [data, setData] = useState([]);
  const [showForm, setShowForm] = useState(false); 
  const [selectedAdID, setSelectedAdID] = useState("");
  const [email, setEmail] = useState('');
  const [file, setFile] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
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
  
    fetchData();
  }, []);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    const applicationData = {
        Email: email,
        AdID: selectedAdID
    };

    try {
        const response = await fetch(`/api/AddFundApplication`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(applicationData),
        });

        if (!response.ok) {
            throw new Error('Failed to submit application');
        }
        alert("Application Submitted");

        const data = await response.json();
        const filename = "p"+ data[0].Application_ID + "q";
        // Upload documents to firebase
        if(file !== null)
        {
           
          const storageREF =  ref(storage, `files/${filename}.pdf`);
          uploadBytes(storageREF, file);
          alert("Documents Uploaded");
        }
        
      
    } catch (error) {
        console.error('Error:', error.message);
    }
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
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const handleCloseForm = () => {
    setShowForm(false);
  };

  return (
    <div className="wrapper">
      {showForm && (
        <div className="apply-container" style={{ paddingBottom: "20px" }}>
          <div className="apply-box">
            <button className="close-btn" onClick={handleCloseForm}>X</button> 
            <h1>Funding Application</h1>
      
            <form action="">
              <div className="form-container">
                <div className="form-control">
                  <label htmlFor="first-name">First Name</label>
                  <input type="text" id="first-name" name="first-name" placeholder="Enter First Name"></input>
                </div>
      
                <div className="form-control">
                  <label htmlFor="last-name">Last Name</label>
                  <input type="text" id="last-name" name="last-name" placeholder="Enter Last Name"></input>
                </div>
      
                <div className="form-control">
                  <label htmlFor="email">Email</label>
                  <input type="email" id="email" name="email" placeholder="Enter Email" value={email} onChange={(e) => setEmail(e.target.value)}></input>
                </div>
      
                <div className="form-control">
                  <label htmlFor="Advert-ID">Advert ID</label>
                  <input type="text" id="AdID" name="AdID" placeholder="Advert ID" value={selectedAdID} readOnly></input>
                </div>
      
                <div className="textarea-control">
                  <label htmlFor="address">Address</label>
                  <textarea name="address" id="" cols="30" rows="10" placeholder="Enter Full Address"></textarea>
                </div>
      
                <div className="form-control">
                  <label htmlFor="date">Date</label>
                  <input type="date" id="date" name="date"></input>
                </div>
    
                <div className="upload-box">
                    <form onSubmit={handleSubmit} method="post" encType="multipart/form-data">
                        <label htmlFor="fileInput">Select a CV document:</label>
                        <input 
                            type="file" 
                            id="fileInput" 
                            name="document" 
                            accept=".pdf" 
                            onChange={handleFileChange} 
                        />
                    </form>
                   
                </div>
                <button onClick={handleSubmit}>Apply Now</button>
  
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
            <h2 className={`title color-${index % 3}`}>{item.Title}</h2>
            <p><strong>Description:</strong> {item.Description}</p>
            <p><strong>Email:</strong> {item.Email}</p>
            <p><strong>Advert ID:</strong> {item.AdID}</p>
            <p><strong>Deadline:</strong> {new Date(item.Deadline).toLocaleDateString()}</p>
            <p><strong>Requirements:</strong> {item.Requirements}</p>
            <p><strong>Amount:</strong> R {item.Amount}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FindFunder;
