const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const connectToMongoDB = require('./db');
const employeeRoutes = require('./routes/Employee');
const adminRoutes = require('./routes/Admin');
const careerRoutes = require('./routes/careerRoutes');
const getintouchRoute = require('./routes/getintouchRoute');
const login = require('./routes/Login');
const multer = require('multer');

const app = express();
const PORT = process.env.PORT || 5000; // Adjust port as needed

// Multer middleware setup
const storage = multer.memoryStorage(); // or multer.diskStorage() for persistent storage
const upload = multer({ storage: storage });

// Middleware
app.use(cors()); // Enable CORS if needed
app.use(bodyParser.json());
app.use(express.json({ limit: '10mb' })); // Handle JSON bodies
app.use(express.urlencoded({ limit: '10mb', extended: true })); // Handle URL-encoded bodies
// Uncomment the above if you need to handle form data or JSON requests

// Load environment variables
dotenv.config({ path: __dirname + '/.env' });

// Connect to MongoDB
connectToMongoDB();

// Routes
app.use('/api/employee', employeeRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/login', login);
app.use('/api/careers', careerRoutes);
app.use('/api/getintouch', getintouchRoute);


// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
