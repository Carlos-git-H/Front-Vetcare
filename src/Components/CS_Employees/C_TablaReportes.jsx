import React, { useEffect, useState } from 'react';
import Btn_Search from '../CS_General/Buttons/Btn_Search';
import Pagination from '../CS_General/Pagination';
import Box_Text_Empty from '../CS_General/Form Box/Box_Text/Box_Text_Empty';
import SelectImput from '../CS_General/Form Box/SelectImput/SelectImput';
import DateTimePicker from "../CS_General/Form Box/DateTimePicker/DateTimePicker";
import Btn_Report from '../CS_General/Buttons/Btn_Report';

function C_TablaReportes() {
    const [quotes, setQuotes] = useState([]); // Lista de citas
    const [currentPage, setCurrentPage] = useState(0); // Página actual
    const [totalPages, setTotalPages] = useState(0); // Total de páginas
    const [filters, setFilters] = useState({
        startDate: '',
        endDate: '',
        status: '1',
        statusPag: '', 
        metPag: '',
        species: '',
        serviceName: '',
    });
    const [error, setError] = useState(''); // Estado para manejar mensajes de error

    const statusOptions = [
        { value: '', label: 'Todos' },
        { value: '1', label: 'En espera' },
        { value: '0', label: 'Cancelado' },
        { value: '2', label: 'Vencido' },
        { value: '3', label: 'Confirmado' },
    ];
    const statusPagOptions = [
        { value: '', label: 'Todos' },
        { value: '1', label: 'Pendiente' },
        { value: '2', label: 'Pagado' },
    ];

    useEffect(() => {
        fetchQuotes(currentPage);
    }, [currentPage]);

    const fetchQuotes = (page, customFilters = {}) => {
        const { startDate, endDate, status, statusPag, metPag, species, serviceName } = {
            ...filters,
            ...customFilters,
        };

        const queryParams = new URLSearchParams({
            page,
            size: 9,
            ...(startDate && { startDate }),
            ...(endDate && { endDate }),
            ...(status && { status }),
            ...(metPag && { metPag }),
            ...(species && { species }),
            ...(serviceName && { serviceName }),
            ...(statusPag && { statusPag }),
        }).toString();

        fetch(`http://localhost:8080/api/report/appointments?${queryParams}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Error al obtener las citas");
                }
                return response.json();
            })
            .then((data) => {
                setQuotes(data.content || []);
                setTotalPages(data.totalPages || 0);
                setError(''); // Limpia cualquier error previo
            })
            .catch((error) => {
                console.error("Error:", error);
                setError('Ocurrió un error al obtener las citas.'); // Mensaje de error
            });
    };

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters((prevFilters) => ({
            ...prevFilters,
            [name]: value,
        }));
        setError(''); // Limpia el mensaje de error al cambiar los filtros
    };
    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0'); // Día con dos dígitos
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Mes con dos dígitos (base 0)
        const year = date.getFullYear(); // Año completo
        return `${day}-${month}-${year}`; // Formato dd-mm-yyyy
    };
    

    const handleSearch = (e) => {
        e.preventDefault();

        if (filters.startDate && filters.endDate && filters.endDate < filters.startDate) {
            setError('La fecha final no puede ser menor que la fecha inicial.');
            return; // Detiene la búsqueda si hay un error
        }

        setCurrentPage(0);
        fetchQuotes(0, filters);
    };

    return (
        <div>
            {/* Formulario de búsqueda */}
            <form onSubmit={handleSearch} >
                <div className="row">
                    <div className="col">
                        <DateTimePicker
                            label="Fecha Inicio"
                            type="date"
                            name="startDate"
                            value={filters.startDate}
                            onChange={handleFilterChange}
                        />
                    </div>
                    <div className="col">
                        <DateTimePicker
                            label="Fecha Fin"
                            type="date"
                            name="endDate"
                            value={filters.endDate}
                            onChange={handleFilterChange}
                        />
                    </div>
                    <div className="col">
                        <SelectImput
                            label="Estado de Cita"
                            name="status"
                            value={filters.status}
                            options={statusOptions}
                            onChange={handleFilterChange}
                        />
                    </div>
                    <div className="col">
                        <Box_Text_Empty
                            id="metPag"
                            Label="Método de Pago"
                            value={filters.metPag}
                            onChange={handleFilterChange}
                            name="metPag"
                        />
                    </div>
                </div>
                <div className='row'>
                    <div className="col">
                        <SelectImput
                            label="Estado de Pago"
                            name="statusPag"
                            value={filters.statusPag}
                            options={statusPagOptions}
                            onChange={handleFilterChange}
                        />
                    </div>
                    <div className="col">
                        <Box_Text_Empty
                            id="species"
                            Label="Especie"
                            value={filters.species}
                            onChange={handleFilterChange}
                            name="species"
                        />
                    </div>
                    <div className="col">
                        <Box_Text_Empty
                            id="serviceName"
                            Label="Nombre del Servicio"
                            value={filters.serviceName}
                            onChange={handleFilterChange}
                            name="serviceName"
                        />
                    </div>
                    <div className="col">
                        <Btn_Search
                            nameId="btnSearch"
                            showContent="text+icon"
                            onClick={handleSearch}
                        />
                    </div>
                </div> 
                
            </form>

            {/* Tabla de citas */}
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Mascota</th>
                        <th>Especie</th>
                        <th>Fecha</th>
                        <th>Servicio</th>
                        <th>Met. Pago</th>
                        <th>Estado de Pago</th>
                        <th>Estado</th>
                    </tr>
                </thead>
                <tbody>
                    {quotes.length > 0 ? (
                        quotes.map((quote) => (
                            <tr key={quote.idQuote}>
                                <td>{quote.idQuote}</td>
                                <td>{quote.pet.name}</td>
                                <td>{quote.pet.race.especie.name}</td>
                                <td>{formatDate(quote.date)}</td>
                                <td>{quote.service.name}</td>
                                <td>{quote.metPag.name}</td>
                                <td>
                                    {quote.statusPag === '1'
                                        ? 'Pendiente'
                                        : 'Pagado'}
                                </td>
                                <td>
                                    {quote.status === '1'
                                        ? 'En espera'
                                        : quote.status === '0'
                                        ? 'Cancelado'
                                        : quote.status === '2'
                                        ? 'Vencido'
                                        : 'Confirmado'}
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="9" className="text-center">
                                No se encontraron citas.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            {/* Paginación */}
            <div className="d-flex justify-content-between align-items-center mt-3">
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={(page) => setCurrentPage(page)}
                />

                <Btn_Report nameId={""} showContent='text+icon' />
            </div>
        </div>
    );
}

export default C_TablaReportes;