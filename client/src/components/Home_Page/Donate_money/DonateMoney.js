import React, { useState, useEffect } from "react";
import "./donatemoney.css";

import Noty from "noty";
import "noty/lib/noty.css"; // Default CSS
import "noty/lib/themes/sunset.css";

function Product() {
  const [donorName, setDonorName] = useState("User1");
  const [donationAmount, setDonationAmount] = useState(10);
  const [donorList, setDonorList] = useState([]);

  const amount = donationAmount * 100; // Converting amount to paise for Razorpay
  const currency = "INR";
  const receiptId = "qwsaq1";

  useEffect(() => {
    // Fetch donor names from backend on component mount
    fetchDonorNames();
  }, []);

  const fetchDonorNames = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/moneydonor/list`);
      const data = await response.json();
      setDonorList(data.donors);
    } catch (error) {
      new Noty({
        theme: 'sunset',
        text: error,
        type: "error", // 'alert', 'success', 'error', 'warning', 'info'
        layout: "topRight", // Position on the screen
        timeout: 2000,
      }).show();
      
      console.error("Error fetching donor names:", error);
    }
  };

  const paymentHandler = async (e) => {
    e.preventDefault();
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/moneydonor/order`, {
      method: "POST",
      body: JSON.stringify({
        amount,
        currency,
        receipt: receiptId,
        donorName
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const order = await response.json();

    var options = {
      key: 'rzp_test_o8r3UGNOwqJGNM', // Enter the Key ID generated from the Dashboard
      amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency,
      name: "Piyush Bhatnagar", //your business name
      description: "Test Transaction",
      image: "https://example.com/your_logo",
      order_id: order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      handler: async function (response) {
        const body = {
          ...response,
        };

        const validateRes = await fetch(
          `${process.env.REACT_APP_API_URL}/api/moneydonor/order/validate`,
          {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const jsonRes = await validateRes.json();
      },
      prefill: {
        //We recommend using the prefill parameter to auto-fill customer's contact information, especially their phone number
        name: "Test Customer1", //your customer's name
        email: "customer@example.com",
        contact: "900000000", //Provide the customer's phone number for better conversion rates
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.on("payment.failed", function (response) {
      alert(response.error.code);
      alert(response.error.description);
      alert(response.error.source);
      alert(response.error.step);
      alert(response.error.reason);
      alert(response.error.metadata.order_id);
      alert(response.error.metadata.payment_id);
    });
    rzp1.open();
  };

  return (
    <>
    <div id="donate-money" style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "15px", paddingTop: "20px", margin: "0 auto" }}>
        <h2>"Every penny donated is a step closer to healing, a gesture of hope for those in need."</h2>
        <br/>
        <div style={{ display: "flex", justifyContent: "center", borderRadius: "20%", border: "", minWidth: "200px", maxWidth: "40%" }}>
          <img src="https://moneyfcu.org/wp-content/uploads/2017/12/donation-jar.jpg" alt="Donation Jar" style={{ borderRadius: "20%", width: "100%", height: "auto", objectFit: "contain", margin: "0px", paddingLeft: "15px" }} />
        </div>
        <div style={{ padding: "15px", width: "100%" }}>
          <form onSubmit={paymentHandler} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <label htmlFor="donorName">Your Name:</label>
            <input
              type="text"
              id="donorName"
              value={donorName}
              // className="form-control"
              style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc", marginBottom: "15px", width: "20%" }}
              onChange={(e) => setDonorName(e.target.value)}
              required
            />

            <label htmlFor="donationAmount">Donation Amount (INR):</label>
            <input
              type="number"
              id="donationAmount"
              value={donationAmount}
              // className="form-control"
              style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc", marginBottom: "15px", width: "20%" }}
              onChange={(e) => setDonationAmount(e.target.value)}
              required
            />

            <button 
              type="submit" 
              style={{ 
                padding: "10px 20px", 
                borderRadius: "5px", 
                border: "none", 
                backgroundColor: "#FF5733", 
                color: "white", 
                cursor: "pointer", 
                transition: "background-color 0.3s" 
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#FF8C69'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#FF5733'}
            >
              DONATE
            </button>          </form>
        </div>
      </div>

      <h2 id="money-donor-heading">Our Donors</h2>
      <div id="myCarousel" className="carousel slide" data-ride="carousel" data-interval="3000">
        <div className="carousel-inner">
          {donorList && donorList.map((donor, index) => (
            <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
              {/* Donor name */}
              {donor}
            </div>
          ))}
        </div>
      </div>
    <br/>
    </>
  );
}

export default Product;