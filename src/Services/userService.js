import axios from "axios";

// Base URL desde .env
const API_BASE_URL = import.meta.env.VITE_SERVER_BACK_URL;
const API_USER_URL = `${API_BASE_URL}/api/users`;


export const isEmailInUse = async (email) => {
    try {
        const response = await axios.get(`${API_USER_URL}/email-exists`, {
            params: { email },
        });
        return response.data; // true o false
    } catch (error) {
        console.error("Error al verificar el correo:", error.response || error.message);
        throw new Error("Error al verificar el correo.");
    }
};
