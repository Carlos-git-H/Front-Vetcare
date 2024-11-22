import React, { useEffect, useState } from 'react';
import "../../../Layouts/Layouts.css";
import Box_Text_Value from '../../../Components/CS_General/Form Box/Box_Text/Box_Text_Value';
import HiddenInput from '../../../Components/CS_General/Form Box/Box_Text/HiddenInput';

function ModalEditPet({ petId, onClose, onUpdate }) {

    
    const userType = localStorage.getItem('userType');
        

    
    const [petData, setPetData] = useState({
        name: '',
        raceName: '',
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

    useEffect(() => {
        if (petId) {
            fetch(`http://localhost:8080/api/pets/${petId}`)
                .then(response => response.json())
                .then(data => {
                    setPetData({
                        name: data.name,
                        raceName: data.race.name,
                        raceId: data.race.idRace,
                        sex: data.sex,
                        weight: data.weight,
                        dateNac: data.dateNac.split('T')[0], // Formatear la fecha para el input
                        comments: data.comments,
                        dniClient: '', // Se busca por DNI, pero no se incluye en los datos de la mascota
                        clientId: data.client.idClient,
                        dirImage: data.dirImage,
                        status: data.status,
                    });
                    setClientData({
                        name: data.client.firstName,
                        lastName: data.client.firstLastName,
                    });
                })
                .catch(error => console.error("Error al obtener los datos de la mascota:", error));
        }
    }, [petId]);

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
                    setClientError(null);
                } else {
                    setClientError("No se encontró un cliente con el DNI proporcionado.");
                    setClientData(null);
                }
            })
            .catch(error => {
                console.error("Error:", error);
                setClientError("Ocurrió un error al buscar el cliente.");
                setClientData(null);
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
                    setRaceData(race);
                    setRaceError(null);
                } else {
                    setRaceError("No se encontró una raza con el nombre proporcionado.");
                    setRaceData(null);
                }
            })
            .catch(error => {
                console.error("Error en la búsqueda de raza:", error);
                setRaceError("Ocurrió un error al buscar la raza.");
                setRaceData(null);
            });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!petData.clientId || !petData.raceId) {
            alert("Por favor, busque y seleccione un cliente y una raza antes de guardar los cambios.");
            return;
        }

        fetch(`http://localhost:8080/api/pets/update/${petId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ...petData,
                race: { idRace: petData.raceId },
                client: { idClient: petData.clientId },
            }),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Error al actualizar la mascota.");
                }
                return response.text();
            })
            .then(() => {
                alert("Mascota actualizada exitosamente.");
                onUpdate();
                onClose();
            })
            .catch(error => {
                console.error("Error al actualizar la mascota:", error);
                alert("Error al actualizar la mascota.");
            });
    };

    return (
        <div className="modal">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Editar Mascota</h5>
                        <button
                            type="button"
                            className="btn-close"
                            aria-label="Close"
                            onClick={onClose}
                        ></button>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="modal-body">
                            <Box_Text_Value
                                Label="Nombre"
                                V_Text={petData.name}
                                onChange={handleChange}
                                name="name"
                                required
                            />
                            <Box_Text_Value
                                Label="Raza (Nombre)"
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
                                    Raza encontrada: {raceData.name}
                                </p>
                            )}
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
                            {userType === 'empleado' && (
                                <>
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
                                </>
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
                                Guardar Cambios
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ModalEditPet;
