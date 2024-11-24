import axios from 'axios';

const API_URL = 'http://localhost:8080/api/metpags';

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
