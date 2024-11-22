import React, { useEffect, useState } from 'react';
import Btn_Edit from '../CS_General/Buttons/Btn_Edit';
import Btn_Delete from '../CS_General/Buttons/Btn_Delete';
import Btn_New from '../CS_General/Buttons/Btn_New';
import Btn_Search from '../CS_General/Buttons/Btn_Search'; 
import Box_Text_Empty from '../CS_General/Form Box/Box_Text/Box_Text_Empty';
import Pagination from '../CS_General/Pagination';
import ModalEdit from '../../Layouts/LS_Employees/ModalEdit';
import ModalNewClient from '../../Layouts/LS_Employees/ModalClient/ModalNewClient';

function C_TableClientes() {
    const [clientes, setClientes] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [filters, setFilters] = useState({
        status: '',
        dni: '',
        name: '',
        lastName: '',
    });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isNewClientModalOpen, setIsNewClientModalOpen] = useState(false);
    const [selectedClientId, setSelectedClientId] = useState(null);

    useEffect(() => {
        fetchClients(currentPage, { status: '1' }); // Por defecto, cargar clientes activos
    }, [currentPage]);

    const fetchClients = (page, customFilters = {}) => {
        const { status, dni, name, lastName } = { ...filters, ...customFilters };

        const queryParams = new URLSearchParams({
            page,
            size: 9,
            ...(status && { status }),
            ...(dni && { dni }),
            ...(name && { name }),
            ...(lastName && { lastName }),
        }).toString();

        fetch(`http://localhost:8080/api/clients/search?${queryParams}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Error al obtener los clientes");
                }
                return response.json();
            })
            .then(data => {
                if (data.content) {
                    setClientes(data.content);
                    setTotalPages(data.totalPages);
                } else {
                    setClientes([]);
                    setTotalPages(0);
                }
            })
            .catch(error => console.error("Error:", error));
    };

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters((prevFilters) => ({
            ...prevFilters,
            [name]: value,
        }));
    };

    const handleSearch = () => {
        setCurrentPage(0);
        fetchClients(0, filters);
    };

    const handleBlockClient = (clientId) => {
        fetch(`http://localhost:8080/api/clients/${clientId}/block`, {
            method: 'PUT',
        })
            .then(() => {
                fetchClients(currentPage, { status: '1' });
            })
            .catch(error => console.error("Error al bloquear el cliente:", error));
    };

    const openEditModal = (clientId) => {
        setSelectedClientId(clientId);
        setIsModalOpen(true);
    };

    const closeEditModal = () => {
        setSelectedClientId(null);
        setIsModalOpen(false);
    };

    const openNewClientModal = () => {
        setIsNewClientModalOpen(true);
    };

    const closeNewClientModal = () => {
        setIsNewClientModalOpen(false);
    };
    const styles = {
        flexButtonOptions: {
            display: 'flex',
            alignItems: 'center',
        },
    };

    return (
        <div>
            {/* Formulario de búsqueda */}
            <form className="row">
                <div className="col">
                    <div className="form-group">
                        <label>Estado:</label>
                        <select
                            name="status"
                            className="input-box"
                            value={filters.status}
                            onChange={handleFilterChange}
                        >
                            <option value="">Todos</option>
                            <option value="1">Activo</option>
                            <option value="0">Bloqueado</option>
                        </select>
                    </div>
                </div>
                <div className="col">
                    <Box_Text_Empty
                        id="dni"
                        Label="DNI"
                        value={filters.dni}
                        onChange={handleFilterChange}
                        name="dni"
                    />
                </div>
                <div className="col">
                    <Box_Text_Empty
                        id="name"
                        Label="Nombre"
                        value={filters.name}
                        onChange={handleFilterChange}
                        name="name"
                    />
                </div>
                <div className="col">
                    <Box_Text_Empty
                        id="lastName"
                        Label="Apellido"
                        value={filters.lastName}
                        onChange={handleFilterChange}
                        name="lastName"
                    />
                </div>
                <div className="col">
                    <Btn_Search
                        nameId="btnSearch"
                        showContent="text+icon"
                        onClick={handleSearch} // Ejecutar búsqueda
                    />
                </div>
            </form>

            {/* Tabla de clientes */}
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>DNI</th>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Teléfono</th>
                        <th>Correo</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {clientes.length > 0 ? (
                        clientes.map((cliente) => (
                            <tr key={cliente.idClient}>
                                <td>{cliente.idClient}</td>
                                <td>{cliente.dni}</td>
                                <td>{cliente.firstName} {cliente.preName}</td>
                                <td>{cliente.firstLastName} {cliente.secondLastName}</td>
                                <td>{cliente.cellphone}</td>
                                <td>{cliente.user ? cliente.user.email : "Sin correo"}</td>
                                <td>{cliente.status === '1' ? "Activo" : "Bloqueado"}</td>
                                <td>
                                    <div className="flex_button_options" style={styles.flexButtonOptions}>
                                        <Btn_Edit
                                            nameId={cliente.idClient}
                                            showContent="icon"
                                            onEdit={() => openEditModal(cliente.idClient)}
                                        />
                                        <Btn_Delete
                                            nameId={cliente.idClient}
                                            showContent="icon"
                                            onDelete={() => handleBlockClient(cliente.idClient)}
                                        />
                                    </div>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="8" className="text-center">
                                No se encontraron clientes.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            {/* Paginación y botón de nuevo cliente */}
            <div className="d-flex justify-content-between align-items-center">
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={(page) => setCurrentPage(page)}
                />
                <Btn_New
                    nameId="btnAddNewClient"
                    showContent="text+icon"
                    onNew={openNewClientModal}
                />
            </div>

            {/* Modal de edición */}
            {isModalOpen && (
                <ModalEdit
                    clientId={selectedClientId}
                    onClose={closeEditModal}
                    onUpdate={() => fetchClients(currentPage)}
                />
            )}

            {/* Modal de nuevo cliente */}
            {isNewClientModalOpen && (
                <ModalNewClient
                    onClose={closeNewClientModal}
                    onUpdate={() => fetchClients(currentPage)}
                />
            )}
        </div>
    );
}

export default C_TableClientes;
