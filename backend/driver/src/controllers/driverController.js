const pool = require('../config/database');

exports.getAllDrivers = async (req, res, next) => {
    try {
        const [rows, _] = await pool.query('SELECT * FROM drivers');
        res.status(200).json(rows);
    } catch (error) {
        next(error);
    }
};

exports.getDriverById = async (req, res, next) => {
    try {
        const [rows, _] = await pool.query('SELECT * FROM drivers WHERE id = ?', [req.params.driverId]);

        if (rows.length !== 0) {
            res.status(200).json(rows[0]);
        } else {
            const error = new Error('Driver not found');
            error.status = 404;
            throw error;
        }
    } catch (error) {
        next(error);
    }
};

exports.getDriverDeliveries = async (req, res, next) => {
    try {
        const [rows, _] = await pool.query('SELECT * FROM deliveries WHERE driver_id = ?', [req.params.driverId]);

        if (rows.length !== 0) {
            res.status(200).json(rows);
        } else {
            const error = new Error('Deliveries not found for the specified driver');
            error.status = 404;
            throw error;
        }
    } catch (error) {
        next(error);
    }
};

// The rest of your driverController.js code (createDriver, updateDriver, deleteDriver)

exports.createDriver = async (req, res, next) => {
    try {
        const { name, phone, email, staff_id, vehicle_id } = req.body;

        const [result, _] = await pool.query('INSERT INTO drivers (name, phone, email, staff_id, vehicle_id) VALUES (?, ?, ?, ?, ?)', [name, phone, email, staff_id, vehicle_id]);
        res.status(201).json({ message: 'Driver created', driverId: result.insertId });
    } catch (error) {
        next(error);
    }
};

exports.updateDriver = async (req, res, next) => {
    try {
        const { name, phone, email, staff_id, vehicle_id } = req.body;

        const [result, _] = await pool.query('UPDATE drivers SET name = ?, phone = ?, email = ?, staff_id = ?, vehicle_id = ? WHERE id = ?', [name, phone, email, staff_id, vehicle_id, req.params.driverId]);

        if (result.affectedRows === 0) {
            const error = new Error('Driver not found');
            error.status = 404;
            throw error;
        } else {
            res.status(200).json({message: 'Driver updated'});
        }
    } catch (error) {
        next(error);
    }
};

exports.deleteDriver = async (req, res, next) => {
    try {
        const [result, _] = await pool.query('DELETE FROM drivers WHERE id = ?', [req.params.driverId]);

        if (result.affectedRows !== 0) {
            res.status(200).json({message: 'Driver deleted'});
        } else {
            const error = new Error('Driver not found');
            error.status = 404;
            throw error;
        }
    } catch (error) {
        next(error);
    }
};
