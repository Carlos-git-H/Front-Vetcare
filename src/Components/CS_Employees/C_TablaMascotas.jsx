import React from 'react';
import Btn_Edit from '../CS_General/Buttons/Btn_Edit';
import Btn_Delete from '../CS_General/Buttons/Btn_Delete';

function C_TableMascotas() {
    const mascotas = [
        {
            idMascota: 1,
            clienteId: 1,
            nombre: "Max",
            razaId: 1,
            sexo: "M",
            peso: 20.5,
            fechaNac: "2020-06-01",
            comentario: "Es muy activo",
            estado: 1
        },
        {
            idMascota: 2,
            clienteId: 2,
            nombre: "Luna",
            razaId: 3,
            sexo: "F",
            peso: 4.2,
            fechaNac: "2021-03-15",
            comentario: "Le gusta dormir",
            estado: 1
        },
        {
            idMascota: 3,
            clienteId: 3,
            nombre: "Bobby",
            razaId: 2,
            sexo: "M",
            peso: 22,
            fechaNac: "2019-08-20",
            comentario: "Tiene mucha energía",
            estado: 1
        }
    ];

    return (
        <table className="table">
            <thead>
                <tr>
                    <th scope="col">ID Mascota</th>
                    <th scope="col">ID Cliente</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">Raza ID</th>
                    <th scope="col">Sexo</th>
                    <th scope="col">Peso (kg)</th>
                    <th scope="col">Fecha de Nacimiento</th>
                    <th scope="col">Comentario</th>
                    <th scope="col">Estado</th>
                    <th scope="col">Acciones</th>
                </tr>
            </thead>
            <tbody>
                {mascotas.map((mascota) => (
                    <tr key={mascota.idMascota}>
                        <td>{mascota.idMascota}</td>
                        <td>{mascota.clienteId}</td>
                        <td>{mascota.nombre}</td>
                        <td>{mascota.razaId}</td>
                        <td>{mascota.sexo}</td>
                        <td>{mascota.peso}</td>
                        <td>{mascota.fechaNac}</td>
                        <td>{mascota.comentario}</td>
                        <td>{mascota.estado}</td>
                        <td>
                            <div className='flex_button_options'>
                                <Btn_Edit nameId={mascota.idMascota} showContent='icon'/>
                                <Btn_Delete nameId={mascota.idMascota} showContent='icon'/>
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default C_TableMascotas;
