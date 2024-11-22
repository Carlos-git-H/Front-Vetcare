import axios from 'axios';

const API_URL = 'http://localhost:8080/api/mp'; 

export const createPreference = async (userBuyer) => {
    try {
        const response = await axios.post(API_URL, userBuyer);
        return response.data; // Devuelve el ID de la preferencia
    } catch (error) {
        console.error('Error al crear la preferencia:', error);
        throw error;
    }
};
