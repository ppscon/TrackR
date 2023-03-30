import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import './Map.css';
import Vehicle from './Vehicle';

const Map = () => {
    const mapContainer = useRef(null);

    useEffect(() => {
        mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_API_KEY;

        const map = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            //London Bridge Coordinates
            center: [-0.0877, 51.5079],
            zoom: 15,
        });

        return () => {
            map.remove();
        };
    }, []);

    return (
        <div className="map-container" ref={mapContainer}>
            <Vehicle id="1" coordinates={{ x: 100, y: 100 }} type="van" />
        </div>
    );
};

export default Map;
