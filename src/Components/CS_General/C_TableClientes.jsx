import React from 'react'
import Btn_Edit from './Buttons/Btn_Edit';
import Btn_Delete from './Buttons/Btn_Delete';
function C_TableClientes() {
    const clientes = [
        {
            idCliente: 1,
            dni: "11223344",
            primerNombre: "Carlos",
            primerApellido: "Fernández",
            segundoApellido: "Martínez",
            telefono: "987654325",
            correo: "carlos.fernandez@example.com",
            password: "passwordABC",
            estado: 1
        },
        {
            idCliente: 2,
            dni: "22334455",
            primerNombre: "Ana",
            preNombre: "María",
            primerApellido: "Lopez",
            segundoApellido: "Hernández",
            telefono: "987654326",
            correo: "ana.lopez@example.com",
            password: "passwordDEF",
            estado: 1
        },
        {
            idCliente: 3,
            dni: "33445566",
            primerNombre: "Pedro",
            primerApellido: "González",
            segundoApellido: "Rojas",
            telefono: "987654327",
            correo: "pedro.gonzalez@example.com",
            password: "passwordGHI",
            estado: 1
        }
    ];
    
    return (
        <table className="table">
            <thead>
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">DNI</th>
                    <th scope="col">Nombre Completo</th>
                    <th scope="col">Teléfono</th>
                    <th scope="col">Correo</th>
                    <th scope="col">Estado</th>
                    <th scope="col">Acciones</th>
                </tr>
            </thead>
            <tbody>
                {clientes.map((cliente) => (
                    <tr key={cliente.idCliente}>
                        <td>{cliente.idCliente}</td>
                        <td>{cliente.dni}</td>
                        <td>{cliente.primerNombre} {cliente.preNombre || ''} {cliente.primerApellido} {cliente.segundoApellido}</td>
                        <td>{cliente.telefono}</td>
                        <td>{cliente.correo}</td>
                        <td>{cliente.estado}</td>
                        <td>
                            <div className='flex_button_options'>
                                <Btn_Edit nameId={cliente.idCliente} showContent='icon'/>
                                <Btn_Delete nameId={cliente.idCliente} showContent='icon'/>
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default C_TableClientes