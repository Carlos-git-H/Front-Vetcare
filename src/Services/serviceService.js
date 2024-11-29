import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_SERVER_BACK_URL;
const API_URL = `${API_BASE_URL}/api/services`;

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

// Create new service
export const createService = async (serviceData) => {
  try {
      const response = await axios.post(API_URL, serviceData, {
          headers: { 'Content-Type': 'application/json' },
      });
      return response.data;
  } catch (error) {
      console.error("Error al crear el servicio:", error);
      throw error;
  }
};

// Método para obtener servicios con filtros
export const fetchServices = async ({ filters, currentPage }) => {
  const { name, categoryName, especieName, status } = filters;

  const queryParams = new URLSearchParams({
      page: currentPage,
      size: 9,
      ...(name && { name }),
      ...(categoryName && { categoryName }),
      ...(especieName && { especieName }),
      ...(status && { status }), // Asegura que status se envíe
  }).toString();

  try {
      const response = await axios.get(`${API_URL}/search?${queryParams}`);
      return response.data; // Devuelve los datos de la respuesta
  } catch (error) {
      console.error('Error al obtener los servicios:', error.response || error.message);
      throw error.response?.data || 'Error al obtener los servicios.';
  }
};



// Buscar servicio por nombre
export const searchServiceByName = async (name) => {
    try {
      const response = await axios.get(`${API_URL}/search`, {
        params: { name },
      });
      return response.data.content || [];
    } catch (error) {
      console.error("Error al buscar el servicio:", error.response || error.message);
      throw error.response?.data || "Error al buscar el servicio.";
    }
  };


  // Bloquear un servicio
  export const blockService = async (serviceId) => {
    try {
        const response = await axios.put(`${API_URL}/${serviceId}/block`);
        return response.data;
    } catch (error) {
        console.error('Error al bloquear el servicio (detalles):', error.response);
        throw error;
    }
};

//obtener datos de un servicio por su id
export const getServiceById = async (serviceId) => {
  try {
      const response = await axios.get(`${API_URL}/${serviceId}`);
      return response.data;
  } catch (error) {
      console.error("Error al obtener el servicio:", error);
      throw error;
  }
};

//actualizar servicio
export const updateService = async (serviceId, serviceData) => {
  try {
      const response = await axios.put(`${API_URL}/update/${serviceId}`, serviceData, {
          headers: { "Content-Type": "application/json" },
      });
      return response.data;
  } catch (error) {
      console.error("Error al actualizar el servicio:", error);
      throw error;
  }
};