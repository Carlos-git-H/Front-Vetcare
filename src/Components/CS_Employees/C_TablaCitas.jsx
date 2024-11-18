import React, { useEffect, useState } from 'react';
import Btn_Edit from '../CS_General/Buttons/Btn_Edit';
import Btn_Delete from '../CS_General/Buttons/Btn_Delete';
import Btn_New from '../CS_General/Buttons/Btn_New';
import Btn_Search from '../CS_General/Buttons/Btn_Search';
import Pagination from '../CS_General/Pagination';
import Box_Text_Empty from '../CS_General/Form Box/Box_Text/Box_Text_Empty';
import ModalEditQuote from '../../Layouts/LS_Employees/ModalQuote/ModalEditQuote';
import ModelNewQuote from '../../Layouts/LS_Employees/ModalQuote/ModelNewQuote';
import SelectImput from '../CS_General/Form Box/SelectImput/SelectImput';
import DateTimePicker from "../CS_General/Form Box/DateTimePicker/DateTimePicker"
import Btn_Confirm from '../CS_General/Buttons/Btn_Confirm';
import Btn_ConfirmPag from '../CS_General/Buttons/Btn_ConfirmPag';

function C_TablaCitas() {
    const [quotes, setQuotes] = useState([]); // Lista de citas
    const [currentPage, setCurrentPage] = useState(0); // Página actual
    const [totalPages, setTotalPages] = useState(0); // Total de páginas
    const [filters, setFilters] = useState({
        date: '',
        status: '1',
        dni: '',
        serviceName: '',
    });
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isNewModalOpen, setIsNewModalOpen] = useState(false);
    const [selectedQuoteId, setSelectedQuoteId] = useState(null);

    const statusOptions = [
        { value: '', label: 'Todos' },
        { value: '1', label: 'En espera' },
        { value: '0', label: 'Cancelado' },
        { value: '2', label: 'Vencido' },
        { value: '3', label: 'Confirmado' },
    ];

    // Cargar citas al iniciar
    useEffect(() => {
        fetchQuotes(currentPage);
    }, [currentPage]);

    // Obtener citas desde la API
    const fetchQuotes = (page, customFilters = {}) => {
        const { date, status, dni, serviceName } = { ...filters, ...customFilters };
    
        const formattedDate = date ? new Date(date).toISOString().split('T')[0] : ''; // Formato yyyy-MM-dd
    
        const queryParams = new URLSearchParams({
            page,
            size: 9,
            ...(formattedDate && { date: formattedDate }),
            ...(status && { status }),
            ...(dni && { dni }),
            ...(serviceName && { serviceName }),
        }).toString();
    
        fetch(`http://localhost:8080/api/quotes/search?${queryParams}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Error al obtener las citas");
                }
                return response.json();
            })
            .then((data) => {
                setQuotes(data.content || []);
                setTotalPages(data.totalPages || 0);
            })
            .catch((error) => console.error("Error:", error));
    };
    const handleCancelQuote = (quoteId) => {
        fetch(`http://localhost:8080/api/quotes/${quoteId}/cancel`, {
            method: 'PUT',
        })
            .then((response) => {
                if (!response.ok) {
                    return response.text().then((message) => {
                        throw new Error(message);
                    });
                }
                return response.text();
            })
            .then((message) => {
                alert(message); // Muestra el mensaje de éxito
                fetchQuotes(currentPage); // Refresca la tabla
            })
            .catch((error) => {
                alert(`Error: ${error.message}`); // Muestra el mensaje de error
            });
    };
    
    const handleConfirmQuote = (quoteId) => {
        fetch(`http://localhost:8080/api/quotes/${quoteId}/confirm`, {
            method: 'PUT',
        })
            .then((response) => {
                if (!response.ok) {
                    return response.text().then((message) => {
                        throw new Error(message);
                    });
                }
                return response.text();
            })
            .then((message) => {
                alert(message); // Muestra el mensaje de éxito
                fetchQuotes(currentPage); // Refresca la tabla
            })
            .catch((error) => {
                alert(`Error: ${error.message}`); // Muestra el mensaje de error
            });
    };
    
    const handleConfirmPayment = (quoteId) => {
        fetch(`http://localhost:8080/api/quotes/${quoteId}/confirm-payment`, {
            method: 'PUT',
        })
            .then((response) => {
                if (!response.ok) {
                    return response.text().then((message) => {
                        throw new Error(message);
                    });
                }
                return response.text();
            })
            .then((message) => {
                alert(message); // Muestra el mensaje de éxito
                fetchQuotes(currentPage); // Refresca la tabla
            })
            .catch((error) => {
                alert(`Error: ${error.message}`); // Muestra el mensaje de error
            });
    };
    

    // Manejar cambios en los filtros
    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters((prevFilters) => ({
            ...prevFilters,
            [name]: value,
        }));
    };

    // Ejecutar búsqueda
    const handleSearch = (e) => {
        e.preventDefault();
        setCurrentPage(0);
        fetchQuotes(0, filters);
    };
    // Función para formatear la fecha
    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Los meses comienzan desde 0
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    };

    // Función para formatear la hora
    const formatTime = (timeString) => {
        if (!timeString) return '';
        const [hour, minute] = timeString.split(':'); // Dividir la hora y los minutos
        return `${hour}:${minute}`;
    };


 

    const openEditModal = (quoteId) => {
        setSelectedQuoteId(quoteId);
        setIsEditModalOpen(true);
    };

    const closeEditModal = () => {
        setIsEditModalOpen(false);
        setSelectedQuoteId(null);
    };

    const openNewModal = () => {
        setIsNewModalOpen(true);
    };

    const closeNewModal = () => {
        setIsNewModalOpen(false);
    };

    return (
        <div>
            {/* Formulario de búsqueda */}
            <form onSubmit={handleSearch} className="row">
                <div className="col">
                    <DateTimePicker
                        label="Fecha"
                        type="date"
                        name="date"
                        value={filters.date}
                        onChange={handleFilterChange}
                    />
                </div>
                <div className="col">
                    <SelectImput
                        label="Estado"
                        name="status"
                        value={filters.status}
                        options={statusOptions}
                        onChange={handleFilterChange}
                    />
                </div>
                <div className="col">
                    <Box_Text_Empty
                        id="dni"
                        Label="DNI del Dueño"
                        value={filters.dni}
                        onChange={handleFilterChange}
                        name="dni"
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
            </form>

            {/* Tabla de citas */}
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Mascota</th>
                        <th>Dueño</th>
                        <th>Fecha</th>
                        <th>Servicio</th>
                        <th>Hora</th>
                        <th>Met. Pago</th>
                        <th>Estado de Pago</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {quotes.length > 0 ? (
                        quotes.map((quote) => (
                            <tr key={quote.idQuote}>
                                <td>{quote.idQuote}</td>
                                <td>{quote.pet.name}</td>
                                <td>{quote.pet.client.firstName} {quote.pet.client.firstLastName}</td>
                                <td>{formatDate(quote.date)}</td>
                                <td>{quote.service.name}</td>
                                <td>{formatTime(quote.hour)}</td>
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
                                <td>
                                    <div className="d-flex">
                                        <Btn_Edit
                                            nameId={quote.idQuote}
                                            showContent="icon"
                                            onEdit={() => openEditModal(quote.idQuote)}
                                        />
                                        <Btn_Delete
                                            nameId={quote.idQuote}
                                            showContent="icon"
                                            onDelete={() => handleCancelQuote(quote.idQuote)}
                                        />
                                        <Btn_Confirm
                                            nameId={`confirm-${quote.idQuote}`}
                                            showContent="icon"
                                            onClick={() => handleConfirmQuote(quote.idQuote)}
                                        />
                                        <Btn_ConfirmPag
                                            nameId={`confirm-payment-${quote.idQuote}`}
                                            showContent="icon"
                                            onClick={() => handleConfirmPayment(quote.idQuote)}
                                        />
                                    </div>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="8" className="text-center">
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
                <Btn_New
                    nameId="btnAddNewQuote"
                    showContent="text+icon"
                    onNew={openNewModal}
                />
            </div>

            {/* Modales */}
            {isEditModalOpen && (
                <ModalEditQuote
                    quoteId={selectedQuoteId}
                    onClose={closeEditModal}
                    onUpdate={() => fetchQuotes(currentPage)}
                />
            )}
            {isNewModalOpen && (
                <ModelNewQuote
                    onClose={closeNewModal}
                    onUpdate={() => fetchQuotes(currentPage)}
                />
            )}
        </div>
    );
}

export default C_TablaCitas;
