import React, { useState, useEffect } from "react";
import "../../styles/Applications.css";
import app from "../../firebase.js";

const Applications = () => {

  // const [name, setName] = useState('');
  // const [surname, setSurname] = useState('');
  // const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  // const [date, setDate] = useState('');
  // const [funding_opportunity, setFundingOpp] = useState('');


  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`/api/AddFundApplication`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
            Email: email
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


  window.addEventListener("load",()=> {
    const input = document.getElementById("upload");
    const filewrapper = document.getElementById("filewrapper");

    input.addEventListener("change", (e)=> {
      let fileName = e.target.files[0].name;
      let filetype = e.target.value.split(".").pop();
      console.log(fileName);
    })

    const fileshow = (fileName, filetype) => {
      const showfileboxElem = document.createElement("div");
      showfileboxElem.classList.add("showfilebox");
      const leftElem = document.createElement("div");
      leftElem.classList.add("left");
      const fileTypeElem = document.createElement("span");
      fileTypeElem.classList.add("filetype");
      fileTypeElem.innerHTML = filetype;
      leftElem.append(fileTypeElem);
      const filetitleElem = document.createElement("p");
      filetitleElem.innerHTML = fileName;
      leftElem.append(filetitleElem);
      showfileboxElem.append(leftElem);
      const rightElem = document.createElement("div");
      rightElem.classList.add("right");
      showfileboxElem.append(rightElem);
      const crossElem = document.createElement("span");
      crossElem.innerHTML = "&#215;";
      rightElem.append(crossElem);
      filewrapper.append(showfileboxElem);

      crossElem.addEventListener("click",()=> {
        filewrapper.removeChild(showfileboxElem);
      } )
    }
  })

  

  return (
    <div class="apply-container">
      <div class="apply-box">
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
              <input type="email" id="email" name="email" placeholder="Enter Email" value={email} onChange={(e) => setEmail(e.target.value)} ></input>
            </div>
  
            <div class="form-control">
              <label for="funding-opportunity">Funding Opportunity</label>
              <select name="funding-opporunity" id="funding-opportunity">
                <option value="">Select Funding Opportunity</option>
                <option value="ad-1">Advert 1</option>
                <option value="ad-2">Advert 2</option>
                <option value="ad-3">Advert 3</option>
                <option value="ad-4">Advert 4</option>
                <option value="ad-5">Advert 5</option>
                <option value="ad-6">Advert 6</option>
              </select>
            </div>
  
            <div class="textarea-control">
              <label for="address">Address</label>
              <textarea name="address" id="" cols="30" rows="10" placeholder="Enter Full Address" ></textarea>
            </div>
  
            <div class="form-control">
              <label for="date">Date</label>
              <input type="date" id="first-name" name="first-name" setDate></input>
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
              <button  onClick={handleSubmit}>Apply Now</button>
            </div>
  
          </div>
        </form>
      </div>
        
    </div>
  );
  
};

export default Applications;

