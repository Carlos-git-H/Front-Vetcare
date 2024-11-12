import React, { useEffect, useState } from 'react';
import "../../../Layouts/Layouts.css";

function ModalEditEmployee({ employeeId, onClose }) {
    const [employeeData, setEmployeeData] = useState(null);
    const [formData, setFormData] = useState({
        dni: '',
        firstName: '',
        preName: '',
        firstLastName: '',
        secondLastName: '',
        address: '',
        cellphone: '',
        email: '',
        status: '1', // 1 por defecto para "Activo"
        dirImage: ''
    });

    useEffect(() => {
        if (employeeId) {
            fetch(`http://localhost:8080/api/employees/${employeeId}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error("Error al obtener los datos del empleado");
                    }
                    return response.json();
                })
                .then(data => {
                    setEmployeeData(data);
                    setFormData({
                        idEmployee: data.idEmployee,
                        dni: data.dni,
                        firstName: data.firstName,
                        preName: data.preName,
                        firstLastName: data.firstLastName,
                        secondLastName: data.secondLastName,
                        address: data.address,
                        cmvp: data.cmvp,
                        cellphone: data.cellphone,
                        userId: data.user ? data.user.idUser : '',
                        rolId: data.rol ? data.rol.idRol : '',
                        status: data.status || '1',
                        dirImage: data.dirImage
                    });
                })
                .catch(error => console.error("Error:", error));
        }
    }, [employeeId]);

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

        fetch(`http://localhost:8080/api/employees/update/${employeeId}`, {
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
            throw new Error("Error al actualizar el empleado");
        })
        .then(message => {
            alert(message);
            onClose();
        })
        .catch(error => console.error("Error al actualizar el empleado:", error));
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

                            <label>ID:</label>
                            <input type="text" value={employeeId} readOnly />
                            <br />

                            <label>User ID:</label>
                            <input type="text" value={formData.userId} readOnly />
                            <br />

                            <label>Rol ID:</label>
                            <input type="text" value={formData.rolId} readOnly />
                            <br />

                            <label>cmvp:</label>
                            <input type="text" value={formData.cmvp} readOnly />
                            <br />

                            <label>Imagen:</label>
                            <input type="text" name="dirImage" value={formData.dirImage} onChange={handleChange} />
                            <br />

                            <label>DNI:</label>
                            <input 
                                type="text" 
                                name="dni" 
                                required
                                minLength={8}
                                maxLength={8}
                                value={formData.dni} 
                                onChange={handleChange} 
                            />
                            <br />

                            <label>Nombres:</label>
                            <input 
                                type="text" 
                                name="firstName" 
                                required
                                value={formData.firstName} 
                                onChange={handleChange} 
                            />
                            <br />

                            <label>Segundo Nombre:</label>
                            <input 
                                type="text" 
                                name="preName" 
                                value={formData.preName} 
                                onChange={handleChange} 
                            />
                            <br />

                            <label>Primer Apellido:</label>
                            <input 
                                type="text" 
                                name="firstLastName" 
                                required
                                value={formData.firstLastName} 
                                onChange={handleChange} 
                            />
                            <br />

                            <label>Segundo Apellido:</label>
                            <input 
                                type="text" 
                                name="secondLastName" 
                                required
                                value={formData.secondLastName} 
                                onChange={handleChange} 
                            />
                            <br />

                            <label>Dirección:</label>
                            <input 
                                type="text" 
                                name="address" 
                                required
                                value={formData.address} 
                                onChange={handleChange} 
                            />
                            <br />

                            <label>Teléfono:</label>
                            <input 
                                type="text" 
                                name="cellphone" 
                                value={formData.cellphone} 
                                onChange={handleChange} 
                                required
                            />
                            <br />

                            <label>Estado:</label>
                            <select 
                                name="status" 
                                value={formData.status} 
                                onChange={handleChange}
                            >
                                <option value="1">Activo</option>
                                <option value="0">Bloqueado</option>
                            </select>
                            
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
  )
}

export default ModalEditEmployee