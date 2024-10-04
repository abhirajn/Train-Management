# Train Reservation and Management System

## Overview

The **Train Reservation and Management System** is a web application designed to manage train ticket bookings. It allows users to view train schedules, check seat availability, and make reservations. The backend efficiently handles concurrent booking requests using MySQL transactions, ensuring data consistency in high-demand scenarios.

## Features

- View available trains and their schedules.
- Book tickets with real-time availability updates.
- Handle concurrent bookings using MySQL transactions to avoid race conditions.
- User-friendly interface for managing reservations.
- Login and registration for users.

## Tech Stack

- **Frontend**: React.js
- **Backend**: Node.js, Express.js
- **Database**: MySQL
- **Other Libraries/Tools**:
  - Axios (for API requests)
  - MySQL2 (for database interactions)

## Installation

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v14+)
- [MySQL](https://www.mysql.com/)
- [Git](https://git-scm.com/)

### Setup

1. Clone the repository:

    ```bash
    git https://github.com/abhirajn/Train-Management.git
    cd train-reservation-system
    ```

2. Install the dependencies:

    ```bash
    npm install
    ```

3. Set up the MySQL database:

    - Create a new MySQL database and import the provided SQL script:
    
    ```sql
    CREATE DATABASE train_reservation;
    ```

    - Update the database configuration in the `.env` file.

4. Create a `.env` file in the root of your project and add your MySQL credentials:

    ```
    DB_HOST=localhost
    DB_USER=root
    DB_PASSWORD=yourpassword
    DB_NAME=train_reservation
    ```

5. Run database migrations or execute SQL scripts to set up the necessary tables.

6. Start the server:

    ```bash
    npm start
    ```

7. Run the frontend React app (if in a separate folder):

    ```bash
    cd client
    npm start
    ```

The application should now be running on `http://localhost:3000` for the backend API and `http://localhost:3001` (or as configured) for the frontend.

## Usage

- Navigate to the frontend URL to interact with the system.
- Sign up as a user, log in, and start booking train tickets.
- Admins can manage train schedules and monitor ticket availability.

## Booking Workflow

- **Search for a Train**: View all available trains based on routes and schedules.
- **Select Train**: Choose a train based on availability and book a seat.
- **Payment**: Simulate the payment process.
- **Confirmation**: Once the booking is confirmed, the user receives a reservation code.

## Screenshots
![Screenshot 2024-06-19 234001](https://github.com/user-attachments/assets/6f93eb0a-7ab2-4446-989d-d6431d0a76b7)
![Screenshot 2024-06-19 234232](https://github.com/user-attachments/assets/8bf431aa-fa0d-4a5a-8928-3de084091fb3)
![Screenshot 2024-06-19 234743](https://github.com/user-attachments/assets/ef73bf9a-38e8-4b1b-89d3-d524c78eb6fc)
![Screenshot 2024-06-19 235028](https://github.com/user-attachments/assets/1f24eb99-354c-4f0b-8c13-1b447146e3df)
![Screenshot 2024-06-19 235059](https://github.com/user-attachments/assets/5e2d4e0f-10c9-4c05-a34a-1f1527607861)
![Screenshot 2024-06-20 010113](https://github.com/user-attachments/assets/2f7f2843-9e9a-44ad-8f32-6f760084973c)
![Screenshot 2024-06-20 010508](https://github.com/user-attachments/assets/41f519f0-baa3-4200-ae71-83b626b9dbbb)
![Screenshot 2024-06-20 010609](https://github.com/user-attachments/assets/9ebfb51d-f614-48c0-b88c-1225a5e1fa86)









