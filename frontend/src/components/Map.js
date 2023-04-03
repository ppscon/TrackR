import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import './Map.css';
import axios from 'axios';

const Map = ({ setSelectedDriver, selectedDriver }) => {
    const mapContainer = useRef(null);
    const mapRef = useRef(null);

    useEffect(() => {
        mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_API_KEY;

        const initializeMap = async () => {
            try {
                const res = await axios.get('http://localhost:3002/api/simulated-drivers');
                const driverData = res.data.reduce((acc, drop) => {
                    if (!acc[drop.driver_id]) {
                        acc[drop.driver_id] = {
                            id: drop.driver_id,
                            dropLocations: [],
                        };
                    }
                    acc[drop.driver_id].dropLocations.push([
                        parseFloat(drop.longitude),
                        parseFloat(drop.latitude),
                    ]);
                    return acc;
                }, {});

                const drivers = Object.values(driverData);

                const map = new mapboxgl.Map({
                    container: mapContainer.current,
                    style: 'mapbox://styles/mapbox/streets-v11',
                    center: drivers[0].dropLocations[0],
                    zoom: 15,
                });

                mapRef.current = map;

                map.on('load', () => {
                    for (const driver of drivers) {
                        const marker = new mapboxgl.Marker({ color: 'red' })
                            .setLngLat(driver.dropLocations[10]) // Initialize the marker at the second drop location
                            .addTo(map);

                        const animateMarker = (index) => {
                            if (index >= driver.dropLocations.length) {
                                index = 10;
                            }

                            setTimeout(() => {
                                marker.setLngLat(driver.dropLocations[index]);
                                animateMarker(index + 1);
                            }, 3000); // You can adjust the animation speed here
                        };

                        animateMarker(10); // Start animating from the second drop location
                    }
                });

            } catch (error) {
                console.error('Error fetching driver data:', error);
            }
        };

        initializeMap();

        return () => {
            if (mapRef.current) {
                mapRef.current.remove();
            }
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
