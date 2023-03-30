require('dotenv').config();
const { createProxyMiddleware } = require('http-proxy-middleware');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Proxy setup
const driverServiceProxy = createProxyMiddleware('/api/drivers', {
    target: process.env.DRIVER_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: {
        '^/api/drivers': '',
    },
    logLevel: 'debug',
});

app.use(driverServiceProxy);

// Test route
app.get('/test', (req, res) => {
    res.status(200).json({ message: 'API Gateway test route works' });
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
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`API Gateway running on port ${port}`);
});
