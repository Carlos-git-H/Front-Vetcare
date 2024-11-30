import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_SERVER_BACK_URL;
const API_URL = `${API_BASE_URL}/hitOpenaiApi`;// URL del backend

export const hitOpenaiApi = async (prompt) => {
  try {
    const response = await axios.post(API_URL, { prompt }, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data; // Retorna el contenido de la respuesta
  } catch (error) {
    console.error('Error al comunicarse con el backend:', error.response || error.message);
    throw error.response?.data || 'Error al comunicarse con el backend.';
  }
};