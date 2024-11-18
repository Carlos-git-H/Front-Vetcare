import React, { useEffect, useState } from 'react';
import "../../Layouts/Layouts.css";
import Box_Text_Value from '../../Components/CS_General/Form Box/Box_Text/Box_Text_Value';
import HiddenInput from '../../Components/CS_General/Form Box/Box_Text/HiddenInput';

function ModalEdit({ clientId, onClose, onUpdate }) {
    const [formData, setFormData] = useState({
        idClient: '',
        dni: '',
        firstName: '',
        preName: '',
        firstLastName: '',
        secondLastName: '',
        address: '',
        cellphone: '',
        user: null, // Incluye el usuario como un objeto si está presente
        status: '1',
    });

    // Obtiene los datos del cliente cuando el modal se abre
    useEffect(() => {
        if (clientId) {
            fetch(`http://localhost:8080/api/clients/${clientId}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Error al obtener los datos del cliente');
                    }
                    return response.json();
                })
                .then(data => {
                    setFormData({
                        idClient: data.idClient,
                        dni: data.dni,
                        firstName: data.firstName,
                        preName: data.preName,
                        firstLastName: data.firstLastName,
                        secondLastName: data.secondLastName,
                        address: data.address,
                        cellphone: data.cellphone,
                        user: data.user ? { idUser: data.user.idUser } : null, // Mantén el usuario si existe
                        status: data.status,
                    });
                })
                .catch(error => console.error('Error al obtener los datos del cliente:', error));
        }
    }, [clientId]);

    // Maneja los cambios en los inputs
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    // Envía los datos actualizados al backend
    const handleSubmit = (e) => {
        e.preventDefault();
    
        fetch(`http://localhost:8080/api/clients/update/${clientId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
            .then(response => {
                if (response.ok) {
                    return response.text();
                }
                throw new Error('Error al actualizar el cliente');
            })
            .then(() => {
                alert('Cliente actualizado exitosamente');
                onUpdate(); // Refresca la tabla
                onClose();  // Cierra el modal
            })
            .catch(error => {
                console.error('Error al actualizar el cliente:', error);
                alert('Error al actualizar el cliente'); // Muestra un mensaje de error
            });
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
                            <HiddenInput name="idClient" value={formData.idClient} />

                            <Box_Text_Value
                                Label="DNI"
                                V_Text={formData.dni}
                                name="dni"
                                onChange={handleChange}
                                required
                            />
                            <Box_Text_Value
                                Label="Primer Nombre"
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
