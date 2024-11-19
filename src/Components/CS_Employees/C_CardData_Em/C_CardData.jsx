import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import "./C_CardData.css";

function C_CardData() {
    const DirImgs = "../../../../public/Img/"; // Asegúrate de que esta ruta sea correcta para servir imágenes
    const { id } = useParams(); // Obtén el ID desde la URL
    const [dataProfile, setDataProfile] = useState(null);

    useEffect(() => {
        // Realiza la llamada al backend para obtener los datos del perfil
        const fetchProfileData = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/employees/${id}`);
                if (!response.ok) {
                    throw new Error('Error al obtener los datos del empleado');
                }
                const data = await response.json();
                setDataProfile(data); // Asigna los datos obtenidos al estado
            } catch (error) {
                console.error('Error al obtener los datos del perfil:', error);
            }
        };

        if (id) {
            fetchProfileData();
        }
    }, [id]);

    if (!dataProfile) {
        return <p>Cargando datos del perfil...</p>;
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
                    <label className='caracterT'>CMVP: {dataProfile.cmvp}</label>
                </div>
            </div>
        </div>
    );
}

export default C_CardData;
