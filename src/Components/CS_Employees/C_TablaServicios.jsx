// C_TableServicios.js
import React, { useEffect, useState } from 'react';
import Btn_Edit from '../CS_General/Buttons/Btn_Edit';
import Btn_Delete from '../CS_General/Buttons/Btn_Delete';
import ModalEditService from "../../Layouts/LS_Employees/ModalService/ModalEditService";

function C_TableServicios() {
    const [servicios, setServicios] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedServiceId, setSelectedServiceId] = useState(null);

    useEffect(() => {
        fetchServices();
    }, []);

    const fetchServices = () => {
        fetch("http://localhost:8080/api/services")
            .then(response => {
                if (!response.ok) {
                    throw new Error("Error al obtener los servicios");
                }
                return response.json();
            })
            .then(data => setServicios(data))
            .catch(error => console.error("Error:", error));
    };

    const handleBlockService = (serviceId) => {
        fetch(`http://localhost:8080/api/services/block/${serviceId}`, {
            method: 'PUT'
        })
        .then(response => response.text())
        .then(message => {
            alert(message);
            fetchServices();
        })
        .catch(error => console.error("Error al bloquear el servicio:", error));
    };

    const openModal = (serviceId) => {
        setSelectedServiceId(serviceId);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedServiceId(null);
    };

    return (
        <div>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">Categoria</th>
                        <th scope="col">Descripción</th>
                        <th scope="col">Especie</th>
                        <th scope="col">Precio</th>
                        <th scope="col">Estado</th>
                        <th scope="col">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {servicios.map((servicio) => (
                        <tr key={servicio.idService}>
                            <td>{servicio.idService}</td>
                            <td>{servicio.name}</td>
                            <td>{servicio.category.name}</td>
                            <td>{servicio.description}</td>
                            <td>{servicio.especie.name}</td>
                            <td>S/. {servicio.price}</td>
                            <td>
                                {servicio.status === '1' ? "Activo" : servicio.status === '0' ? "Bloqueado" : ""}
                            </td>
                            <td>
                                <div className='flex_button_options'>
                                    <Btn_Edit
                                        nameId={servicio.idService}
                                        showContent='icon'
                                        onEdit={() => openModal(servicio.idService)}
                                    />
                                    <Btn_Delete 
                                        nameId={servicio.idService} 
                                        showContent='icon' 
                                        onDelete={() => handleBlockService(servicio.idService)} 
                                    />
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {isModalOpen && (
                <ModalEditService serviceId={selectedServiceId} onClose={closeModal} />
            )}
        </div>
    );
}

export default C_TableServicios;
