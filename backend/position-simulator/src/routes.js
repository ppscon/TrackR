const express = require('express');
const router = express.Router();
const pool = require('./config/database');

router.get('/api/simulated-drivers', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM deliveries');
        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({ error: { message: error.message } });
    }
});

module.exports = router;
