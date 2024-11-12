// C_TableClientes.js
import React, { useEffect, useState } from 'react';
import Btn_Edit from '../CS_General/Buttons/Btn_Edit';
import Btn_Delete from '../CS_General/Buttons/Btn_Delete';
import Btn_Search from '../CS_General/Buttons/Btn_Search';
import Btn_New from '../CS_General/Buttons/Btn_New';
import ModalEdit from "../../Layouts/LS_Employees/ModalEdit";
import ModalNewClient from "../../Layouts/LS_Employees/ModalClient/ModalNewClient";
import Box_Text_Empty from '../CS_General/Form Box/Box_Text/Box_Text_Empty';

function C_TableClientes() {
    const [clientes, setClientes] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isNewClientModalOpen, setIsNewClientModalOpen] = useState(false);
    const [selectedClientId, setSelectedClientId] = useState(null);

    useEffect(() => {
        fetchClients();
    }, []);

    const fetchClients = () => {
        fetch("http://localhost:8080/api/clients")
            .then(response => {
                if (!response.ok) {
                    throw new Error("Error al obtener los clientes");
                }
                return response.json();
            })
            .then(data => setClientes(data))
            .catch(error => console.error("Error:", error));
    };

    const handleBlockClient = (clientId) => {
        fetch(`http://localhost:8080/api/clients/${clientId}/block`, {
            method: 'PUT'
        })
        .then(response => response.text())
        .then(message => {
            alert(message);
            fetchClients();
        })
        .catch(error => console.error("Error al bloquear el cliente:", error));
    };

    const openModal = (clientId) => {
        setSelectedClientId(clientId);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedClientId(null);
    };

    const openNewClientModal = () => {
        setIsNewClientModalOpen(true);
    };

    const closeNewClientModal = () => {
        setIsNewClientModalOpen(false);
    };

    return (
        <div>
            <div className="row">
                <div className="col">
                    <Box_Text_Empty id="name" Label="Nombre" />
                </div>
                <div className="col">
                    <Box_Text_Empty id="dni" Label="DNI" />
                </div>
                <div className="col">
                    <Box_Text_Empty id="lastName" Label="Apellido" />
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <Box_Text_Empty id="lastName" Label="Apellido" />
                </div>
                <div className="col">
                    <Box_Text_Empty id="lastName" Label="Apellido" />
                </div>
                <div className="col">
                    <Btn_Search nameId="buscarcliente" showContent="text+icon" />
                </div>
            </div>

            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">DNI</th>
                        <th scope="col">Nombres</th>
                        <th scope="col">Apellido</th>
                        <th scope="col">Teléfono</th>
                        <th scope="col">Correo</th>
                        <th scope="col">Estado</th>
                        <th scope="col">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {clientes.map((cliente) => (
                        <tr key={cliente.idClient}>
                            <td>{cliente.idClient}</td>
                            <td>{cliente.dni}</td>
                            <td>{cliente.firstName} {cliente.preName}</td>
                            <td>{cliente.firstLastName} {cliente.secondLastName}</td>
                            <td>{cliente.cellphone}</td>
                            <td>{cliente.user ? cliente.user.email : "Sin correo"}</td>
                            <td>
                                {cliente.status === '1' ? "Activo" : cliente.status === '0' ? "Bloqueado" : ""}
                            </td>
                            <td>
                                <div className="flex_button_options">
                                    <Btn_Edit
                                        nameId={cliente.idClient}
                                        showContent="icon"
                                        onEdit={() => openModal(cliente.idClient)}
                                    />
                                    <Btn_Delete 
                                        nameId={cliente.idClient} 
                                        showContent="icon" 
                                        onDelete={() => handleBlockClient(cliente.idClient)} 
                                    />
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {isModalOpen && (
                <ModalEdit clientId={selectedClientId} onClose={closeModal} />
            )}
            {isNewClientModalOpen && (
                <ModalNewClient onClose={closeNewClientModal} />
            )}

            {/* Botón para abrir el modal de nuevo cliente */}
            <Btn_New
                nameId="btnAddNewClient"
                showContent="text+icon"
                onNew={openNewClientModal} // Usando onNew para enlazar la función
            />
        </div>
    );
}

export default C_TableClientes;
