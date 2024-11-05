import React from 'react';

import Btn_Edit from '../CS_General/Buttons/Btn_Edit';
import Btn_Delete from '../CS_General/Buttons/Btn_Delete';

function C_TableServicios() {
    const servicios = [
        {
            idServicio: 1,
            categoriaId: 1,
            nombre: "Consulta general",
            descripcion: "Consulta médica general para mascotas",
            precio: 50,
            estado: 1
        },
        {
            idServicio: 2,
            categoriaId: 1,
            nombre: "Vacunación",
            descripcion: "Vacunación contra enfermedades comunes",
            precio: 30,
            estado: 1
        },
        {
            idServicio: 3,
            categoriaId: 2,
            nombre: "Desparasitación",
            descripcion: "Tratamiento para eliminar parásitos",
            precio: 40,
            estado: 1
        },
        {
            idServicio: 4,
            categoriaId: 2,
            nombre: "Limpieza dental",
            descripcion: "Limpieza de dientes para mascotas",
            precio: 60,
            estado: 1
        }
    ];

    return (
        <table className="table">
            <thead>
                <tr>
                    <th scope="col">ID Servicio</th>
                    <th scope="col">Categoría ID</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">Descripción</th>
                    <th scope="col">Precio</th>
                    <th scope="col">Estado</th>
                    <th scope="col">Acciones</th>
                </tr>
            </thead>
            <tbody>
                {servicios.map((servicio) => (
                    <tr key={servicio.idServicio}>
                        <td>{servicio.idServicio}</td>
                        <td>{servicio.categoriaId}</td>
                        <td>{servicio.nombre}</td>
                        <td>{servicio.descripcion}</td>
                        <td>{servicio.precio}</td>
                        <td>{servicio.estado}</td>
                        <td>
                            <div className='flex_button_options'>
                                <Btn_Edit nameId={servicio.idServicio} showContent='icon' />
                                <Btn_Delete nameId={servicio.idServicio} showContent='icon'/>
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default C_TableServicios;
