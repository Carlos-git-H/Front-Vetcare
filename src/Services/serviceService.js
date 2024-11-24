import axios from 'axios';

const API_URL = 'http://localhost:8080/api/services'; 

export const searchServicesByName = async (name) => {
    try {
        const response = await axios.get(`${API_URL}/searchName`, {
            params: { name },
        });
        return response.data;
    } catch (error) {
        console.error('Error al buscar servicios por nombre:', error);
        throw error;
    }
};
