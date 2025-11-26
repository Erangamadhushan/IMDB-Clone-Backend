const express = require('express');
const cors = require('cors');
const config = require('./config/env.config');


const app = express();
const PORT = config.PORT;

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({
    extended: true
}));

app.use('/api/auth/user/', userRoutes);

app.get('/', (req, res) => {
    res.status(200).json({
        message: "Basic route work properly",
        success: true
    })
});

app.listen(PORT, () => {
    console.log(`Server in running on http://localhost:${PORT}`);
})
