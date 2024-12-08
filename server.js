const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const recipeRoutes = require('./routes/recipeRoutes');
const cookieParser =require('cookie-parser');

const mongoose = require('mongoose');
const authRouter = require('./routes/authRoutes');

dotenv.config(); // Load .env variables

connectDB(); // Connect to MongoDB

const app = express();

// Middleware
//app.use(bodyParser.json()); // Parse JSON requests
app.use(express.json());
app.use(cookieParser());
// Routes
//app.use('/api/recipes', recipeRoutes);
app.use('/api/auth', authRouter);

// Root Route
app.get('/', (req, res) => {
  res.send('API is running...');
});

//const PORT = process.env.PORT || 3000;
const PORT = process.env.PORT || 3002; // Use a different port
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


