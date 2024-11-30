import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_SERVER_BACK_URL;

const API_URL = `${API_BASE_URL}/api/especies`;

// Search especie by name
export const searchEspecieByName = async (name) => {
    try {
        const response = await axios.get(`${API_URL}/search`, { params: { name } });
        return response.data.content?.[0] || null; // Return first match or null
    } catch (error) {
        console.error("Error al buscar especie:", error);
        throw error;
    }
};
