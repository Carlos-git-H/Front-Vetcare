import React, { useState } from 'react';
import "../../../Layouts/Layouts.css";
import Box_Text_Value from '../../../Components/CS_General/Form Box/Box_Text/Box_Text_Value';

function ModalNewClient({ onClose }) {
    const [clientData, setClientData] = useState({
        dni: "",
        firstName: "",
        preName: "",
        firstLastName: "",
        secondLastName: "",
        address: "",
        cellphone: "",
        dirImage: "UserFoto.png",
        status: "1",
        email: "",
        password: ""
    });

    const [withUser, setWithUser] = useState(false); // Nuevo estado para controlar si mostrar campos de usuario

    const handleChange = (e) => {
        const { name, value } = e.target;
        setClientData(prevData => ({ ...prevData, [name]: value }));
    };

    const handleCreateClient = () => {
        let user = null; // Valor por defecto para user

        if (withUser) {
            // Si 'withUser' es true, entonces incluir el usuario
            user = {
                email: clientData.email,
                password: clientData.password,
                status: clientData.status
            };
        }

        const newClientData = {
            user: user, // Pasar user como null si no se selecciona
            dni: clientData.dni,
            firstName: clientData.firstName,
            preName: clientData.preName,
            firstLastName: clientData.firstLastName,
            secondLastName: clientData.secondLastName,
            address: clientData.address,
            cellphone: clientData.cellphone,
            dirImage: clientData.dirImage,
            status: clientData.status // Aquí mantenemos el estado, aunque podría ser null
        };

        fetch('http://localhost:8080/api/clients', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newClientData),
        })
        .then(response => response.json())
        .then(data => {
            alert("Cliente creado exitosamente!");
            onClose();
        })
        .catch(error => console.error("Error al crear el cliente:", error));
    };

    return (
        <div className="modal">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Nuevo Cliente</h5>
                        <button
                            type="button"
                            className="btn-close"
                            aria-label="Close"
                            onClick={onClose}
                        ></button>
                    </div>
                    <form onSubmit={(e) => { e.preventDefault(); handleCreateClient(); }}>
                        <div className="modal-body">
                            <Box_Text_Value
                                Label="DNI"
                                V_Text={clientData.dni}
                                onChange={handleChange}
                                name="dni"
                            />
                            <Box_Text_Value
                                Label="Primer Nombre"
                                V_Text={clientData.firstName}
                                onChange={handleChange}
                                name="firstName"
                            />
                            <Box_Text_Value
                                Label="Segundo Nombre"
                                V_Text={clientData.preName}
                                onChange={handleChange}
                                name="preName"
                            />
                            <Box_Text_Value
                                Label="Primer Apellido"
                                V_Text={clientData.firstLastName}
                                onChange={handleChange}
                                name="firstLastName"
                            />
                            <Box_Text_Value
                                Label="Segundo Apellido"
                                V_Text={clientData.secondLastName}
                                onChange={handleChange}
                                name="secondLastName"
                            />
                            <Box_Text_Value
                                Label="Dirección"
                                V_Text={clientData.address}
                                onChange={handleChange}
                                name="address"
                            />
                            <Box_Text_Value
                                Label="Celular"
                                V_Text={clientData.cellphone}
                                onChange={handleChange}
                                name="cellphone"
                            />
                            <Box_Text_Value
                                Label="Imagen"
                                V_Text={clientData.dirImage}
                                onChange={handleChange}
                                name="dirImage"
                            />

                            {/* Aquí solo mostramos los campos de usuario si 'withUser' es true */}
                            {withUser && (
                                <>
                                    <Box_Text_Value
                                        Label="Correo Electrónico"
                                        V_Text={clientData.email}
                                        onChange={handleChange}
                                        name="email"
                                    />
                                    <Box_Text_Value
                                        Label="Contraseña"
                                        V_Text={clientData.password}
                                        onChange={handleChange}
                                        name="password"
                                        type="password"
                                    />
                                    <div className="form-group">
                                        <label>Estado:</label>
                                        <select
                                            name="status"
                                            value={clientData.status}
                                            onChange={handleChange}
                                            className="input-box"
                                        >
                                            <option value="1">Activo</option>
                                            <option value="0">Bloqueado</option>
                                        </select>
                                    </div>
                                </>
                            )}

                            {/* Botón para alternar la visibilidad de los campos de usuario */}
                            <button
                                type="button"
                                className="btn btn-info"
                                onClick={() => setWithUser(!withUser)}
                            >
                                {withUser ? "Sin Usuario" : "Con Usuario"}
                            </button>
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={onClose}
                            >
                                Cancelar
                            </button>
                            <button type="submit" className="btn btn-primary">
                                Crear Cliente
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ModalNewClient;
