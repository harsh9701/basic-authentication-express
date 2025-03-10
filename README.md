# Basic Authentication with Express.js

This repository contains a basic authentication system using **Express.js**, **bcrypt**, **MongoDB**, and **JWT**. It includes user signup, signing (login), and logout functionalities.

## Features
- **User Signup**: Register new users with hashed passwords using `bcrypt`.
- **User Signing**: Authenticate users and generate JWT tokens.
- **User Logout**: Invalidate the user session.

## Technologies Used
- **Node.js** with **Express.js** (Backend Framework)
- **MongoDB** (Database)
- **bcrypt** (Password Hashing)
- **JWT (JSON Web Token)** (Authentication)

## Installation

### Prerequisites
- Install [Node.js](https://nodejs.org/)
- Install [MongoDB](https://www.mongodb.com/)

### Steps to Run the Project
1. Clone the repository:
   ```sh
   git clone https://github.com/harsh9701/basic-authentication-express.git
   cd basic-authentication-express
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Configure environment variables:
   - Create a `.env` file in the root directory.
   - Add the following values:
     ```env
     MONGO_URL=your_mongodb_connection_string
     JWT_SECRET=your_secret_key
     ```
4. Start the server:
   ```sh
   npm start
   ```
   or using nodemon:
   ```sh
   npx nodemon
   ```
5. The server will start on `http://localhost:5000`

## API Endpoints

| Method | Endpoint       | Description        |
|--------|--------------|------------------|
| POST   | `/signup`    | Register a new user |
| POST   | `/login`    | Authenticate user and return JWT |
| POST   | `/logout`    | Logout user |
| GET   | `/profile`    | Get user profile |

---
Feel free to contribute or raise issues if you have any suggestions!

