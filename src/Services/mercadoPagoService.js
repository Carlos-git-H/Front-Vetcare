import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_SERVER_BACK_URL;
const API_URL = `${API_BASE_URL}/api/mp`;

export const createPreference = async (userBuyer) => {
    try {
        const response = await axios.post(API_URL, userBuyer);
        return response.data; // Devuelve el ID de la preferencia
    } catch (error) {
        console.error('Error al crear la preferencia:', error);
        throw error;
    }
};
