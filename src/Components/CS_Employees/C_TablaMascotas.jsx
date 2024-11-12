// C_TableMascotas.js
import React, { useEffect, useState } from 'react';
import Btn_Edit from '../CS_General/Buttons/Btn_Edit';
import Btn_Delete from '../CS_General/Buttons/Btn_Delete';
import ModalEdit from "../../Layouts/LS_Employees/ModalEdit";
import ModalEditPet from '../../Layouts/LS_Employees/ModalPet/ModalEditPet';

function C_TableMascotas() {
    const [mascotas, setMascotas] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPetId, setSelectedPetId] = useState(null);

    useEffect(() => {
        fetchPets();
    }, []);

    const fetchPets = () => {
        fetch("http://localhost:8080/api/pets")
            .then(response => {
                if (!response.ok) {
                    throw new Error("Error al obtener las mascotas");
                }
                return response.json();
            })
            .then(data => setMascotas(data))
            .catch(error => console.error("Error:", error));
    };

    const handleDeletePet = (petId) => {
        fetch(`http://localhost:8080/api/pets/${petId}/delete`, {
            method: 'DELETE'
        })
        .then(response => response.text())
        .then(message => {
            alert(message);
            fetchPets();
        })
        .catch(error => console.error("Error al eliminar la mascota:", error));
    };

    const openModal = (petId) => {
        setSelectedPetId(petId);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedPetId(null);
    };

    const calculateAge = (dateNac) => {
        const birthDate = new Date(dateNac);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDifference = today.getMonth() - birthDate.getMonth();
        
        // Ajuste si el mes actual es anterior al mes de nacimiento o es el mismo pero el día es anterior
        if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        
        return age;
    };

    return (
        <div>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">Especie</th>
                        <th scope="col">Raza</th>
                        <th scope="col">Edad</th>
                        <th scope="col">Dueño</th>
                        <th scope="col">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {mascotas.map((mascota) => (
                        <tr key={mascota.idPet}>
                            <td>{mascota.idPet}</td>
                            <td>{mascota.name}</td>
                            <td>{mascota.race.especie.name}</td>
                            <td>{mascota.race.name}</td>
                            <td>{calculateAge(mascota.dateNac)} años</td>
                            <td>{mascota.client.firstName}</td>
                            <td>
                                <div className='flex_button_options'>
                                    <Btn_Edit
                                        nameId={mascota.idPet}
                                        showContent='icon'
                                        onEdit={() => openModal(mascota.idPet)}
                                    />
                                    <Btn_Delete 
                                        nameId={mascota.idPet} 
                                        showContent='icon' 
                                        onDelete={() => handleDeletePet(mascota.idPet)} 
                                    />
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {isModalOpen && (
                <ModalEditPet petId={selectedPetId} onClose={closeModal} />
            )}
        </div>
    );
}

export default C_TableMascotas;
