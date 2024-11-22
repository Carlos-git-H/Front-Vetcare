import React, { useEffect, useState } from 'react';
import "../../CS_Employees/C_CardData_Em/C_CardData.css";

function C_CardData_Client() {
    const DirImgs = "/Img/"; 
    const [dataProfile, setDataProfile] = useState(null);

    useEffect(() => {
        const userId = localStorage.getItem('userId'); // Obtiene el ID del usuario del localStorage
        const userType = localStorage.getItem('userType'); // Obtiene el tipo de usuario del localStorage

        // Validar credenciales
        if (!userId || userType !== 'cliente') {
            console.error('Credenciales no válidas o tipo de usuario incorrecto');
            return;
        }

        // Llamada al backend para obtener los datos del perfil del cliente
        const fetchProfileData = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/clients/${userId}`);
                if (!response.ok) {
                    throw new Error('Error al obtener los datos del cliente');
                }
                const data = await response.json();
                setDataProfile(data); // Asigna los datos obtenidos al estado
            } catch (error) {
                console.error('Error al obtener los datos del perfil:', error);
            }
        };

        fetchProfileData(); // Ejecuta la función
    }, []); // Solo se ejecuta una vez al montar el componente

    if (!dataProfile) {
        return <p>Cargando datos del perfil...</p>; // Muestra un mensaje mientras se cargan los datos
    }

    return (
        <div className='container'>
            <div className='preview'>
                <div className='imagenProfile'>
                    <img 
                        className='imagenP' 
                        src={DirImgs + dataProfile.dirImage} 
                        alt="Foto Usuario" 
                    />
                </div>
                <div className='info'>
                    <h4>
                        {dataProfile.firstName + " " + dataProfile.firstLastName}
                    </h4>
                    <label>DNI: {dataProfile.dni}</label>
                </div>
            </div>
        </div>
    );
}

export default C_CardData_Client;
