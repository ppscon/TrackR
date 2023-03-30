const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const driverRoutes = require('./routes');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Routes
app.use('/', driverRoutes);

// Test route
app.get('/test', (req, res) => {
    res.status(200).json({ message: 'Driver service test route works' });
});

// Error handling
app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    const status = error.status || 500;
    const message = error.message;
    res.status(status).json({ error: { message } });
});

// Start the server
const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Driver service running on port ${port}`);
});
