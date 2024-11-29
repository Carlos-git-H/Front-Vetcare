import axios from 'axios';

// Base URL desde .env
const API_BASE_URL = import.meta.env.VITE_SERVER_BACK_URL;


const API_URL = `${API_BASE_URL}/api/dni`;

//Obtener datos con dni
const apiReniec = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default apiReniec;
