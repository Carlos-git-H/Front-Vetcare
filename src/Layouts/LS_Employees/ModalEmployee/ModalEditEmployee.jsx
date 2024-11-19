import React, { useEffect, useState } from 'react';
import "../../../Layouts/Layouts.css";
import Box_Text_Value from '../../../Components/CS_General/Form Box/Box_Text/Box_Text_Value';
import HiddenInput from '../../../Components/CS_General/Form Box/Box_Text/HiddenInput';
import SelectImput from '../../../Components/CS_General/Form Box/SelectImput/SelectImput';

function ModalEditEmployee({ employeeId, onClose, onUpdate }) {
    const [formData, setFormData] = useState({
        dni: '',
        cmvp: '',
        firstName: '',
        preName: '',
        firstLastName: '',
        secondLastName: '',
        address: '',
        cellphone: '',
        dirImage: 'UserFoto.png',
        status: '1',
        rol: { idRol: '' },
        user: { idUser: '' },
    });

    const [roles, setRoles] = useState([]);

    // Fetch employee data and roles when modal opens
    useEffect(() => {
        if (employeeId) {
            fetch(`http://localhost:8080/api/employees/${employeeId}`)
                .then(response => {
                    if (!response.ok) throw new Error('Error al obtener datos del empleado');
                    return response.json();
                })
                .then(data => {
                    setFormData({
                        dni: data.dni,
                        cmvp: data.cmvp,
                        firstName: data.firstName,
                        preName: data.preName,
                        firstLastName: data.firstLastName,
                        secondLastName: data.secondLastName,
                        address: data.address,
                        cellphone: data.cellphone,
                        dirImage: data.dirImage,
                        status: data.status,
                        rol: { idRol: data.rol.idRol },
                        user: { idUser: data.user.idUser },
                    });
                })
                .catch(error => console.error('Error al obtener datos del empleado:', error));
        }

        fetch('http://localhost:8080/api/roles/active')
            .then(response => {
                if (!response.ok) throw new Error('Error al obtener roles');
                return response.json();
            })
            .then(data => {
                setRoles(data || []);
            })
            .catch(error => console.error('Error al obtener roles:', error));
    }, [employeeId]);

    // Handle form changes
    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'rol') {
            setFormData(prevState => ({
                ...prevState,
                rol: { idRol: value },
            }));
        } else {
            setFormData(prevState => ({
                ...prevState,
                [name]: value,
            }));
        }
    };

    // Submit updated data
    const handleSubmit = (e) => {
        e.preventDefault();

        fetch(`http://localhost:8080/api/employees/update/${employeeId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        })
            .then(response => {
                if (!response.ok) throw new Error('Error al actualizar el empleado');
                return response.text();
            })
            .then(() => {
                alert('Empleado actualizado exitosamente');
                onUpdate(); // Refresh the data in the parent component
                onClose();  // Close the modal
            })
            .catch(error => {
                console.error('Error al actualizar el empleado:', error);
                alert('Error al actualizar el empleado');
            });
    };

    return (
        <div className="modal">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Editar Empleado</h5>
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
                                Label="DNI"
                                V_Text={formData.dni}
                                name="dni"
                                onChange={handleChange}
                                required
                            />
                            <Box_Text_Value
                                Label="CMVP"
                                V_Text={formData.cmvp}
                                name="cmvp"
                                onChange={handleChange}
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
                            <SelectImput
                                label="Rol"
                                name="rol"
                                value={formData.rol.idRol}
                                options={roles.map(role => ({
                                    value: role.idRol,
                                    label: role.name,
                                }))}
                                onChange={handleChange}
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
                                    <option value="0">Inactivo</option>
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

export default ModalEditEmployee;
