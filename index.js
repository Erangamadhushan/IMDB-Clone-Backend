const app = require('./app');
const config = require('./config/env.config');
const PORT = config.PORT;
const connectDB = require('./config/db.config');

// Database Connection
connectDB();

app.use((req, res, next) => {
    res.status(404).json({
        message: 'Route not found'
    });
});

app.listen(PORT, () => {
    console.log(`Server in running on http://localhost:${PORT}`);
})
