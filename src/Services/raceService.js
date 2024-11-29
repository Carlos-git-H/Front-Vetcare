import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_SERVER_BACK_URL;
const API_URL_RACE = `${API_BASE_URL}/api/races`;

// Buscar raza por nombre
export const searchRaceByName = async (name) => {
    try {
        const response = await axios.get(`${API_URL_RACE}/search`, {
            params: { name },
        });
        return response.data; // Retorna los datos de la API
    } catch (error) {
        console.error("Error al buscar raza:", error.response || error.message);
        throw error.response?.data || "Error al buscar raza.";
    }
};