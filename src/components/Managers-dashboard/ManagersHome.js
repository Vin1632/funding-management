import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from "react-router-dom";
import Chart from "chart.js/auto";
import "../../styles/ManagersHome.css";
import html2pdf from "html2pdf.js";

const ManagersHome = ({ email }) => {
  const [userEmail, setUserEmail] = useState(email);
  const [educationBudget, setEducationBudget] = useState(0);
  const [eventsBudget, setEventsBudget] = useState(0);
  const [businessBudget, setBusinessBudget] = useState(0);
  const [editMode, setEditMode] = useState(false);

  const [newEducationBudget, setNewEducationBudget] = useState(0);
  const [newEventsBudget, setNewEventsBudget] = useState(0);
  const [newBusinessBudget, setNewBusinessBudget] = useState(0);

  const doughnutChartRef = useRef(null);
  const doughnutChartInstance = useRef(null);

  useEffect(() => {
    // Fetch initial budget information from the API
    fetchBudgetInformation();

    // Draw charts initially
    drawCharts();

    return () => {
      // Cleanup function to destroy the chart instances
      if (doughnutChartInstance.current) {
        doughnutChartInstance.current.destroy();
      }
    };
  }, []);

  useEffect(() => {
    // Update doughnut chart whenever budget values change
    if (doughnutChartInstance.current) {
      updateDoughnutChart();
    }
  }, [educationBudget, eventsBudget, businessBudget]);

  const fetchBudgetInformation = async () => {
    try {
      // Make API request to fetch budget information with email
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

  const drawCharts = () => {
    drawDoughnutChart();
    drawBarChart();
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

  const drawBarChart = () => {
    const barCtx = document.getElementById('barChart');
    new Chart(barCtx, {
      type: 'bar' ,
      data: {
        labels: ['Ad 1', 'Ad 2', 'Ad 3', 'Ad 4', 'Ad 5', 'Ad 6'],
        datasets:[{
          label: 'Clicks per Ad', 
          data: [5, 12, 28, 1, 0, 17],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 205, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(201, 203, 207, 0.2)'
          ],
          borderColor: [
            'rgb(255, 99, 132)',
            'rgb(255, 159, 64)',
            'rgb(255, 205, 86)',
            'rgb(75, 192, 192)',
            'rgb(54, 162, 235)',
            'rgb(153, 102, 255)',
            'rgb(201, 203, 207)'
          ],
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
            Business: newBusinessBudget , 
            Email : userEmail
      }),
      })
      .then(response => {
          if (!response.ok) {
              throw new Error(`Failed to Update Budgets`);
          }
          else
          {
            console.log("updated money succesfully");
          }
          console.log("updated budgets successfully");
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
        <div class="button-container">
          <button class="button" onClick={handleDownloadPDF} id="download">Download PDF</button>
        </div>
        <div class="budget-info" id ="budget">
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
        </div>
      </div> 
   </>
  );
};

export default ManagersHome;
