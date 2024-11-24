import axios from "axios";

const API_URL = "http://localhost:8080/api/quotes";

/*------------------------Metodos Generales----------------- */

//crear cita
export const createQuote = async (quote) => {
  try {
      const response = await axios.post(`${API_URL}/create`, quote);
      return response.data; // Devuelve la cita creada
  } catch (error) {
      console.error('Error al crear la cita:', error);
      throw error; // Lanza el error para manejarlo en el componente
  }
};



/*------------------------Metodos Empleado----------------- */

// Obtener citas activas para el calendario del empleado
export const fetchQuotesForCalendar = async () => {
  try {
    const response = await axios.get(`${API_URL}/employee/calendar`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener las citas activas:", error);
    throw error;
  }
};

// Cancelar cita
export const cancelQuote = async (quoteId) => {
  try {
    const response = await axios.put(`${API_URL}/${quoteId}/cancel`);
    return response.data;
  } catch (error) {
    console.error("Error al cancelar la cita:", error);
    throw error;
  }
};

// Confirmar cita
export const confirmQuote = async (quoteId) => {
  try {
    const response = await axios.put(`${API_URL}/${quoteId}/confirm`);
    return response.data;
  } catch (error) {
    console.error("Error al confirmar la cita:", error);
    throw error;
  }
};

// Confirmar pago
export const confirmPayment = async (quoteId) => {
  try {
    const response = await axios.put(`${API_URL}/${quoteId}/confirm-payment`);
    return response.data;
  } catch (error) {
    console.error("Error al confirmar el pago:", error);
    throw error;
  }
};

// Obtener detalles de una cita por ID
export const getQuoteById = async (quoteId) => {
  try {
    const response = await axios.get(`${API_URL}/${quoteId}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener los detalles de la cita:", error);
    throw error;
  }
};


// Obtener total de citas activas
export const getTotalActiveQuotes = async () => {
  try {
    const response = await axios.get(`${API_URL}/active/total`);
    return response.data; // Retorna el total de citas activas
  } catch (error) {
    console.error('Error al obtener el total de citas activas:', error);
    throw error;
  }
};

// Obtener citas activas de hoy
export const getTodayActiveQuotes = async () => {
  try {
    const response = await axios.get(`${API_URL}/active/today`);
    return response.data; // Retorna el total de citas activas de hoy
  } catch (error) {
    console.error('Error al obtener las citas activas de hoy:', error);
    throw error;
  }
};



/*----------------Cliente-------------------------------*/ 

// Obtener citas activas para el calendario del cliente
// Obtener todas las citas activas para el cliente
export const fetchQuotesForClientCalendar = async (clientId) => {
  try {
      const response = await axios.get(`${API_URL}/${clientId}/active`);
      return response.data;
  } catch (error) {
      console.error('Error al obtener citas activas del cliente:', error);
      throw error;
  }
};

// Total de citas activas para un cliente específico
export const getTotalActiveQuotesByClientId = async (clientId) => {
  try {
      const response = await axios.get(`${API_URL}/${clientId}/active/total`);
      return response.data;
  } catch (error) {
      console.error('Error al obtener el total de citas activas:', error);
      throw error;
  }
};

// Total de citas activas de hoy para un cliente específico
export const getTodayActiveQuotesByClientId = async (clientId) => {
  try {
      const response = await axios.get(`${API_URL}/${clientId}/active/hoy`);
      return response.data;
  } catch (error) {
      console.error('Error al obtener las citas activas de hoy:', error);
      throw error;
  }
};