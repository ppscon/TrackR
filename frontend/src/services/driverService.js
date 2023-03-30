export const fetchDrivers = async () => {
    const response = await fetch('http://localhost:3000/api/drivers'); // Replace with your API Gateway endpoint
    return await response.json();
};


