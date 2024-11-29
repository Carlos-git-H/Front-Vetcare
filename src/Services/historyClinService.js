import axios from "axios";

// URL base definida desde las variables de entorno
const API_BASE_URL = import.meta.env.VITE_SERVER_BACK_URL;

// URL base específica para historial clínico
const API_URL = `${API_BASE_URL}/api/pet-clinical-history`;


// Obtener historial clínico de una mascota con paginación
export const fetchHistoryByPet = async (petId, page = 0, size = 6) => {
  try {
    const response = await axios.get(`${API_URL}/${petId}`, {
      params: { page, size },
    });
    return response.data; 
  } catch (error) {
    console.error("Error al obtener el historial clínico:", error.response || error.message);
    throw error.response?.data || "Error al obtener el historial clínico.";
  }
};


// Bloquear (eliminar lógicamente) un historial clínico
export const blockHistory = async (historyId) => {
  try {
    const response = await axios.put(`${API_URL}/${historyId}/block`);
    return response.data; 
  } catch (error) {
    console.error("Error al bloquear el historial clínico:", error.response || error.message);
    throw error.response?.data || "Error al bloquear el historial clínico.";
  }
};


// Crear un nuevo historial clínico
export const createClinicalHistory = async (historyData) => {
    try {
      const response = await axios.post(API_URL_HISTORY, historyData, {
        headers: { "Content-Type": "application/json" },
      });
      return response.data;
    } catch (error) {
      console.error("Error al crear el historial clínico:", error.response || error.message);
      throw error.response?.data || "Error al crear el historial clínico.";
    }
  };



// Obtener un historial clínico por ID
export const getClinicalHistoryById = async (id) => {
    try {
      const response = await axios.get(`${API_URL}/search/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error al obtener el historial clínico:", error.response || error.message);
      throw error.response?.data || "Error al obtener el historial clínico.";
    }
  };
  
  // Actualizar un historial clínico
  export const updateClinicalHistory = async (id, historyData) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, historyData, {
        headers: { "Content-Type": "application/json" },
      });
      return response.data;
    } catch (error) {
      console.error("Error al actualizar el historial clínico:", error.response || error.message);
      throw error.response?.data || "Error al actualizar el historial clínico.";
    }
  };