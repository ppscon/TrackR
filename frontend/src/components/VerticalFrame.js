import React, { useState, useEffect } from 'react';
import './VerticalFrame.css';


const VerticalFrame = ({ addVehicle }) => {
    const [driverDetails, setDriverDetails] = useState({
        name: 'John Doe',
        vehicle: 'Van 1',
    });

    const [coordinates, setCoordinates] = useState({
        latitude: 51.5079,
        longitude: -0.0877,
    });

    const [speed, setSpeed] = useState(50);
    const [currentDrop, setCurrentDrop] = useState(1);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCoordinates({
                latitude: coordinates.latitude + (Math.random() - 0.5) * 0.01,
                longitude: coordinates.longitude + (Math.random() - 0.5) * 0.01,
            });
            setSpeed(speed + (Math.random() - 0.5) * 5);
            setCurrentDrop((currentDrop % 10) + 1);
        }, 5000);

        return () => clearInterval(intervalId);
    }, [coordinates, speed, currentDrop]);

    return (
        <div className="vertical-frame">
            <h2>Driver Details</h2>
            <p>Name: {driverDetails.name}</p>
            <p>Vehicle: {driverDetails.vehicle}</p>
            <h3>Coordinates</h3>
            <p>Latitude: {coordinates.latitude}</p>
            <p>Longitude: {coordinates.longitude}</p>
            <h3>Speed</h3>
            <p>{speed} km/h</p>
            <h3>Current Drop</h3>
            <p>{currentDrop} / 10</p>

            <h3>Add Vehicle</h3>
            <button onClick={() => addVehicle('van')}>Add Van</button>
            <button onClick={() => addVehicle('truck')}>Add Truck</button>
            <button onClick={() => addVehicle('bike')}>Add Bike</button>
        </div>
    );
};

export default VerticalFrame;
