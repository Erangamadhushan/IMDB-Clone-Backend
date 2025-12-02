const mongoose = require('mongoose');
const config = require('./env.config');

const connectDB = async () => {
    try {
        const connection = await mongoose.connect(config.MONGODB_URI);
        console.log('MongoDB connected successfully');

        connection.connection.on('error', (err) => {
            console.error(`MongoDB connection error: ${err}`);
        });

        connection.connection.on('disconnected', () => {
            console.warn('MongoDB disconnected');
        });

        connection.connection.on('connected', () => {
            console.log('MongoDB reconnected');
        });

        process.on('SIGINT', async () => {
            await connection.connection.close();
            console.log('MongoDB connection closed due to app termination');
            process.exit(0);
        });

    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
};

module.exports = connectDB;