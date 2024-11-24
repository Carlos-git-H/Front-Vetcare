import axios from 'axios';

const API_URL = 'http://localhost:8080/api/pets';

// Obtener el total de mascotas activas
export const getTotalActivePets = async () => {
    try {
        const response = await axios.get(`${API_URL}/active/total`);
        return response.data; // Retorna el total de mascotas activas
    } catch (error) {
        console.error('Error al obtener el total de mascotas activas:', error);
        throw error;
    }
};


//Obtiene las mascotas activas para un cliente específico
export const fetchActivePetsForClient = async (clientId) => {
    try {
        const response = await axios.get(`${API_URL}/${clientId}/active`);
        return response.data; // Devuelve los datos de la respuesta
    } catch (error) {
        console.error('Error al obtener las mascotas activas:', error);
        throw error; // Lanza el error para manejarlo en el componente
    }
};
