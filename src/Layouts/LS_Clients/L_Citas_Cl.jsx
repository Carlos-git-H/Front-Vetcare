import React, { useEffect, useState } from 'react';
import { getActiveQuotesByClientId, cancelQuote} from "../../Services/quotesService.js"
import C_Title from '../../Components/CS_General/C_Title/C_Title';
import Btn_New from '../../Components/CS_General/Buttons/Btn_New';
import Btn_Info from '../../Components/CS_General/Buttons/Btn_Info';
import './LS_Client.css';
import Btn_Delete from '../../Components/CS_General/Buttons/Btn_Delete';
import ModalNewQuote_Cl from '../../Components/CS_Clients/ModalNewQuote_Cl';
import Pagination from '../../Components/CS_General/Pagination';
import Btn_Edit from "../../Components/CS_General/Buttons/Btn_Edit";
import ModalViewQuoteCalendarCl from './ModalQuote/ModelViewQuoteCalendarCl';

function L_Citas_Cl() {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false); // Modal para nueva cita
    const [isInfoModalOpen, setIsInfoModalOpen] = useState(false); // Modal para ver detalles de la cita
    const [selectedQuoteId, setSelectedQuoteId] = useState(null); // ID de la cita seleccionada
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        fetchAppointments();
    }, [currentPage]);

    const fetchAppointments = async () => {


        const userId = localStorage.getItem('userId');


        if (!userId) {
            setError('No se encontró el ID del cliente.');
            setLoading(false);
            return;
        }

        try {
            setLoading(true);
            const data = await getActiveQuotesByClientId(userId, currentPage, 5);
            setAppointments(data.content || []);
            setTotalPages(data.totalPages || 0);
        } catch (err) {
            setError('Hubo un problema al cargar las citas.');
        } finally {
            setLoading(false);
        }
    };

    const handleAddQuote = () => {
        setIsModalOpen(true);
    };

    const handleViewInfo = (idQuote) => {
        setSelectedQuoteId(idQuote);
        setIsInfoModalOpen(true);
    };

    const handleCancelQuote = async (idQuote) => {
        try {
            await cancelQuote(idQuote);
            await fetchAppointments(); // Refrescar citas
        } catch (error) {
            setError('Error al cancelar la cita.');
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleCloseInfoModal = () => {
        setIsInfoModalOpen(false);
        setSelectedQuoteId(null);
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    if (loading) {
        return <p>Cargando citas...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <section className='Layout'>
            <div className='Content_Layout'>
                <C_Title nameTitle={'Citas'} />

                <div className='appointments-list'>
                    {appointments.length > 0 ? (
                        appointments.map((appointment) => (
                            <div key={appointment.idQuote} className='appointment-card'>
                                <div className='appointment-icon'>
                                    <img src='/Img/calendar_clock.svg' alt='' />
                                </div>
                                <div className='appointment-info'>
                                    <h5 className='appointment-title'>{appointment.service.name}</h5>
                                    <p>Mascota: {appointment.pet.name}</p>
                                    <p>
                                        {new Date(appointment.date).toLocaleDateString()}{' '}
                                        {new Date(appointment.date).toLocaleTimeString([], {
                                            hour: '2-digit',
                                            minute: '2-digit',
                                        })}
                                    </p>
                                </div>
                                <div className='appointment-actions'>
                                    <Btn_Info showContent='icon' onClick={() => handleViewInfo(appointment.idQuote)} />
                                    <Btn_Edit />
                                    <Btn_Delete nameId={"eliminarQuote"} showContent='icon' onDelete={() => handleCancelQuote(appointment.idQuote)} />
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No tienes citas registradas.</p>
                    )}
                </div>

                <div className='d-flex justify-content-between align-items-center mt-3'>
                    <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
                    <Btn_New showContent='text+icon' onNew={handleAddQuote} />
                </div>
            </div>

            {isModalOpen && (
                <ModalNewQuote_Cl
                    clientId={userId}
                    onClose={handleCloseModal}
                    onUpdate={fetchAppointments}
                />
            )}

            {isInfoModalOpen && selectedQuoteId && (
                <ModalViewQuoteCalendarCl
                    idQuote={selectedQuoteId}
                    onClose={handleCloseInfoModal}
                />
            )}
        </section>
    );
}

export default L_Citas_Cl;
