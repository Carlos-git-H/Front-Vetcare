import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Box_Text_Bloq from '../../CS_General/Form Box/Box_Text/Box_Text_Bloq';
import "./C_FromData_Em.css";

function C_FromData_Em() {
    const { id } = useParams(); // Obtén el ID del empleado desde la URL
    const [empleado, setEmpleado] = useState(null); // Estado para almacenar los datos del empleado

    useEffect(() => {
        // Llamada al backend para obtener los datos del empleado
        const fetchEmpleado = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/employees/${id}`);
                if (!response.ok) {
                    throw new Error('Error al obtener los datos del empleado');
                }
                const data = await response.json();
                setEmpleado(data); // Asigna los datos obtenidos al estado
            } catch (error) {
                console.error('Error al obtener los datos del empleado:', error);
            }
        };

        if (id) {
            fetchEmpleado();
        }
    }, [id]);

    if (!empleado) {
        return <p>Cargando datos del empleado...</p>;
    }

    return (
        <div className='contentFromData'>
            <div className='contentData'>
                <div className="row g-3">
                    <div className="col">
                        <Box_Text_Bloq Label={"DNI"} V_Text={empleado.dni} />
                    </div>
                    <div className="col">
                        <Box_Text_Bloq Label={"Primer Nombre"} V_Text={empleado.firstName} />
                    </div>
                    <div className="col">
                        <Box_Text_Bloq Label={"Segundo Nombre"} V_Text={empleado.preName} />
                    </div>
                    <div className="col">
                        <Box_Text_Bloq Label={"Primer Apellido"} V_Text={empleado.firstLastName} />
                    </div>
                </div>
                <div className="row g-3">
                    <div className="col">
                        <Box_Text_Bloq Label={"Segundo Apellido"} V_Text={empleado.secondLastName} />
                    </div>
                    <div className="col">
                        <Box_Text_Bloq Label={"Email"} V_Text={empleado.user.email} />
                    </div>
                    <div className="col">
                        <Box_Text_Bloq Label={"Dirección"} V_Text={empleado.address} />
                    </div>
                </div>
                <div className="row g-3">
                    <div className="col">
                        <Box_Text_Bloq Label={"Teléfono"} V_Text={empleado.cellphone} />
                    </div>
                    <div className="col">
                        <Box_Text_Bloq Label={"CMVP"} V_Text={empleado.cmvp} />
                    </div>
                    <div className="col">
                        <Box_Text_Bloq Label={"Rol"} V_Text={empleado.rol.name} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default C_FromData_Em;
