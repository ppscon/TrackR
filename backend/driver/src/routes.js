const express = require('express');
const router = express.Router();

const {
    getAllDrivers,
    getDriverById,
    createDriver,
    updateDriver,
    deleteDriver,
    getDriverDeliveries,
} = require('./controllers/driverController');

router.get('/', getAllDrivers);
router.get('/:driverId', getDriverById);
router.post('/', createDriver);
router.put('/:driverId', updateDriver);
router.delete('/:driverId', deleteDriver);

router.get('/:driverId/deliveries', getDriverDeliveries);

router.get('/test', (req, res) => {
    res.status(200).json({ message: 'Test route works' });
});

module.exports = router;
