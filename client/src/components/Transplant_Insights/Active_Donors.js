import React, { useState, useEffect } from "react";
import "./styles.css";

import Noty from "noty";
import "noty/lib/noty.css"; // Default CSS
import "noty/lib/themes/sunset.css";

function Active_Donors(props) {
  const [activeDonors, setActiveDonors] = useState([]);

  useEffect(() => {
    const fetchDonorData = async () => {
      try {
        // Fetch active donor data from the backend API
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/donors`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        // Assuming the response returns an array of active donors
        const activeDonorsData = data.map((transplant) => ({
          donorAddress: transplant.donor_addr,
          organ: transplant.organ,
          bloodgroup: transplant.bloodgroup, // Assuming bloodgroup exists in the response
          matchFound: transplant.matchFound, // Assuming matchFound exists in the response
          recipientId: transplant.recipient_addr || "N/A", // If no recipient, show N/A
        }));

        setActiveDonors(activeDonorsData);
      } catch (error) {
        new Noty({
          theme: 'sunset',
          text: error.message,
          type: "error", // 'alert', 'success', 'error', 'warning', 'info'
          layout: "topRight", // Position on the screen
          timeout: 2000,
        }).show();
        console.error("Error fetching donor data:", error);
      }
    };

    fetchDonorData();
  }, []);

  return (
    <div className="section">
      <h2>Active Donors</h2>
      <table>
        <thead>
          <tr>
            <th>Donor Address</th>
            <th>Organ</th>
            <th>Blood Group</th>
            <th>Recipient Address</th>
            <th>Match Found</th>
          </tr>
        </thead>
        <tbody>
          {activeDonors.length > 0 ? (
            activeDonors.map((donor, index) => (
              <tr key={index}>
                <td>{donor.donorAddress}</td>
                <td>{donor.organ}</td>
                <td>{donor.bloodgroup}</td>
                <td>{donor.recipientId}</td>
                <td>{donor.matchFound ? "Yes" : "No"}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No active donors available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Active_Donors;
