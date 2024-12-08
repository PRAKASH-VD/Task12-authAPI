const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Controller methods
const authController = {
  // Register a new user
  register: async (req, res) => {
    try {
      const { name, email, password } = req.body;

      // Check if the user already exists
      const userExists = await User.findOne({ email });
      if (userExists) {
        return res.status(400).json({ message: 'User already exists' });
      }

      // Hash the password before saving
      const hashedPassword = await bcrypt.hash(password, 10);

      // Save the user to the database
      const newUser = new User({ name, email, password: hashedPassword });
      await newUser.save();

      return res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // Login functionality
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      // Check if the user exists
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: 'User does not exist' });
      }

      // Check if the password is valid
      const passwordIsValid = await bcrypt.compare(password, user.password);
      if (!passwordIsValid) {
        return res.status(400).json({ message: 'Invalid Password' });
      }

      // Generate an access token (short-lived) - 24 hours expiration
      const accessToken = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
        expiresIn: '24h',  // 24 hours expiration
      });

      // Generate a refresh token (long-lived) for token refresh purposes
      const refreshToken = jwt.sign({ id: user._id }, process.env.REFRESH_SECRET_KEY, {
        expiresIn: '7d', // 7 days expiration
      });

      // Optionally, store the refresh token in the database
      user.refreshToken = refreshToken;
      await user.save();

      // Set the access token as an HTTP-only cookie
      res.cookie('token', accessToken, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'Strict' });

      // Set the refresh token as an HTTP-only cookie
      res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'Strict' });

      return res.status(200).json({ message: 'Login successful' });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  // Logout functionality
  logout: async (req, res) => {
    try {
      // Clear the token cookies
      res.clearCookie('token');
      res.clearCookie('refreshToken');
      return res.status(200).json({ message: 'Logged out successfully' });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  // Get user info (protected route)
  me: async (req, res) => {
    try {
      // Get user ID from the decoded token
      const userId = req.userId;
      // Fetch the user from the database using the userId from the decoded token
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Respond with the user data
      return res.status(200).json({ user: { name: user.name, email: user.email,createdAt:user.createdAt } });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
};

module.exports = authController;
