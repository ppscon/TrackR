import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import './Map.css';
import markerIcon from '../images/mapbox-icon.png';

const sampleDrivers = [
    {
        id: 1,
        coordinates: [-0.0877, 51.5079],
        dropLocations: [
            [-0.0877, 51.5043],
            [-0.0874, 51.5053],
            [-0.0866, 51.5060],
            [-0.0967, 51.5061],
            [-0.0977, 51.5069],
            [-0.0997, 51.5069],
            [-0.0947, 51.5073],
            [-0.0957, 51.5073],
            [-0.0970, 51.5073],
            [-0.0879, 51.5055],
        ],
        speed: 3000,
    },
    {
        id: 2,
        coordinates: [-0.0877, 51.5099],
        dropLocations: [
            [-0.0878, 51.5059],
            [-0.0879, 51.5062],
            [-0.0957, 51.5079],
            [-0.0967, 51.5079],
            [-0.0967, 51.5089],
            [-0.0977, 51.5084],
            [-0.1017, 51.5083],
            [-0.1037, 51.5081],
            [-0.1057, 51.5080],
            [-0.1067, 51.5081],
        ],
        speed: 5000,
    },
    {
        id: 3,
        coordinates: [-0.0877, 51.5119],
        dropLocations: [
            [-0.0897, 51.5119],
            [-0.0917, 51.5119],
            [-0.0937, 51.5119],
            [-0.0957, 51.5119],
            [-0.0977, 51.5119],
            [-0.0997, 51.5119],
            [-0.1017, 51.5119],
            [-0.1037, 51.5119],
            [-0.1057, 51.5119],
            [-0.1077, 51.5119],
        ],
        speed: 8000,
    },
    {
        id: 4,
        coordinates: [-0.0877, 51.5139],
        dropLocations: [
            [-0.0897, 51.5139],
            [-0.0917, 51.5139],
            [-0.0937, 51.5139],
            [-0.0957, 51.5139],
            [-0.0977, 51.5139],
            [-0.0997, 51.5139],
            [-0.1017, 51.5139],
            [-0.1037, 51.5139],
            [-0.1057, 51.5139],
            [-0.1077, 51.5139],
        ],
        speed: 3000,
    },

];

const Map = ({ setSelectedDriver, selectedDriver }) => {
    const mapContainer = useRef(null);
    const mapRef = useRef(null);

    useEffect(() => {
        mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_API_KEY;

        const map = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [-0.0877, 51.5079],
            zoom: 15,
        });

        mapRef.current = map;

        map.on('load', () => {
            for (const driver of sampleDrivers) {
                const marker = new mapboxgl.Marker({ color: 'red' })
                    .setLngLat(driver.coordinates)
                    .addTo(map);

                const animateMarker = (index) => {
                    if (index >= driver.dropLocations.length) {
                        index = 0;
                    }

                    marker.setLngLat(driver.dropLocations[index]);

                    setTimeout(() => {
                        animateMarker(index + 1);
                    }, driver.speed);
                };

                animateMarker(0);
            }
        });

        return () => {
            map.remove();
        };
    }, []);

    useEffect(() => {
        if (selectedDriver && selectedDriver.coordinates && mapRef.current) {
            mapRef.current.panTo(selectedDriver.coordinates);
        }
    }, [selectedDriver]);

    return <div className="map-container" ref={mapContainer} />;
};

export default Map;