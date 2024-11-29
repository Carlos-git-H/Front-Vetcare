import axios from 'axios';

// Asegúrate de definir API_BASE_URL antes de usarla
const API_BASE_URL = import.meta.env.VITE_SERVER_BACK_URL;

const API_URL = `${API_BASE_URL}/api/metpags`;

// Método para obtener métodos de pago activos
export const fetchActivePaymentMethods = async () => {
    try {
        const response = await axios.get(`${API_URL}/active`);
        return response.data;
    } catch (error) {
        console.error('Error al obtener métodos de pago activos:', error);
        throw error;
    }
};

