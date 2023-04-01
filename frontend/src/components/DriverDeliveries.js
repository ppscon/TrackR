import React, { useState, useEffect } from 'react';
import Driver from './Driver';

const DriverDeliveries = () => {
    const [drivers, setDrivers] = useState([]);
    const [deliveries, setDeliveries] = useState([]);

    useEffect(() => {
        fetchDrivers().then(() => {
            console.log('Drivers fetched successfully.');
        });
    }, []);

    useEffect(() => {
        if (drivers.length > 0) {
            drivers.forEach((driver) => fetchDeliveries(driver.id));
        }
    }, [drivers]);

    const fetchDrivers = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/drivers');
            const data = await response.json();
            setDrivers(data);
        } catch (error) {
            console.error('Error fetching drivers:', error);
        }
    };

    const fetchDeliveries = async (driverId) => {
        try {
            const response = await fetch(`http://localhost:3000/api/drivers/${driverId}/deliveries`);
            const data = await response.json();
            setDeliveries((prevDeliveries) => [...prevDeliveries, ...data]);
        } catch (error) {
            console.error(`Error fetching deliveries for driver ${driverId}:`, error);
        }
    };

    return (
        <div>
            {drivers.map((driver) => (
                <Driver key={driver.id} driver={driver} deliveries={deliveries} />
            ))}
        </div>
    );
};

export default DriverDeliveries;
