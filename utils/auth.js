const jwt = require('jsonwebtoken');
require('dotenv').config();

const auth = {
  isAuthenticated: (req, res, next) => {
    try {
      // Extract token from the cookie
      const token = req.cookies.token;
      
      // If the token is not present, return an error message
      if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      // Verify the token
      const decoded = jwt.verify(token, process.env.SECRET_KEY);

      // Set the user id in the request object
      req.userId = decoded.id;

      // Call next() to pass control to the next middleware or route handler
      next();
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
};

module.exports = auth;
