import React from 'react';
import Btn_Edit from '../CS_General/Buttons/Btn_Edit';
import Btn_Delete from '../CS_General/Buttons/Btn_Delete';
import "./C_Tablas.css"
import Btn_New from '../CS_General/Buttons/Btn_New';

function C_TableEmpleados() {
    const empleados = [
        {
            idEmpleado: 1,
            dni: "12345678",
            primerNombre: "Juan",
            preNombre: "Pérez",
            primerApellido: "Gómez",
            segundoApellido: "",
            cmvp: "CMVP001",
            ubicacion: "Lima",
            telefono: "987654321",
            rolId: 2,
            correo: "juan.perez@example.com",
            password: "password123",
            estado: 1
        },
        {
            idEmpleado: 2,
            dni: "87654321",
            primerNombre: "María",
            preNombre: "Luisa",
            primerApellido: "Ramos",
            segundoApellido: "Pérez",
            cmvp: "CMVP002",
            ubicacion: "Arequipa",
            telefono: "987654322",
            rolId: 3,
            correo: "maria.ramos@example.com",
            password: "password456",
            estado: 1
        },
        {
            idEmpleado: 3,
            dni: "45678912",
            primerNombre: "Carlos",
            preNombre: "Ramírez",
            primerApellido: "Torres",
            segundoApellido: "",
            cmvp: "CMVP003",
            ubicacion: "Cusco",
            telefono: "987654323",
            rolId: 2,
            correo: "carlos.ramirez@example.com",
            password: "password789",
            estado: 1
        }
    ];

    return (
        <table className="table">
            <thead>
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">DNI</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">Apellido</th>
                    <th scope="col">Ubicación</th>
                    <th scope="col">Teléfono</th>
                    <th scope="col">Correo</th>
                    <th scope="col">Rol Id</th>
                    <th scope="col">Estado</th>
                    <th scope='col'>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {empleados.map((empleado) => (
                    <tr key={empleado.idEmpleado}>
                        <td>{empleado.idEmpleado}</td>
                        <td>{empleado.dni}</td>
                        <td>{empleado.primerNombre} {empleado.preNombre}</td>
                        <td>{empleado.primerApellido} {empleado.segundoApellido}</td>
                        <td>{empleado.ubicacion}</td>
                        <td>{empleado.telefono}</td>
                        <td>{empleado.correo}</td>
                        <td>{empleado.rolId}</td>
                        <td>{empleado.estado}</td>
                        <td>
                            <div className='flex_button_options'>
                                <Btn_Edit nameId={empleado.idEmpleado} showContent='icon'/>
                                <Btn_Delete nameId={empleado.idEmpleado} showContent='icon'/>
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
            
        </table>
        
    );
}

export default C_TableEmpleados;
