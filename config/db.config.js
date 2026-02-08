const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI, {
            serverSelectionTimeoutMS: 5000, 
        });

        console.log(`MongoDB Connected: ${conn.connection.host}`);
        // Handle connection events

        mongoose.connection.on('connected', () => {
            console.log('Mongoose connected to DB Cluster');
        });

        mongoose.connection.on('error', (err) => {
            console.error(`Mongoose connection error: ${err}`);
        });
        mongoose.connection.on('disconnected', () => {
            console.log('Mongoose disconnected');
        });

        // Graceful shutdown
        process.on('SIGINT', async () => {
            await mongoose.connection.close();
            console.log('Mongoose disconnected on app termination');
            process.exit(0);
        });
    } catch (error) {
        console.error(`Error connecting to MongoDB: ${error}`);
        throw error; // Rethrow to allow handling in calling code
    }
}

module.exports = connectDB;