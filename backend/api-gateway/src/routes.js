const express = require('express');
const router = express.Router();
const db = require('./config/database');

// Fetch all drivers
router.get('/drivers', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM drivers');
        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Fetch a specific driver by ID
router.get('/drivers/:id', async (req, res) => {
    const driverId = req.params.id;

    try {
        const [rows] = await db.query('SELECT * FROM drivers WHERE id = ?', [driverId]);
        if (rows.length > 0) {
            res.status(200).json(rows[0]);
        } else {
            res.status(404).json({ message: 'Driver not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// Fetch deliveries for a specific driver by ID
router.get('/drivers/:id/deliveries', async (req, res) => {
    const driverId = req.params.id;

    try {
        const [rows] = await db.query('SELECT * FROM deliveries WHERE driver_id = ?', [driverId]);
        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Create a new driver
router.post('/drivers', async (req, res) => {
    const newDriver = req.body;

    try {
        const [result] = await db.query('INSERT INTO drivers SET ?', [newDriver]);
        res.status(201).json({ message: 'Driver created', driverId: result.insertId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update a driver's details by ID
router.put('/drivers/:id', async (req, res) => {
    const driverId = req.params.id;
    const updatedDriver = req.body;

    try {
        const [result] = await db.query('UPDATE drivers SET ? WHERE id = ?', [updatedDriver, driverId]);
        if (result.affectedRows > 0) {
            res.status(200).json({ message: 'Driver updated' });
        } else {
            res.status(404).json({ message: 'Driver not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete a driver by ID
router.delete('/drivers/:id', async (req, res) => {
    const driverId = req.params.id;

    try {
        const [result] = await db.query('DELETE FROM drivers WHERE id = ?', [driverId]);
        if (result.affectedRows > 0) {
            res.status(200).json({ message: 'Driver deleted' });
        } else {
            res.status(404).json({ message: 'Driver not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
