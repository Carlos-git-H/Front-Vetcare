import React, { useEffect, useState } from 'react';
import Btn_Edit from '../CS_General/Buttons/Btn_Edit';
import Btn_Delete from '../CS_General/Buttons/Btn_Delete';
import Btn_Search from '../CS_General/Buttons/Btn_Search';
import Btn_New from '../CS_General/Buttons/Btn_New';
import ModalEditQuote from "../../Layouts/LS_Employees/ModalQuote/ModalEditQuote";
import ModalNewQuote from "../../Layouts/LS_Employees/ModalQuote/ModelNewQuote";

function C_TableCitas() {
    const [quotes, setQuotes] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isNewQuoteModalOpen, setIsNewQuoteModalOpen] = useState(false);
    const [selectedQuoteId, setSelectedQuoteId] = useState(null);

    useEffect(() => {
        fetchQuotes();
    }, []);

    const fetchQuotes = () => {
        fetch("http://localhost:8080/api/quotes")
            .then(response => {
                if (!response.ok) {
                    throw new Error("Error al obtener las citas");
                }
                return response.json();
            })
            .then(data => setQuotes(data))
            .catch(error => console.error("Error:", error));
    };

    const handleDeleteQuote = (quoteId) => {
        fetch(`http://localhost:8080/api/quotes/${quoteId}/delete`, {
            method: 'DELETE'
        })
        .then(response => response.text())
        .then(message => {
            alert(message);
            fetchQuotes();
        })
        .catch(error => console.error("Error al eliminar la cita:", error));
    };

    const openModal = (quoteId) => {
        setSelectedQuoteId(quoteId);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedQuoteId(null);
    };

    const openNewQuoteModal = () => {
        setIsNewQuoteModalOpen(true);
    };

    const closeNewQuoteModal = () => {
        setIsNewQuoteModalOpen(false);
    };

    return (
        <div>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Mascota</th>
                        <th scope="col">Cliente</th>
                        <th scope="col">Fecha</th>
                        <th scope="col">Servicio</th>
                        <th scope="col">Método Pago</th>
                        <th scope="col">E. de Pago</th>
                        <th scope="col">Estado</th>
                        <th scope="col">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {quotes.map((quote) => (
                        <tr key={quote.idQuote}>
                            <td>{quote.pet.name}</td>
                            <td>{`${quote.pet.client.firstName} ${quote.pet.client.firstLastName}`}</td>
                            <td>{quote.date}</td>
                            <td>{quote.service.name}</td>
                            <td>{quote.metPag.name}</td>
                            <td>{quote.statusPag === '1' ? "Pendiente" : "Pagado"}</td>
                            <td>{quote.status === '1' ? "Espera" : "Completado"}</td>
                            <td>
                                <div className="flex_button_options">
                                    <Btn_Edit
                                        nameId={quote.idQuote}
                                        showContent="icon"
                                        onEdit={() => openModal(quote.idQuote)}
                                    />
                                    <Btn_Delete 
                                        nameId={quote.idQuote} 
                                        showContent="icon" 
                                        onDelete={() => handleDeleteQuote(quote.idQuote)} 
                                    />
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {isModalOpen && (
                <ModalEditQuote quoteId={selectedQuoteId} onClose={closeModal} />
            )}
            {isNewQuoteModalOpen && (
                <ModalNewQuote onClose={closeNewQuoteModal} />
            )}

            {/* Botón para abrir el modal de nueva cita 
            <Btn_New
                nameId="btnAddNewQuote"
                showContent="text+icon"
                onNew={openNewQuoteModal}
            />
            */}
        </div>
    );
}

export default C_TableCitas;
