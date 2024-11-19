import React, { useState, useEffect } from 'react';
import "../../../Layouts/Layouts.css";
import Box_Text_Value from '../../../Components/CS_General/Form Box/Box_Text/Box_Text_Value';
import HiddenInput from '../../../Components/CS_General/Form Box/Box_Text/HiddenInput';
import SelectInput from '../../../Components/CS_General/Form Box/SelectImput/SelectImput';

function ModalNewEmployee({ onClose, onUpdate }) {
    const [employeeData, setEmployeeData] = useState({
        dni: "",
        cmvp: "",
        firstName: "",
        preName: "",
        firstLastName: "",
        secondLastName: "",
        address: "",
        cellphone: "",
        dirImage: "UserFoto.png",
        status: "1",
        email: "",
        password: "",
        rolId: "", // Inicializa vacío para detectar el cambio
    });

    const [roles, setRoles] = useState([]);

    useEffect(() => {
        // Fetch para obtener roles activos
        fetch('http://localhost:8080/api/roles/active')
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Error al obtener los roles.");
                }
                return response.json();
            })
            .then((data) => {
                setRoles(data || []);
                // Establecer el primer rol como predeterminado si no se selecciona otro
                if (data.length > 0) {
                    setEmployeeData((prevData) => ({
                        ...prevData,
                        rolId: data[0].idRol,
                    }));
                }
            })
            .catch((error) => console.error("Error al obtener roles:", error));
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmployeeData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleCreateEmployee = () => {
        // Validar datos requeridos
        if (
            !employeeData.dni ||
            !employeeData.email ||
            !employeeData.password ||
            !employeeData.rolId
        ) {
            alert("Por favor, completa todos los campos requeridos.");
            return;
        }

        const newEmployeeData = {
            user: {
                email: employeeData.email,
                password: employeeData.password,
                status: employeeData.status,
            },
            dni: employeeData.dni,
            cmvp: employeeData.cmvp,
            firstName: employeeData.firstName,
            preName: employeeData.preName,
            firstLastName: employeeData.firstLastName,
            secondLastName: employeeData.secondLastName,
            address: employeeData.address,
            cellphone: employeeData.cellphone,
            dirImage: employeeData.dirImage,
            status: employeeData.status,
            rol: {
                idRol: employeeData.rolId,
            },
        };

        fetch('http://localhost:8080/api/employees/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newEmployeeData),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Error al crear el empleado.");
                }
                return response.json();
            })
            .then(() => {
                alert("Empleado creado exitosamente.");
                onUpdate();
                onClose();
            })
            .catch((error) => {
                console.error("Error al crear el empleado:", error);
                alert("Error al crear el empleado.");
            });
    };

    return (
        <div className="modal">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Nuevo Empleado</h5>
                        <button
                            type="button"
                            className="btn-close"
                            aria-label="Close"
                            onClick={onClose}
                        ></button>
                    </div>
                    <form onSubmit={(e) => { e.preventDefault(); handleCreateEmployee(); }}>
                        <div className="modal-body">
                            <Box_Text_Value
                                Label="DNI"
                                V_Text={employeeData.dni}
                                onChange={handleChange}
                                name="dni"
                                required
                            />
                            <Box_Text_Value
                                Label="CMVP"
                                V_Text={employeeData.cmvp}
                                onChange={handleChange}
                                name="cmvp"
                            />
                            <Box_Text_Value
                                Label="Primer Nombre"
                                V_Text={employeeData.firstName}
                                onChange={handleChange}
                                name="firstName"
                                required
                            />
                            <Box_Text_Value
                                Label="Segundo Nombre"
                                V_Text={employeeData.preName}
                                onChange={handleChange}
                                name="preName"
                            />
                            <Box_Text_Value
                                Label="Primer Apellido"
                                V_Text={employeeData.firstLastName}
                                onChange={handleChange}
                                name="firstLastName"
                                required
                            />
                            <Box_Text_Value
                                Label="Segundo Apellido"
                                V_Text={employeeData.secondLastName}
                                onChange={handleChange}
                                name="secondLastName"
                                required
                            />
                            <Box_Text_Value
                                Label="Dirección"
                                V_Text={employeeData.address}
                                onChange={handleChange}
                                name="address"
                                required
                            />
                            <Box_Text_Value
                                Label="Teléfono"
                                V_Text={employeeData.cellphone}
                                onChange={handleChange}
                                name="cellphone"
                                required
                            />
                            <SelectInput
                                label="Rol"
                                name="rolId"
                                value={employeeData.rolId}
                                onChange={handleChange}
                                options={roles.map((rol) => ({
                                    value: rol.idRol,
                                    label: rol.name,
                                }))}
                                required
                            />
                            <Box_Text_Value
                                Label="Correo Electrónico"
                                V_Text={employeeData.email}
                                onChange={handleChange}
                                name="email"
                                required
                            />
                            <Box_Text_Value
                                Label="Contraseña"
                                V_Text={employeeData.password}
                                onChange={handleChange}
                                name="password"
                                type="password"
                                required
                            />
                            <HiddenInput name="dirImage" value={employeeData.dirImage} />
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
                                Crear Empleado
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ModalNewEmployee;
