import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

export const fetchDrivers = async () => {
    try {
        const response = await axios.get(`${API_URL}/drivers`);
        return response.data;
    } catch (error) {
        console.error('Error fetching drivers:', error.message);
        return [];
    }
};

export const fetchDeliveries = async (driverId) => {
    try {
        const response = await axios.get(`${API_URL}/drivers/${driverId}/deliveries`);
        return response.data;
    } catch (error) {
        console.error('Error fetching deliveries:', error.message);
        return [];
    }
};
