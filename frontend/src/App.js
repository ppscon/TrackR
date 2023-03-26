import React from 'react';
import Map from './components/Map';
import VerticalFrame from './components/VerticalFrame';
import './App.css';
function App() {
    return (
        <div className="App">
            <div style={{ display: 'flex' }}>
                <VerticalFrame />
                <Map />
            </div>
        </div>
    );
}

export default App;
