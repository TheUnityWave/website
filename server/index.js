const connectToMongoDB = require('./db');
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

// CONFIG .ENV FILE.
dotenv.config({path: __dirname+'/.env'});

// CONNECTION TO THE DATABASE.
connectToMongoDB();

// Starting the server.
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
