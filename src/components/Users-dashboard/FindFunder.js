import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../styles/FindFunder.css";
// import app from "../../firebase.js";

const PostAds = () => {
  const [EducationAds, setEducation] = useState();
  const [EventsAds, setEvents] = useState();
  const [BusinessAds, setBusiness] = useState();
  const [data, setData] = useState();

  useEffect(() => {
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

    const fetchData = async () => {
      try {
        const response = await fetch(`/api/GetAdverts`);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
  
        const education = data.filter(ad => ad.Education === true);
        const business = data.filter(ad => ad.Business === true);
        const events = data.filter(ad => ad.Events === true);
  
        setBusiness(business);
        setEvents(events);
        setEducation(education);
        setData(data);

      } catch (error) {
        console.error('Error fetching Adverts:', error);
      }
    };
  
    fetchData();


  }, []);


  const [selectedTab, setSelectedTab] = useState("Home");
  const handleTabChange = (tab) => {
    setSelectedTab(tab);
  };

  // function all()
  // {
  //   return(
  //     <div className="gallery">
  //     {data && data.map((item, index) => (
  //       <div className="box" key={index} data-name={item.Education ? "education" : (item.Events ? "events" : "business")}>
  //         <span>{item.Title}</span>
  //         {item.Description && <span>{item.Description}</span>}
  //       </div>
  //     ))}
  //   </div>
  //   )
  // }

  // function edu_(){
  //   return(<div>
  //     {EducationAds && EducationAds.map((item, index) => (
  //       <div className="gallery" key={index}>
  //           <div className="box" data-name="education"><span>{item.Title}</span></div>

  //       </div>
  //     ))}
  //   </div>)
  // }

  // function events_(){
  //   return(
  //   <div className="gallery">
  //         {EventsAds && EventsAds.map((item, index) => (
  //           <div className="box" data-name="events" key={index}>
  //             <span>{item.Title}</span>
  //           </div>
  //         ))}
  //       </div>
  //   )  
  // }

  // function business_()
  // {
  //   return(<div>
  //     {BusinessAds && BusinessAds.map((item, index) => (
  //       <div className="gallery" key={index}>
  //           <div className="box" data-name="business"><span>{item.Title}</span></div>
  //       </div>
  //     ))}
  //   </div>)
  // }


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

      


      {/* <div className="gallery">
        <div className="box" data-name="events"><span>Advert 1 - Fund a Science talk</span></div>
        <div className="box" data-name="education"><span>Advert 2 - Fund your studies</span></div>
        <div className="box" data-name="business"><span>Advert 3 - Start your business today</span></div>
        <div className="box" data-name="education"><span>Advert 4 - Bursaries for Com Sci</span></div>
        <div className="box" data-name="events"><span>Advert 5 - Fund a charity event</span></div>
        <div className="box" data-name="education"><span>Advert 6 - Funding for new tech equipment</span></div>

      </div> */}

      
      {/* {edu_()}
      {events_}
      {business_()} */}
      {/* {all()} */}

      <div className="gallery">
        {data && data.map((item, index) => (
          <div className="box" key={index} data-name={item.Education ? "education" : (item.Events ? "events" : "business")}>
            <span>{item.Title}</span>
            {item.Description && <span>{item.Description}</span>}
          </div>
        ))}
      </div>



    </div>
  );
};

export default FindFunder;
