import React, { useEffect, useState } from 'react';
import C_Title from '../../Components/CS_General/C_Title/C_Title';
import Btn_New from '../../Components/CS_General/Buttons/Btn_New';
import Btn_Info from '../../Components/CS_General/Buttons/Btn_Info';
import "./LS_Client.css"
import Btn_ConfirmPag from '../../Components/CS_General/Buttons/Btn_ConfirmPag';
import Btn_OptionPag from '../../Components/CS_General/Buttons/Btn_OptionPag';
import Btn_Delete from '../../Components/CS_General/Buttons/Btn_Delete';

function L_Citas_Cl() {
    const [appointments, setAppointments] = useState([]); // Estado para almacenar las citas
    const [loading, setLoading] = useState(true); // Estado para manejar el estado de carga
    const [error, setError] = useState(null); // Estado para manejar errores

    useEffect(() => {
        const userId = localStorage.getItem('userId'); // Obtener el ID del cliente desde el localStorage
        if (!userId) {
            setError("No se encontró el ID del cliente.");
            setLoading(false);
            return;
        }

        // Llamada al backend para obtener las citas del cliente
        const fetchAppointments = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/quotes/client?clientId=${userId}`);
                if (!response.ok) {
                    throw new Error("Error al obtener las citas.");
                }
                const data = await response.json();
                setAppointments(data.content || []); // Guardar las citas obtenidas
            } catch (error) {
                setError("Hubo un problema al cargar las citas.");
            } finally {
                setLoading(false);
            }
        };

        fetchAppointments(); // Cargar las citas
    }, []);

    if (loading) {
        return <p>Cargando citas...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <section className='Layout'>
            <div className='Content_Layout'>
                <C_Title nameTitle={"Citas"} />

                {/* Lista de citas */}
                <div className="appointments-list">
                    {appointments.length > 0 ? (
                        appointments.map((appointment) => (
                            <div key={appointment.idQuote} className="appointment-card">
                                <div className="appointment-icon">
                                    <img src="/Img/calendar_clock.svg" alt="" />
                                </div>
                                <div className="appointment-info">
                                    <h5 className="appointment-title">{appointment.service.name}</h5>
                                    <p>Mascota: {appointment.pet.name}</p>
                                    <p>
                                        {new Date(appointment.date).toLocaleDateString()}{" "}
                                        {new Date(appointment.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </p>
                                </div>
                                <div className="appointment-actions">
                                    <Btn_Info showContent="icon" onClick={() => console.log("Ver cita", appointment.idQuote)} />
                                    <Btn_OptionPag />
                                    <Btn_Delete />
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No tienes citas registradas.</p>
                    )}
                </div>
                
                {/* Botón para añadir nueva cita */}
                <div className="d-flex justify-content-start mb-3">
                    <Btn_New showContent="text+icon" onNew={() => console.log("Añadir cita")} />
                </div>
            </div>
        </section>
    );
}

export default L_Citas_Cl;
