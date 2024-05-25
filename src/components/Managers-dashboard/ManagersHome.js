import React, { useState, useEffect, useRef } from 'react';
import Chart from "chart.js/auto";
import "../../styles/ManagersHome.css";
import html2pdf from "html2pdf.js";

const ManagersHome = ({ email }) => {
  const [userEmail, setUserEmail] = useState(email);
  const [educationBudget, setEducationBudget] = useState(0);
  const [eventsBudget, setEventsBudget] = useState(0);
  const [businessBudget, setBusinessBudget] = useState(0);
  const [editMode, setEditMode] = useState(false);
  const [ads, setAds] = useState([]);
  const [additionalInfo, setAdditionalInfo] = useState(null);

  const [newEducationBudget, setNewEducationBudget] = useState(0);
  const [newEventsBudget, setNewEventsBudget] = useState(0);
  const [newBusinessBudget, setNewBusinessBudget] = useState(0);

  const doughnutChartRef = useRef(null);
  const doughnutChartInstance = useRef(null);

  useEffect(() => {
    fetchBudgetInformation();
    fetchAdsInformation();
    fetchAdditionalInformation();
    drawCharts();
    return () => {
      if (doughnutChartInstance.current) {
        doughnutChartInstance.current.destroy();
      }
    };
  }, []);

  useEffect(() => {
    if (doughnutChartInstance.current) {
      updateDoughnutChart();
    }
  }, [educationBudget, eventsBudget, businessBudget]);

  const fetchBudgetInformation = async () => {
    try {
      const response = await fetch(`/api/AddBudget?email=${userEmail}`);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      setEducationBudget(data[0].EducationAmount);
      setEventsBudget(data[0].EventsAmount);
      setBusinessBudget(data[0].BusinessAmount);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const fetchAdsInformation = async () => {
    try {
      const response = await fetch(`/api/getAdsforGraph?email=${userEmail}`);
      if (!response.ok) {
        throw new Error('Failed to fetch ads');
      }
      const data = await response.json();
      setAds(data);
      drawBarChart(data);
    } catch (error) {
      console.error('Error fetching ads:', error);
    }
  };

  const fetchAdditionalInformation = async () => {
    try {
      const response = await fetch(`/api/retrieveBudgetInformation?email=${userEmail}`);
      if (!response.ok) {
        throw new Error('Failed to fetch additional information');
      }
      const data = await response.json();
      setAdditionalInfo(data);
    } catch (error) {
      console.error('Error fetching additional information:', error);
    }
  };

  const drawCharts = () => {
    drawDoughnutChart();
  };

  const drawDoughnutChart = () => {
    if (!doughnutChartRef.current) return;
    const doughnutCtx = doughnutChartRef.current.getContext('2d');
    doughnutChartInstance.current = new Chart(doughnutCtx, {
      type: 'doughnut',
      data: {
        labels: ['Education', 'Events', 'Business'],
        datasets: [{
          label: 'Budget Allocation',
          data: [educationBudget, eventsBudget, businessBudget],
          backgroundColor: [
            'rgb(0, 173, 181)',
            'rgb(255, 225, 94)',
            'rgb(0, 123, 129)'
          ],
          hoverOffset: 4
        }]
      },
      options: {
        responsive: false
      }
    });
  };

  const updateDoughnutChart = () => {
    doughnutChartInstance.current.data.datasets[0].data = [educationBudget, eventsBudget, businessBudget];
    doughnutChartInstance.current.update();
  };

  const drawBarChart = (adsData) => {
    const barCtx = document.getElementById('barChart').getContext('2d');
    new Chart(barCtx, {
      type: 'bar',
      data: {
        labels: adsData.map(ad => ad.Title),
        datasets: [{
          label: 'Amount per Ad',
          data: adsData.map(ad => ad.Amount),
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  };

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleSave = () => {
    setEducationBudget(newEducationBudget);
    setEventsBudget(newEventsBudget);
    setBusinessBudget(newBusinessBudget);
    fetch(`/api/UpdateBudget`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        Events: newEventsBudget,
        Education: newEducationBudget,
        Business: newBusinessBudget,
        Email: userEmail
      }),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to Update Budgets');
      }
      console.log('Updated budgets successfully');
    })
    .catch(error => {
      console.error('Error:', error.message);
    });
    setEditMode(false);
  };

  const handleDownloadPDF = () => {
    const budget = document.getElementById("budget");
    html2pdf().from(budget).save();
  };

  return (
    <>
      <div>
        <div className="button-container">
          <button className="button" onClick={handleDownloadPDF} id="download">Download PDF</button>
        </div>
        <div className="budget-info" id="budget">
          <div className="budget-block">
            <h3>Education Budget</h3>
            {editMode ? (
              <input
                type="number"
                value={newEducationBudget}
                onChange={(e) => setNewEducationBudget(e.target.value)}
              />
            ) : (
              <p>{educationBudget}</p>
            )}
          </div>
          <div className="budget-block">
            <h3>Events Budget</h3>
            {editMode ? (
              <input
                type="number"
                value={newEventsBudget}
                onChange={(e) => setNewEventsBudget(e.target.value)}
              />
            ) : (
              <p>{eventsBudget}</p>
            )}
          </div>
          <div className="budget-block">
            <h3>Business Budget</h3>
            {editMode ? (
              <input
                type="number"
                value={newBusinessBudget}
                onChange={(e) => setNewBusinessBudget(e.target.value)}
              />
            ) : (
              <p>{businessBudget}</p>
            )}
          </div>
          <div>
            {editMode ? (
              <button onClick={handleSave}>Save</button>
            ) : (
              <button onClick={handleEdit}>Edit</button>
            )}
          </div>
          <div className="chart-container">
            <div>
              <canvas id="doughnutChart" height="350" width="700" ref={doughnutChartRef}></canvas>
            </div>
            <div>
              <canvas id="barChart" height="350" width="700"></canvas>
            </div>
          </div>
          {additionalInfo && (
            <div className="additional-info">
              <h3>Additional Information</h3>
              <p>Education Notes: {additionalInfo.EducationNotes}</p>
              <p>Business Notes: {additionalInfo.BusinessNotes}</p>
              <p>Events Notes: {additionalInfo.EventsNotes}</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ManagersHome;

