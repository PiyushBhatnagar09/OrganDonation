# Organ Donation and Transplant Management System

## Overview

This project is a **blockchain-integrated platform** designed to streamline and secure the organ donation and transplant process. It connects **donors**, **recipients**, and **hospitals**, ensuring transparency and efficiency. The system leverages **MongoDB** for fast and easy data access while storing critical data on the blockchain for security and immutability. **MetaMask is not required** for most user interactions, making the platform accessible to a wider audience.

---

## Features

### 1. **Donor Registration**
- Donors can register on the platform without the need for MetaMask or blockchain knowledge.
- Donor data is stored on the blockchain and replicated in MongoDB for faster access.

### 2. **Donor Status Check**
- Donors can check their registration and donation status without needing MetaMask.

### 3. **Transplant Insights**
Users can view:
- **Active Donors**: Total donors available.
- **Active Recipients**: Individuals in need of organ transplants.
- **Transplant Matches**: Match data between donors and recipients.

> **Note:** All transplant-related data is first stored on the blockchain for transparency and then added to MongoDB for easy access.

### 4. **Hospital Portal**
- Hospitals can log in using their **Aadhar number** and **email**.
- Functionality includes:
  - **Approve Donors**: Verify and approve donors.
  - **Register Recipients**: Add recipients who need organs.
  - **Check Transplant Matches**: View potential matches between donors and recipients.

### 5. **Donation with Razorpay**
- Users can donate money through **Razorpay** (test mode).
- The names of monetary donors are displayed on the website to inspire and motivate others.

---

## Technologies Used

- **Frontend**: React.js
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Blockchain**: Ethereum (Sepolia testnet)
- **Payment Gateway**: Razorpay (test mode)
- **Authentication**: Custom authentication for hospitals, no MetaMask required for most interactions

---

## Installation and Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/your-repo-name.git
   cd your-repo-name

### Install dependencies:

```bash
npm install
