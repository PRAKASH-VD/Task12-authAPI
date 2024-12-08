const express = require('express');
const authController = require('../controllers/authController');  // Import the controller
const auth = require('../utils/auth');  // Import the auth middleware

const authRouter = express.Router();

// Define the endpoints
authRouter.post('/register', authController.register);  // Register a new user
authRouter.post('/login', authController.login);  // Login an existing user
authRouter.post('/logout', authController.logout);  // Logout the user
authRouter.get('/me', auth.isAuthenticated, authController.me);  // Protected route to fetch user info

module.exports = authRouter;

