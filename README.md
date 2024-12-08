# User Authentication and Authorization API

This is a Node.js-based RESTful API for user authentication and authorization. It includes features like user registration, login, logout, access control, and retrieving user information. The application is built using Express.js, Mongoose, JWT, and MongoDB, following the MVC architecture pattern.

## Features
User registration with secure password hashing.
Login functionality with JWT-based authentication.
Role-based access control (admin, manager, user).
Token refresh using short-lived access tokens and long-lived refresh tokens.
Logout functionality that clears tokens.
Protected routes to fetch user data.
HTTP-only cookies for secure token storage.
Modular and scalable architecture.

## Technologies Used
Backend Framework: Node.js with Express.js
Database: MongoDB (using Mongoose ODM)
Authentication: JWT (JSON Web Token)
Environment Management: dotenv
Hashing: bcrypt.js
API Documentation: Postman
Middleware: Cookie-parser, Express

## Installation
Clone the repository:
git clone https://github.com/yourusername/auth-api.git
cd auth-api

Install dependencies:
npm install

Create a .env file in the root directory and configure the environment variables (see Environment Variables).

Start the server:
npm start
The server will run at http://localhost:3002 by default.

## Environment Variables
Create a .env file in the root directory and set the following values:
MONGO_URI=your_mongo_db_connection_string
PORT=3002
SECRET_KEY=your_jwt_secret_key
REFRESH_SECRET_KEY=your_refresh_token_secret_key

## API Endpoints
Method	Endpoint	Description	Requires Authentication
POST	/api/auth/register	Register a new user	No
POST	/api/auth/login	Login an existing user	No
POST	/api/auth/logout	Logout the user	Yes
GET	/api/auth/me	Get user info (protected)	Yes


## Project Structure

project-folder/
│
├── config/
│   └── db.js                # MongoDB connection configuration
│
├── controllers/
│   └── authController.js    # Controller for authentication-related logic
│
├── models/
│   └── user.js              # Mongoose schema for User model
│
├── routes/
│   └── authRoutes.js        # Routes for authentication
│
├── utils/
│   └── auth.js              # Authentication middleware
│
├── .env                     # Environment variables
├── server.js                # Entry point of the application
├── package.json             # Project metadata and dependencies
└── README.md                # Project documentation


## Future Improvements
Input validation using libraries like Joi or express-validator.
Implement rate limiting and CAPTCHA for login endpoints.
Extend role-based access control for managing resources.
Add email verification during registration.