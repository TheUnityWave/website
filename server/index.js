const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const connectToMongoDB = require('./db');
const employeeRoutes = require('./routes/Employee');
const adminRoutes = require('./routes/Admin');
const multer = require('multer');

const app = express();
const PORT = 5000;

// Multer middleware setup
const storage = multer.memoryStorage(); // or any other storage strategy
const upload = multer({ storage: storage });

// Middleware
// app.use(upload.any()); // This will handle multipart form data
// app.use(bodyParser.json());
// app.use(cors());
// app.use(express.json({ limit: '10mb' }));
// app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Load environment variables
dotenv.config({ path: __dirname + '/.env' });

// Connect to MongoDB
connectToMongoDB();

// Routes
app.use('/api/employee', employeeRoutes);
app.use('/api/admin', adminRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
