const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const connectToMongoDB = require('./db');
const employeeRoutes = require('./routes/Employee');
const adminRoutes = require('./routes/Admin');
const careerRoutes = require('./routes/careerRoutes');
const getintouchRoute = require('./routes/getintouchRoute');
const login = require('./routes/Login');
const multer = require('multer');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Load environment variables
dotenv.config({ path: __dirname + '/.env' });

// Connect to MongoDB
connectToMongoDB();

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'build')));

// API Routes
app.use('/api/employee', employeeRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/login', login);
app.use('/api/careers', careerRoutes);
app.use('/api/getintouch', getintouchRoute);

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});