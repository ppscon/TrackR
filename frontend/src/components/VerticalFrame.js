import React, { useState} from 'react';
import './VerticalFrame.css';
import johnDoeImg from '../images/john_doe.jpeg';
import janeSmithImg from '../images/jane_smith.jpeg';
import michaelBrownImg from '../images/michael_brown.jpeg';
import emilyJohnsonImg from '../images/emily_johnson.jpeg';

const getDriverImage = (name) => {
    switch (name) {
        case 'John Doe':
            return johnDoeImg;
        case 'Jane Smith':
            return janeSmithImg;
        case 'Emily Johnson':
            return emilyJohnsonImg;
        case 'Michael Brown':
            return michaelBrownImg;
        default:
            return '';
    }
};

const VerticalFrame = ({ addVehicle, drivers, setSelectedDriver }) => {
    const [selectedDriver, setSelectedDriverLocal] = useState(null);

    const handleDriverClick = (driver) => {
        setSelectedDriverLocal(driver);
        setSelectedDriver(driver);
    };

    const renderDriverDetails = (driver) => {
        if (!driver) return null;

        return (
            <div>
                <img
                    src={getDriverImage(driver.name)}
                    alt={driver.name}
                    style={{ width: '100%', height: 'auto' }}
                />
                <p>Phone: {driver.phone}</p>
                <p>Email: {driver.email}</p>
                <p>Vehicle ID: {driver.vehicle_id}</p>
            </div>
        );
    };

    return (
        <div className="vertical-frame">
            <h2>Driver Details</h2>
            {drivers.map((driver) => (
                <div key={driver.id} onDoubleClick={() => handleDriverClick(driver)}>
                    <img
                        src={getDriverImage(driver.name)}
                        alt={driver.name}
                        style={{ width: '100%', height: 'auto' }}
                    />
                    <p>Name: {driver.name}</p>
                    <p>Phone: {driver.phone}</p>
                    <p>Email: {driver.email}</p>
                    <p>Vehicle ID: {driver.vehicle_id}</p>
                    {driver.coordinates && (
                        <>
                            <h3>Coordinates</h3>
                            <p>Latitude: {driver.coordinates.latitude}</p>
                            <p>Longitude: {driver.coordinates.longitude}</p>
                        </>
                    )}
                </div>
            ))}
            <h3>Selected Driver</h3>
            {renderDriverDetails(selectedDriver)}

            <h3>Add Vehicle</h3>
            <button onClick={() => addVehicle('van')}>Add Van</button>
            <button onClick={() => addVehicle('truck')}>Add Truck</button>
            <button onClick={() => addVehicle('bike')}>Add Bike</button>
        </div>
    );
};

export default VerticalFrame;
