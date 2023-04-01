import React, { useState, useEffect } from 'react';
import Map from './components/Map';
import VerticalFrame from './components/VerticalFrame';
import './App.css';
import { fetchDrivers } from './services/driverService';

function App() {
    const [selectedDriver, setSelectedDriver] = useState(null);
    const [drivers, setDrivers] = useState([]);

    useEffect(() => {
        fetchDrivers().then((data) => {
            console.log("Fetched drivers data:", data); // Add this line to log the fetched data
            if (Array.isArray(data)) {
                setDrivers(data);
            } else {
                console.error('Unexpected data format. Expected an array of drivers.');
            }
        });
    }, []);

    return (
        <div className="App">
            <div style={{ display: 'flex' }}>
                <VerticalFrame drivers={drivers} setSelectedDriver={setSelectedDriver} />
                <Map drivers={drivers} selectedDriver={selectedDriver} setSelectedDriver={setSelectedDriver} />
            </div>
        </div>
    );
}

export default App;

