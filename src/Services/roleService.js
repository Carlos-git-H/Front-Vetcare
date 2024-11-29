import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_SERVER_BACK_URL;
const API_URL = `${API_BASE_URL}/api/roles`;

// Obtener roles activos
export const getActiveRoles = async () => {
    try {
        const response = await axios.get(`${API_URL}/active`, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data; // Devuelve los roles activos
    } catch (error) {
        console.error("Error al obtener roles activos:", error.response || error.message);
        throw error.response?.data || "Error al obtener roles activos.";
    }
};
