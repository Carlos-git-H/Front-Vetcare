import axios from 'axios';


const API_BASE_URL = import.meta.env.VITE_SERVER_BACK_URL;
const API_URL = `${API_BASE_URL}/api/report`;


// Función para generar el reporte
export const generateReport = async (filters) => {
    const sanitizedFilters = Object.fromEntries(
        Object.entries(filters).filter(([_, value]) => value !== '' && value !== null)
    );

    const queryParams = new URLSearchParams(sanitizedFilters).toString();

    try {
        const response = await axios.get(`${API_URL}/generate-report?${queryParams}`, {
        responseType: "blob",
        });
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "reporte-citas.xlsx");
        document.body.appendChild(link);
        link.click();
        link.remove();
    } catch (error) {
        console.error("Error al generar el reporte:", error);
        throw new Error("No se pudo generar el reporte.");
    }
}; 


export const fetchQuotes = async (filters, page = 0, size = 9) => {
    // Elimina valores vacíos del objeto de filtros
    const sanitizedFilters = Object.fromEntries(
        Object.entries(filters).filter(([_, value]) => value !== '' && value !== null)
    );

    const queryParams = new URLSearchParams({
        page,
        size,
        ...sanitizedFilters,
    }).toString();

    try {
        const response = await axios.get(`${API_URL}/search?${queryParams}`);
        return response.data;
    } catch (error) {
        console.error("Error al obtener las citas:", error);
        throw new Error("No se pudo obtener las citas.");
    }
};
