import React, { useState, useEffect } from 'react';
import "../../../Layouts/Layouts.css";
import Box_Text_Value from '../../../Components/CS_General/Form Box/Box_Text/Box_Text_Value';

function ModalEditQuote({ onClose, quoteId }) {
    const [quote, setQuote] = useState({
        petName: "",
        clientName: "",
        date: "",
        hour: "",
        serviceName: "",
        paymentMethod: "",
        statusPag: "",
        status: "",
        comments: ""
    });

    useEffect(() => {
        fetchQuoteData();
    }, [quoteId]);

    const fetchQuoteData = () => {
        fetch(`http://localhost:8080/api/quotes/${quoteId}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Error al obtener la cita");
                }
                return response.json();
            })
            .then(data => {
                setQuote({
                    petName: data.pet.name,
                    clientName: `${data.pet.client.firstName} ${data.pet.client.firstLastName}`,
                    date: data.date,
                    hour: data.hour,
                    serviceName: data.service.name,
                    paymentMethod: data.metPag.name,
                    statusPag: data.statusPag,
                    status: data.status,
                    comments: data.comments
                });
            })
            .catch(error => console.error("Error al obtener los datos de la cita:", error));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setQuote(prevData => ({ ...prevData, [name]: value }));
    };

    const handleUpdateQuote = () => {
        const updatedQuoteData = {
            date: quote.date,
            hour: quote.hour,
            comments: quote.comments,
            statusPag: quote.statusPag,
            status: quote.status
        };

        fetch(`http://localhost:8080/api/quotes/${quoteId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedQuoteData),
        })
        .then(response => response.json())
        .then(data => {
            alert("Cita actualizada exitosamente!");
            onClose();
        })
        .catch(error => console.error("Error al actualizar la cita:", error));
    };

    return (
        <div className="modal">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Editar Cita</h5>
                        <button
                            type="button"
                            className="btn-close"
                            aria-label="Close"
                            onClick={onClose}
                        ></button>
                    </div>
                    <form onSubmit={(e) => { e.preventDefault(); handleUpdateQuote(); }}>
                        <div className="modal-body">
                            <Box_Text_Value
                                Label="Mascota"
                                V_Text={quote.petName}
                                name="petName"
                                readOnly
                            />
                            <Box_Text_Value
                                Label="Cliente"
                                V_Text={quote.clientName}
                                name="clientName"
                                readOnly
                            />
                            <Box_Text_Value
                                Label="Fecha"
                                V_Text={quote.date}
                                onChange={handleChange}
                                name="date"
                            />
                            <Box_Text_Value
                                Label="Hora"
                                V_Text={quote.hour}
                                onChange={handleChange}
                                name="hour"
                            />
                            <Box_Text_Value
                                Label="Servicio"
                                V_Text={quote.serviceName}
                                name="serviceName"
                                readOnly
                            />
                            <Box_Text_Value
                                Label="Método de Pago"
                                V_Text={quote.paymentMethod}
                                name="paymentMethod"
                                readOnly
                            />
                            <div className="form-group">
                                <label>Estado de Pago:</label>
                                <select
                                    name="statusPag"
                                    value={quote.statusPag}
                                    onChange={handleChange}
                                    className="input-box"
                                >
                                    <option value="1">Pendiente</option>
                                    <option value="0">Pagado</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Estado:</label>
                                <select
                                    name="status"
                                    value={quote.status}
                                    onChange={handleChange}
                                    className="input-box"
                                >
                                    <option value="1">activo</option>
                                    <option value="2">vencido</option>
                                    <option value="2">confirmado</option>
                                    <option value="0">cancelado</option>
                                </select>
                            </div>
                            <Box_Text_Value
                                Label="Comentarios"
                                V_Text={quote.comments}
                                onChange={handleChange}
                                name="comments"
                            />
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
                                Actualizar Cita
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ModalEditQuote;
