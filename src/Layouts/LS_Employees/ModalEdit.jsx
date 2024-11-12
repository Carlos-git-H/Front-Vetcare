import React, { useEffect, useState } from 'react';
import "../../Layouts/Layouts.css";
import Box_Text_Value from '../../Components/CS_General/Form Box/Box_Text/Box_Text_Value';

function ModalEdit({ clientId, onClose }) {
    const [clientData, setClientData] = useState(null);
    const [formData, setFormData] = useState({
        dni: '',
        firstName: '',
        preName: '',
        firstLastName: '',
        secondLastName: '',
        address: '',
        cellphone: '',
        email: '',
        status: '1',
        dirImage: ''
    });

    useEffect(() => {
        if (clientId) {
            fetch(`http://localhost:8080/api/clients/${clientId}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error("Error al obtener los datos del cliente");
                    }
                    return response.json();
                })
                .then(data => {
                    setClientData(data);
                    setFormData({
                        idClient: data.idClient,
                        dni: data.dni,
                        firstName: data.firstName,
                        preName: data.preName,
                        firstLastName: data.firstLastName,
                        secondLastName: data.secondLastName,
                        address: data.address,
                        cellphone: data.cellphone,
                        userId: data.user ? data.user.idUser : '',
                        status: data.status || '1',
                        dirImage: data.dirImage
                    });
                })
                .catch(error => console.error("Error:", error));
        }
    }, [clientId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Datos enviados:", JSON.stringify(formData));

        fetch(`http://localhost:8080/api/clients/update/${clientId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(response => {
            if (response.ok) {
                return response.text();
            }
            throw new Error("Error al actualizar el cliente");
        })
        .then(message => {
            alert(message);
            onClose();
        })
        .catch(error => console.error("Error al actualizar el cliente:", error));
    };

    return (
        <div className="modal">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Editar Cliente</h5>
                        <button
                            type="button"
                            className="btn-close"
                            aria-label="Close"
                            onClick={onClose}
                        ></button>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="modal-body">
                            <Box_Text_Value
                                Label="ID Cliente"
                                V_Text={formData.idClient}
                                readOnly
                            />
                            
                            <Box_Text_Value
                                Label="DNI"
                                V_Text={formData.dni}
                                name="dni"
                                onChange={handleChange}
                                required
                                minLength={8}
                                maxLength={8}
                            />
                            <Box_Text_Value
                                Label="Nombres"
                                V_Text={formData.firstName}
                                name="firstName"
                                onChange={handleChange}
                                required
                            />
                            <Box_Text_Value
                                Label="Segundo Nombre"
                                V_Text={formData.preName}
                                name="preName"
                                onChange={handleChange}
                            />
                            <Box_Text_Value
                                Label="Primer Apellido"
                                V_Text={formData.firstLastName}
                                name="firstLastName"
                                onChange={handleChange}
                                required
                            />
                            <Box_Text_Value
                                Label="Segundo Apellido"
                                V_Text={formData.secondLastName}
                                name="secondLastName"
                                onChange={handleChange}
                                required
                            />
                            <Box_Text_Value
                                Label="Dirección"
                                V_Text={formData.address}
                                name="address"
                                onChange={handleChange}
                                required
                            />
                            <Box_Text_Value
                                Label="Teléfono"
                                V_Text={formData.cellphone}
                                name="cellphone"
                                onChange={handleChange}
                                required
                            />
                            <div className="form-group">
                                <label>Estado:</label>
                                <select 
                                    name="status" 
                                    value={formData.status} 
                                    onChange={handleChange}
                                    className="input-box"
                                >
                                    <option value="1">Activo</option>
                                    <option value="0">Bloqueado</option>
                                </select>
                            </div>
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
                                Guardar Cambios
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ModalEdit;
