const mongoose = require('mongoose');

const connectToMongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Successfully connected to MongoDB');

    } catch (error) {
        console.log('Error while connecting to the Database', error);

    }
}

module.exports = connectToMongoDB;