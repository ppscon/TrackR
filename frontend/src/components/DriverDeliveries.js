import React, { useState, useEffect } from 'react';

const DriverDeliveries = () => {
    const [drivers, setDrivers] = useState([]);
    const [deliveries, setDeliveries] = useState([]);

    useEffect(() => {
        fetchDrivers();
        fetchDeliveries();
    }, []);

    const fetchDrivers = async () => {
        const response = await fetch('http://localhost:3000/api/drivers');
        const data = await response.json();
        setDrivers(data);
    };

    const fetchDeliveries = async () => {
        const response = await fetch(`http://localhost:3000/api/drivers/${driverId}/deliveries`);
        const data = await response.json();
        setDeliveries(data);
    };


    return (
        <div>
            {drivers.map((driver) => (
                <div key={driver.id}>
                    <h3>{driver.name}</h3>
                    <ul>
                        {deliveries
                            .filter((delivery) => delivery.driver_id === driver.id)
                            .map((delivery) => (
                                <li key={delivery.id}>
                                    Drop {delivery.drop_number}: {delivery.address}
                                </li>
                            ))}
                    </ul>
                </div>
            ))}
        </div>
    );
};

export default DriverDeliveries;
