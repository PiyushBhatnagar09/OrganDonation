# Organ Donation and Transplant Management System

This project is a **blockchain-integrated platform** designed to streamline and secure the organ donation and transplant process. It connects **donors**, **recipients**, and **hospitals**, ensuring transparency and efficiency. The system leverages **MongoDB** for fast and easy data access while storing critical data on the blockchain for security and immutability. **MetaMask is not required** for most user interactions, making the platform accessible to a wider audience.

![Home Page](https://github.com/user-attachments/assets/949d06d3-7352-4780-875a-f09e36358282)

## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Implementation Details](#implementation-details)
  - [Donor Registration](#donor-registration)
  - [Hospital Login](#hospital-login)
  - [Approve Donor](#approve-donor)
  - [Recipient Registration](#recipient-registration)
  - [Transplant Match](#transplant-match)
  - [Transplant Insights](#transplant-insights)
  - [Money Donation](#money-donation)
- [Usage](#usage)
- [Contributing](#contributing)

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

## Technologies Used

- **Frontend**: React.js
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Blockchain**: Smart Contract(via Solidity), Ethereum (Sepolia testnet)
- **Payment Gateway**: Razorpay (test mode)
- **Authentication**: Custom authentication for hospitals, no MetaMask required for most interactions

## Implementation Details

### Donor Registration

Donors need to enter their details like name, email, password, gender, blood group, city, organ.

![Donor Signup Page](https://github.com/user-attachments/assets/949d06d3-7352-4780-875a-f09e36358282)

### Hospital Login

Hospitals can login with their unique credentials.

![Hospital Login Page](https://github.com/user-attachments/assets/949d06d3-7352-4780-875a-f09e36358282)

### Approve Donor

Hospitals need to verify the Donor using his/her aadhar number and email.
Now, Donor details will be stored in Blockchain and also updated in MongoDB database.

![Approve Donor](https://github.com/user-attachments/assets/0ef89cfd-6515-40f3-bdff-1c9bf7e86f58)

### Recipient Registration

Hospitals need to register details of recipient by giving their demographic details and bloodgroup, organ details.
Now, Recipient details will be stored in Blockchain and also updated in MongoDB database.

![Recipient Registration](https://github.com/user-attachments/assets/c6251abf-a42e-4c55-8ddf-9a289175dc0a)

### Transplant Match

Hospitals can do transplant match to find matching donors for recipients. 
Transplant match details will also be stored in Blockchain and updated in MongoDB database.

![Transplant Match](https://github.com/user-attachments/assets/fe1ed75d-ab8d-40a5-8faa-0a38b4203793)

### Transplant Insights

Users can view active donors, active recipients and transplant matches details on Transplant Insights page.

Active Donors
![Active Donors](https://github.com/user-attachments/assets/eb6578a3-e0ea-46e8-a47d-dc227527a494)

Active Recipients
![Active Recipients](https://github.com/user-attachments/assets/eb6578a3-e0ea-46e8-a47d-dc227527a494)

Transplant Matches
![Transplant Matches](https://github.com/user-attachments/assets/eb6578a3-e0ea-46e8-a47d-dc227527a494)


### Money Donation

Users can also donate money using Razorpay test mode.

![Money Donation](https://github.com/user-attachments/assets/d1d8cc47-6c95-4040-8398-0e043b9a81f4)

## Usage

To use the Organ Donation and Transplant Management System:

1. **Donor Registration:**
   - Visit the website's donor registration page.
   - Fill in the required details, including personal information and organ donation preferences.
   - Submit the form to register as a donor. Your data will be securely stored on the blockchain and replicated in MongoDB for fast access.

2. **Check Donor Status:**
   - Navigate to the donor status page.
   - Enter your registered details to check your donation status without needing MetaMask.

3. **View Transplant Insights:**
   - Access the insights page to view:
     - Active donors
     - Active recipients
     - Transplant matches
   - The data is fetched from MongoDB for efficiency and reflects blockchain-verified information.

4. **Hospital Portal:**
   - Log in using the hospital portal with your Aadhar number and email.
   - Approve donors, register recipients, and view transplant matches with verified details.

5. **Make a Donation:**
   - Go to the donation page and contribute money using Razorpay in test mode.
   - View the list of donors who have contributed, displayed on the website to encourage others.

## Contributing

Contributions are welcome! If you want to contribute to this project, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
   git checkout -b feature-name
3. Make your changes and test them thoroughly.
4. Commit your changes with a descriptive message.
5. Push the changes to your forked repository.
6. Submit a pull request with a detailed description of your changes.

