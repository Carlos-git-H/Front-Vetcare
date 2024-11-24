import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { fetchQuotesForClientCalendar } from '../../Services/quotesService';
import ModalViewQuoteCalendarCl from '../../Layouts/LS_Clients/ModalQuote/ModelViewQuoteCalendarCl';

function C_Calendar_Cl({ clientId }) {
    const [events, setEvents] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedQuoteId, setSelectedQuoteId] = useState(null);

    // Cargar eventos del cliente
    useEffect(() => {
        const loadEvents = async () => {
            try {
                const data = await fetchQuotesForClientCalendar(clientId);
                const formattedEvents = data.map(quote => ({
                    id: quote.idQuote,
                    title: `${quote.serviceName} - ${quote.petName}`,
                    start: `${quote.date}T${quote.hour}`,
                }));
                setEvents(formattedEvents);
            } catch (error) {
                console.error('Error al cargar eventos:', error);
            }
        };

        loadEvents();
    }, [clientId]);

    const handleEventClick = (info) => {
        setSelectedQuoteId(info.event.id);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedQuoteId(null);
    };

    return (
        <div>
            <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                events={events} // Usa el estado correcto
                eventClick={handleEventClick}
            />

            {isModalOpen && (
                <ModalViewQuoteCalendarCl idQuote={selectedQuoteId} onClose={closeModal} />
            )}
        </div>
    );
}

export default C_Calendar_Cl;
