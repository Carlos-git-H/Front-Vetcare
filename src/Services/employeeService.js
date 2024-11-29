import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_SERVER_BACK_URL;

const API_URL = `${API_BASE_URL}/api/employees`;

// Buscar empleados con filtros
export const searchEmployees = async (filters, page = 0, size = 9) => {
    try {
        const validFilters = Object.fromEntries(
            Object.entries(filters).filter(([_, value]) => value !== "" && value !== null)
        );

        const response = await axios.get(`${API_URL}/search`, {
            params: {
                ...validFilters,
                page,
                size,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error al buscar empleados:", error.response || error.message);
        throw error.response?.data || "Error al buscar empleados.";
    }
};

// Bloquear empleado por ID
export const blockEmployee = async (employeeId) => {
    try {
        const response = await axios.put(`${API_URL}/${employeeId}/block`);
        return response.data;
    } catch (error) {
        console.error("Error al bloquear el empleado:", error.response || error.message);
        throw error.response?.data || "Error al bloquear empleado.";
    }
};


// Crear empleado
export const createEmployee = async (employeeData) => {
    try {
        const response = await axios.post(`${API_URL}/create`, employeeData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data; // Devuelve la respuesta del servidor
    } catch (error) {
        console.error("Error al crear empleado:", error.response || error.message);
        throw error.response?.data || "Error al crear empleado.";
    }
};

// Verificar si un DNI ya está registrado
export const isDniInUse = async (dni) => {
    try {
        const response = await axios.get(`${API_URL}/dni-exists`, {
            params: { dni },
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data; // Devuelve true si el DNI está en uso, false si no
    } catch (error) {
        console.error("Error al verificar el DNI:", error.response || error.message);
        throw error.response?.data || "Error al verificar el DNI.";
    }
};


// Obtener los datos de un empleado por ID
export const getEmployeeById = async (employeeId) => {
    try {
        const response = await axios.get(`${API_URL}/${employeeId}`);
        return response.data; // Devuelve los datos del empleado
    } catch (error) {
        console.error("Error al obtener los datos del empleado:", error.response || error.message);
        throw error.response?.data || "Error al obtener los datos del empleado.";
    }
};

// Actualizar los datos de un empleado por ID
export const updateEmployee = async (employeeId, updatedData) => {
    try {
        const response = await axios.put(`${API_URL}/update/${employeeId}`, updatedData, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        return response.data; // Devuelve la respuesta del servidor
    } catch (error) {
        console.error("Error al actualizar el empleado:", error.response || error.message);
        throw error.response?.data || "Error al actualizar el empleado.";
    }
};


// Validar si el celular ya está registrado
export const isCellphoneInUse = async (cellphone) => {
    try {
        const response = await axios.get(`${API_URL}/cellphone-exists`, {
            params: { cellphone },
        });
        return response.data; // Retorna true si el celular ya está en uso
    } catch (error) {
        console.error("Error al verificar el número de celular:", error.response || error.message);
        throw new Error("Error al verificar el número de celular.");
    }
};

// Validar si el CMVP ya está registrado
export const isCmvpInUse = async (cmvp) => {
    try {
        const response = await axios.get(`${API_URL}/cmvp-exists`, {
            params: { cmvp },
        });
        return response.data; // Retorna true si el CMVP ya está en uso
    } catch (error) {
        console.error("Error al verificar el CMVP:", error.response || error.message);
        throw new Error("Error al verificar el CMVP.");
    }
};
//PARA ACTUALIZAR


// Validar si un número de celular está en uso excluyendo un ID específico
export const isCellphoneInUseUpdate = async (cellphone, id) => {
    try {
        const response = await axios.get(`${API_URL}/update/cellphone-exists`, {
            params: { cellphone, id },
        });
        return response.data; // Retorna true si está en uso, false si no
    } catch (error) {
        console.error("Error al verificar el número de celular:", error);
        throw error;
    }
};

// Validar si un CMVP está en uso excluyendo un ID específico
export const isCmvpInUseUpdate = async (cmvp, id) => {
    try {
        const response = await axios.get(`${API_URL}/update/cmvp-exists`, {
            params: { cmvp, id },
        });
        return response.data; // Retorna true si está en uso, false si no
    } catch (error) {
        console.error("Error al verificar el CMVP:", error);
        throw error;
    }
};