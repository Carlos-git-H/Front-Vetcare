import React, { useEffect, useState } from 'react';
import "../CS_Employees/C_FromData_Em/C_FromData_Em.css";
import Box_Text_Bloq from '../CS_General/Form Box/Box_Text/Box_Text_Bloq';

function C_FromData_Cl() {
    const [cliente, setCliente] = useState(null); // Estado para almacenar los datos del cliente

    useEffect(() => {
        // Obtiene el ID y tipo de usuario desde localStorage
        const userId = localStorage.getItem('userId');
        const userType = localStorage.getItem('userType');

        if (!userId || userType !== 'cliente') {
            console.error('Credenciales no válidas o tipo de usuario incorrecto');
            return;
        }

        // Llamada al backend para obtener los datos del cliente
        const fetchCliente = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/clients/${userId}`);
                if (!response.ok) {
                    throw new Error('Error al obtener los datos del cliente');
                }
                const data = await response.json();
                setCliente(data); // Asigna los datos obtenidos al estado
            } catch (error) {
                console.error('Error al obtener los datos del cliente:', error);
            }
        };

        fetchCliente(); // Ejecuta la función
    }, []); // Se ejecuta solo una vez al montar el componente

    if (!cliente) {
        return <p>Cargando datos del cliente...</p>;
    }

    return (
        <div className='contentFromData'>
            <div className='contentData'>
                <div className="row g-3">
                    <div className="col">
                        <Box_Text_Bloq Label={"DNI"} V_Text={cliente.dni} />
                    </div>
                    <div className="col">
                        <Box_Text_Bloq Label={"Primer Nombre"} V_Text={cliente.firstName} />
                    </div>
                    <div className="col">
                        <Box_Text_Bloq Label={"Segundo Nombre"} V_Text={cliente.preName} />
                    </div>
                    <div className="col">
                        <Box_Text_Bloq Label={"Primer Apellido"} V_Text={cliente.firstLastName} />
                    </div>
                </div>
                <div className="row g-3">
                    <div className="col">
                        <Box_Text_Bloq Label={"Segundo Apellido"} V_Text={cliente.secondLastName} />
                    </div>
                    <div className="col">
                        <Box_Text_Bloq Label={"Email"} V_Text={cliente.user.email} />
                    </div>
                    <div className="col">
                        <Box_Text_Bloq Label={"Dirección"} V_Text={cliente.address} />
                    </div>
                </div>
                <div className="row g-3">
                    <div className="col">
                        <Box_Text_Bloq Label={"Teléfono"} V_Text={cliente.cellphone} />
                    </div>
                    <div className="col">
                        <Box_Text_Bloq Label={"Número de Mascotas"}  V_Text={cliente.pets ? cliente.pets.length : 0} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default C_FromData_Cl;
