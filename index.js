const express = require('express');
const cors = require('cors');
const config = require('./config/env.config');
const userRoutes = require('./routes/user.routes');
const connectDB = require('./config/db.config');


const app = express();
const PORT = config.PORT;

app.use(express.json());
app.use(cors({
    origin: "https://imdb-clone-sigma-beige.vercel.app/",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));
app.use(express.urlencoded({
    extended: true
}));

// Database Connection
connectDB();

app.use('/api/auth/user', userRoutes);


app.get('/', (req, res) => {
    res.status(200).json({
        message: "Basic route work properly",
        success: true
    })
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

app.use((req, res, next) => {
    res.status(404).json({
        message: 'Route not found'
    });
});

app.listen(PORT, () => {
    console.log(`Server in running on http://localhost:${PORT}`);
})
