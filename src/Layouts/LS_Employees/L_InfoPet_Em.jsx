import "../../Layouts/Layouts.css";
import C_Title from '../../Components/CS_General/C_Title/C_Title';
import React, { useEffect, useState } from 'react';
import Box_Text_Bloq from "../../Components/CS_General/Form Box/Box_Text/Box_Text_Bloq";

function L_InfoPet_Em({ idPet }) { // Recibe idPet como argumento
    const [petData, setPetData] = useState(null); // Estado para almacenar los datos de la mascota
    const [error, setError] = useState(null); // Estado para manejar errores

    useEffect(() => {
        if (idPet) {
            fetch(`http://localhost:8080/api/pets/${idPet}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error("Error al obtener los datos de la mascota.");
                    }
                    return response.json();
                })
                .then(data => {
                    setPetData({
                        name: data.name,
                        owner: `${data.client.firstName} ${data.client.firstLastName}`,
                        species: data.race.especie.name,
                        race: data.race.name,
                        sex: data.sex === "M" ? "Macho" : "Hembra",
                        weight: `${data.weight} kg`,
                        age: calculateAge(data.dateNac),
                        clinicalNumber: data.idPet,
                        comments: data.comments,
                    });
                })
                .catch(error => {
                    console.error("Error al obtener los datos de la mascota:", error);
                    setError(error.message);
                });
        }
    }, [idPet]);

    const calculateAge = (birthDate) => {
        const birth = new Date(birthDate);
        const today = new Date();

        const totalDays = Math.floor((today - birth) / (1000 * 60 * 60 * 24));

        if (totalDays < 30) {
            const weeks = Math.floor(totalDays / 7);
            return weeks === 1 ? "1 semana" : `${weeks} semanas`;
        } else if (totalDays < 365) {
            const months = Math.floor(totalDays / 30);
            return months === 1 ? "1 mes" : `${months} meses`;
        } else {
            const years = Math.floor(totalDays / 365);
            return years === 1 ? "1 año" : `${years} años`;
        }
    };

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!petData) {
        return <div>Cargando información de la mascota...</div>;
    }

    return (
        <section className='Layout'>
            <div className='Content_Layout'>
                <C_Title nameTitle={`Mascota: ${petData.name || "Información de Mascota"}`} />
                <div className="row">
                    <div className="col">
                        <Box_Text_Bloq Label={"Dueño"} V_Text={petData.owner} />
                    </div>
                    <div className="col">
                        <Box_Text_Bloq Label={"Especie"} V_Text={petData.species} />
                    </div>
                    <div className="col">
                        <Box_Text_Bloq Label={"Raza"} V_Text={petData.race} />
                    </div>
                    <div className="col">
                        <Box_Text_Bloq Label={"Sexo"} V_Text={petData.sex} />
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <Box_Text_Bloq Label={"Peso"} V_Text={petData.weight} />
                    </div>
                    <div className="col">
                        <Box_Text_Bloq Label={"Edad"} V_Text={petData.age} />
                    </div>
                    <div className="col">
                        <Box_Text_Bloq Label={"Nro Clinico"} V_Text={petData.clinicalNumber} />
                    </div>
                </div>
                <div>
                    <p>Comentarios: {petData.comments}</p>
                </div>
            </div>
        </section>
    );
}

export default L_InfoPet_Em;
