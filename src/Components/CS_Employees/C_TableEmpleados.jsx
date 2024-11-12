import React, { useState, useEffect } from 'react';
import Btn_Edit from '../CS_General/Buttons/Btn_Edit';
import Btn_Delete from '../CS_General/Buttons/Btn_Delete';
import "./C_Tablas.css";
import ModalEditEmployee from '../../Layouts/LS_Employees/ModalEmployee/ModalEditEmployee';

function C_TableEmpleados() {
    const [empleados, setEmpleados] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);

    useEffect(() => {
        fetchEmployees();
    }, []);

    const fetchEmployees = () => {
        fetch("http://localhost:8080/api/employees")
            .then(response => {
                if (!response.ok) {
                    throw new Error("Error al obtener los empleados");
                }
                return response.json();
            })
            .then(data => setEmpleados(data))
            .catch(error => console.error("Error:", error));
    };

    const handleBlockEmployee = (employeeId) => {
        fetch(`http://localhost:8080/api/employees/${employeeId}/block`, {
            method: "PUT",
        })
            .then(response => {
                if (response.ok) {
                    console.log("Empleado bloqueado exitosamente");
                    fetchEmployees();
                } else {
                    console.error("Error al bloquear al empleado");
                }
            })
            .catch(error => console.error("Error:", error));
    };

    const openModal = (employeeId) => {
        setSelectedEmployeeId(employeeId);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedEmployeeId(null);
    };

    return (
        <div>
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
                    {empleados.map((empleado) => (
                        <tr key={empleado.idEmployee}>
                            <td>{empleado.idEmployee}</td>
                            <td>{empleado.dni}</td>
                            <td>{empleado.firstName} {empleado.preName}</td>
                            <td>{empleado.firstLastName} {empleado.secondLastName}</td>
                            <td>{empleado.cellphone}</td>
                            <td>{empleado.user ? empleado.user.email : "Sin correo"}</td>
                            <td>
                                {empleado.status === '1' ? "Activo" : empleado.status === '0' ? "Bloqueado" : ""}
                            </td>
                            <td>
                                <div className='flex_button_options'>
                                    <Btn_Edit
                                        nameId={empleado.idEmployee}
                                        showContent='icon'
                                        onEdit={() => openModal(empleado.idEmployee)}
                                    />
                                    <Btn_Delete 
                                        nameId={empleado.idEmployee} 
                                        showContent='icon' 
                                        onDelete={() => handleBlockEmployee(empleado.idEmployee)} 
                                    />
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {isModalOpen && (
                <ModalEditEmployee employeeId={selectedEmployeeId} onClose={closeModal} />
            )}
        </div>
    );
}

export default C_TableEmpleados;
