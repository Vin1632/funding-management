import React, { useState, useEffect } from "react";
import "../../styles/FindFunder.css";
import { Link } from "react-router-dom";

const FindFunder = () => {
  const [data, setData] = useState([]);

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

  return (
    <div className="wrapper">
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
          <div className="box" key={index} data-name={item.Education ? "education" : (item.Events ? "events" : "business")}>
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
