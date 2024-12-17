# Organ Donation and Transplant Management System

This project is a **blockchain-integrated platform** designed to streamline and secure the organ donation and transplant process. It connects **donors**, **recipients**, and **hospitals**, ensuring transparency and efficiency. The system leverages **MongoDB** for fast and easy data access while storing critical data on the blockchain for security and immutability. **MetaMask is not required** for most user interactions, making the platform accessible to a wider audience.

![home_page](https://github.com/user-attachments/assets/04ce7024-3e1a-4558-bfe2-067e9b534d07)

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

![donor_signup](https://github.com/user-attachments/assets/da6a7b9f-b95c-4413-acc8-991a19d3727f)

### Hospital Login

Hospitals can login with their unique credentials.

![hospital_login](https://github.com/user-attachments/assets/f5756772-e621-468b-9a9b-6b3b88c7eba4)

### Approve Donor

Hospitals need to verify the Donor using his/her aadhar number and email.
Now, Donor details will be stored in Blockchain and also updated in MongoDB database.

![approve_donor](https://github.com/user-attachments/assets/233d9713-818f-4b93-aba5-5d2e509ec58c)

### Recipient Registration

Hospitals need to register details of recipient by giving their demographic details and bloodgroup, organ details.
Now, Recipient details will be stored in Blockchain and also updated in MongoDB database.

![recipient_register](https://github.com/user-attachments/assets/108ee5ae-3cc4-4181-bfdd-8204141fe0fe)

### Transplant Match

Hospitals can do transplant match to find matching donors for recipients. 
Transplant match details will also be stored in Blockchain and updated in MongoDB database.

![transplant](https://github.com/user-attachments/assets/2cdddf14-37d6-4f9e-93a2-c88c9faf1526)
![transplant_success](https://github.com/user-attachments/assets/0607489f-585f-44d7-a640-e0261565119c)

### Transplant Insights

Users can view active donors, active recipients and transplant matches details on Transplant Insights page.

Active Donors
![active_donors](https://github.com/user-attachments/assets/2bb47b66-68fd-408e-bc35-ffdae723b88c)

Active Recipients
![active_recipients](https://github.com/user-attachments/assets/2899f44b-7195-4771-ad5d-7efbe7b8df38)

Transplant Matches
![transplant_matches](https://github.com/user-attachments/assets/2640a9cf-ea11-44a8-91c6-c74b918e701d)


### Money Donation

Users can also donate money using Razorpay test mode.

![money_donation](https://github.com/user-attachments/assets/daf3124e-2bc1-4eac-bf7b-a3cac5e2b32e)
![razorpay](https://github.com/user-attachments/assets/83550f9f-1e4e-4fc5-9e66-4de7ab5102fb)

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

