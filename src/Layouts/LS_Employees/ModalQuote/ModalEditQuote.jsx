
import React, { useState, useEffect } from 'react';
import SelectImput from '../../../Components/CS_General/Form Box/SelectImput/SelectImput';
import DateTimePicker from '../../../Components/CS_General/Form Box/DateTimePicker/DateTimePicker';
import Box_Text_Value from '../../../Components/CS_General/Form Box/Box_Text/Box_Text_Value';

function ModalEditQuote({ quoteId, onClose, onUpdate }) {
    const [quoteData, setQuoteData] = useState({
        petId: '',
        serviceId: '',
        metPagId: '',
        statusPag: '',
        status: '',
        date: '',
        hour: '',
        comments: '',
    });

    const [pets, setPets] = useState([]);
    const [services, setServices] = useState([]);
    const [paymentMethods, setPaymentMethods] = useState([]);

    useEffect(() => {
        // Fetch quote data to edit
        fetch(`http://localhost:8080/api/quotes/${quoteId}`)
            .then(response => response.json())
            .then(data => {
                setQuoteData({
                    petId: data.pet.idPet,
                    serviceId: data.service.idService,
                    metPagId: data.metPag.idMetPag,
                    statusPag: data.statusPag,
                    status: data.status,
                    date: data.date,
                    hour: data.hour,
                    comments: data.comments,
                });
            })
            .catch(error => console.error('Error fetching quote:', error));

        // Fetch related data
        fetch(`http://localhost:8080/api/pets/search?status=1`)
            .then(response => response.json())
            .then(data => setPets(data.content || []))
            .catch(error => console.error('Error fetching pets:', error));

        fetch(`http://localhost:8080/api/services/search?status=1`)
            .then(response => response.json())
            .then(data => setServices(data.content || []))
            .catch(error => console.error('Error fetching services:', error));

        fetch(`http://localhost:8080/api/metpags/active`)
            .then(response => response.json())
            .then(data => setPaymentMethods(data || []))
            .catch(error => console.error('Error fetching payment methods:', error));
    }, [quoteId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setQuoteData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validate fields
        if (!quoteData.petId || !quoteData.serviceId || !quoteData.metPagId || !quoteData.date || !quoteData.hour) {
            alert('Por favor, completa todos los campos requeridos.');
            return;
        }

        // Prepare the data in the correct format
        const payload = {
            pet: { idPet: quoteData.petId },
            service: { idService: quoteData.serviceId },
            metPag: { idMetPag: quoteData.metPagId },
            date: quoteData.date,
            hour: quoteData.hour,
            comments: quoteData.comments,
            statusPag: quoteData.statusPag,
            status: quoteData.status,
        };

        fetch(`http://localhost:8080/api/quotes/update/${quoteId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al actualizar la cita.');
                }
                return response.text();
            })
            .then(() => {
                alert('Cita actualizada exitosamente.');
                onUpdate();
                onClose();
            })
            .catch(error => {
                console.error('Error updating quote:', error);
                alert('Error al actualizar la cita.');
            });
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
                    <form onSubmit={handleSubmit}>
                        <div className="modal-body">
                            <SelectImput
                                label="Mascota"
                                name="petId"
                                value={quoteData.petId}
                                onChange={handleChange}
                                options={pets.map((pet) => ({
                                    value: pet.idPet,
                                    label: pet.name,
                                }))}
                            />
                            <SelectImput
                                label="Servicio"
                                name="serviceId"
                                value={quoteData.serviceId}
                                onChange={handleChange}
                                options={services.map((service) => ({
                                    value: service.idService,
                                    label: service.name,
                                }))}
                            />
                            <SelectImput
                                label="Método de Pago"
                                name="metPagId"
                                value={quoteData.metPagId}
                                onChange={handleChange}
                                options={paymentMethods.map((method) => ({
                                    value: method.idMetPag,
                                    label: method.name,
                                }))}
                            />
                            <DateTimePicker
                                label="Fecha"
                                type="date"
                                name="date"
                                value={quoteData.date}
                                onChange={handleChange}
                            />
                            <DateTimePicker
                                label="Hora"
                                type="time"
                                name="hour"
                                value={quoteData.hour}
                                onChange={handleChange}
                            />
                            <Box_Text_Value
                                Label="Comentarios"
                                V_Text={quoteData.comments}
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
                                Guardar
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ModalEditQuote;
