import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import './Map.css';
import Vehicle from './Vehicle';

const Map = ({ drivers = [], setSelectedDriver }) => {
    const mapContainer = useRef(null);
    const mapRef = useRef(null);

    useEffect(() => {
        mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_API_KEY;

        const map = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            // London Bridge Coordinates
            center: [-0.0877, 51.5079],
            zoom: 15,
        });

        mapRef.current = map;

        map.on('load', () => {
            map.addSource('drivers', {
                type: 'geojson',
                data: {
                    type: 'FeatureCollection',
                    features: [],
                },
            });

            map.addLayer({
                id: 'drivers',
                type: 'circle',
                source: 'drivers',
                paint: {
                    'circle-radius': 6,
                    'circle-color': '#B42222',
                },
            });

            // Add drivers markers
            const updateMarkers = () => {
                const features = drivers
                    .filter(
                        (driver) =>
                            driver.coordinates &&
                            driver.coordinates.latitude &&
                            driver.coordinates.longitude
                    )
                    .map((driver) => {
                        return {
                            type: 'Feature',
                            properties: {
                                driverId: driver.id,
                            },
                            geometry: {
                                type: 'Point',
                                coordinates: [
                                    driver.coordinates.longitude,
                                    driver.coordinates.latitude,
                                ],
                            },
                        };
                    });

                console.log('Driver features:', features);

                map.getSource('drivers').setData({
                    type: 'FeatureCollection',
                    features,
                });
            };

            updateMarkers();
        });

        map.on('click', 'drivers', (e) => {
            const driverId = e.features[0].properties.driverId;
            const driver = drivers.find((driver) => driver.id === driverId);
            setSelectedDriver(driver);
        });

        return () => {
            map.remove();
        };
    }, [drivers, setSelectedDriver]);

    return (
        <div className="map-container" ref={mapContainer}>
            <Vehicle id="1" coordinates={{ x: 100, y: 100 }} type="van" />
        </div>
    );
};

export default Map;
