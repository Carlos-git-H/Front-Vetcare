import React, { useState } from 'react';
import "../../../Layouts/Layouts.css";
import Box_Text_Value from '../../../Components/CS_General/Form Box/Box_Text/Box_Text_Value';
import HiddenInput from '../../../Components/CS_General/Form Box/Box_Text/HiddenInput';

function ModalNewPet({ onClose, onUpdate }) {
    const [petData, setPetData] = useState({
        name: '',
        raceId: '',
        sex: '',
        weight: '',
        dateNac: '',
        comments: '',
        dniClient: '',
        clientId: '',
        dirImage: 'PetFoto.png',
        status: '1',
    });

    const [clientData, setClientData] = useState(null); // Datos del cliente encontrado
    const [clientError, setClientError] = useState(null); // Error al buscar cliente
    const [raceData, setRaceData] = useState(null); // Datos de la raza encontrada
    const [raceError, setRaceError] = useState(null); // Error al buscar raza

    // Maneja cambios en los campos del formulario
    const handleChange = (e) => {
        const { name, value } = e.target;
        setPetData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    // Busca cliente por DNI
    const handleFindClient = () => {
        if (!petData.dniClient) {
            setClientError("Por favor, ingrese un DNI válido.");
            return;
        }

        fetch(`http://localhost:8080/api/clients/search?dni=${petData.dniClient}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Error al buscar el cliente.");
                }
                return response.json();
            })
            .then(data => {
                if (data.content && data.content.length > 0) {
                    const client = data.content[0];
                    setPetData((prevState) => ({
                        ...prevState,
                        clientId: client.idClient,
                    }));
                    setClientData({
                        name: client.firstName,
                        lastName: client.firstLastName,
                    });
                    setClientError(null); // Limpiar errores
                } else {
                    setClientError("No se encontró un cliente con el DNI proporcionado.");
                    setClientData(null); // Limpiar datos del cliente
                }
            })
            .catch(error => {
                console.error("Error:", error);
                setClientError("Ocurrió un error al buscar el cliente.");
                setClientData(null); // Limpiar datos del cliente
            });
    };

    // Busca raza por nombre
    const handleFindRace = () => {
        if (!petData.raceName) {
            setRaceError("Por favor, ingrese un nombre de raza válido.");
            return;
        }

        fetch(`http://localhost:8080/api/races/search?name=${petData.raceName}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Error al buscar la raza.");
                }
                return response.json();
            })
            .then(data => {
                if (data.content && data.content.length > 0) {
                    const race = data.content[0];
                    setPetData((prevState) => ({
                        ...prevState,
                        raceId: race.idRace,
                    }));
                    setRaceData({ name: race.name });
                    setRaceError(null); // Limpiar errores
                } else {
                    setRaceError("No se encontró una raza con el nombre proporcionado.");
                    setRaceData(null); // Limpiar datos de la raza
                }
            })
            .catch(error => {
                console.error("Error:", error);
                setRaceError("Ocurrió un error al buscar la raza.");
                setRaceData(null); // Limpiar datos de la raza
            });
    };

    // Maneja el envío del formulario para crear una nueva mascota
    const handleCreatePet = (e) => {
        e.preventDefault();

        if (!petData.clientId) {
            alert("Por favor, busque y seleccione un cliente antes de crear la mascota.");
            return;
        }

        if (!petData.raceId) {
            alert("Por favor, busque y seleccione una raza antes de crear la mascota.");
            return;
        }

        fetch('http://localhost:8080/api/pets', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: petData.name,
                race: { idRace: petData.raceId },
                client: { idClient: petData.clientId },
                sex: petData.sex,
                weight: petData.weight,
                dateNac: petData.dateNac,
                comments: petData.comments,
                dirImage: petData.dirImage,
                status: petData.status,
            }),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Error al crear la mascota.");
                }
                return response.text();
            })
            .then(() => {
                alert("Mascota creada exitosamente.");
                onUpdate(); // Actualiza la tabla de mascotas
                onClose(); // Cierra el modal
            })
            .catch(error => {
                console.error("Error al crear la mascota:", error);
                alert("Error al crear la mascota.");
            });
    };

    return (
        <div className="modal">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Nueva Mascota</h5>
                        <button
                            type="button"
                            className="btn-close"
                            aria-label="Close"
                            onClick={onClose}
                        ></button>
                    </div>
                    <form onSubmit={handleCreatePet}>
                        <div className="modal-body">
                            <Box_Text_Value
                                Label="Nombre"
                                V_Text={petData.name}
                                onChange={handleChange}
                                name="name"
                                required
                            />
                            <Box_Text_Value
                                Label="Nombre de Raza"
                                V_Text={petData.raceName}
                                onChange={handleChange}
                                name="raceName"
                                required
                            />
                            <button type="button" className="btn btn-secondary" onClick={handleFindRace}>
                                Buscar Raza
                            </button>
                            {raceError && <p className="text-danger">{raceError}</p>}
                            {raceData && (
                                <p className="text-success">
                                    Raza: {raceData.name}
                                </p>
                            )}
                            <HiddenInput name="raceId" value={petData.raceId} />
                            <Box_Text_Value
                                Label="Sexo"
                                V_Text={petData.sex}
                                onChange={handleChange}
                                name="sex"
                                required
                            />
                            <Box_Text_Value
                                Label="Peso"
                                V_Text={petData.weight}
                                onChange={handleChange}
                                name="weight"
                                required
                            />
                            <Box_Text_Value
                                Label="Fecha de Nacimiento"
                                V_Text={petData.dateNac}
                                onChange={handleChange}
                                name="dateNac"
                                type="date"
                                required
                            />
                            <Box_Text_Value
                                Label="Comentarios"
                                V_Text={petData.comments}
                                onChange={handleChange}
                                name="comments"
                            />
                            <Box_Text_Value
                                Label="DNI del Cliente"
                                V_Text={petData.dniClient}
                                onChange={handleChange}
                                name="dniClient"
                                required
                            />
                            <button type="button" className="btn btn-secondary" onClick={handleFindClient}>
                                Buscar Cliente
                            </button>
                            {clientError && <p className="text-danger">{clientError}</p>}
                            {clientData && (
                                <p className="text-success">
                                    Cliente: {clientData.name} {clientData.lastName}
                                </p>
                            )}
                            <HiddenInput name="clientId" value={petData.clientId} />
                            <div className="form-group">
                                <label>Estado:</label>
                                <select
                                    name="status"
                                    value={petData.status}
                                    onChange={handleChange}
                                    className="input-box"
                                >
                                    <option value="1">Activo</option>
                                    <option value="0">Muerto</option>
                                </select>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={onClose}
                            >
                                Cancelar
                            </button>
                            <button type="submit" className="btn btn-primary">
                                Crear Mascota
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ModalNewPet;
