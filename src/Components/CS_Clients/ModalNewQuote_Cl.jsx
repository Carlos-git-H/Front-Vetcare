import React, { useState, useEffect } from 'react';
import { createQuote } from '../../Services/quotesService';
import { fetchActivePetsForClient } from '../../Services/PetService';
import { fetchActivePaymentMethods } from '../../Services/metPagService';
import { searchServicesByName } from '../../Services/serviceService';
import DateTimePicker from '../CS_General/Form Box/DateTimePicker/DateTimePicker';
import Box_Text_Value from "../CS_General/Form Box/Box_Text/Box_Text_Value";
import SelectImput from "../CS_General/Form Box/SelectImput/SelectImput";

function ModalNewQuote_Cl({ clientId, onClose, onUpdate, defaultServiceId = null }) {
    const [quoteData, setQuoteData] = useState({
        petId: '',
        serviceId: defaultServiceId || '',
        metPagId: '',
        date: '',
        hour: '',
        comments: '',
        statusPag: '1',
        status: '1',
    });

    const [pets, setPets] = useState([]);
    const [paymentMethods, setPaymentMethods] = useState([]);
    const [serviceSearchTerm, setServiceSearchTerm] = useState('');
    const [serviceResult, setServiceResult] = useState(null);
    const [errors, setErrors] = useState({});

    // Cargar mascotas activas para el cliente
    useEffect(() => {
        const loadPets = async () => {
            try {
                const pets = await fetchActivePetsForClient(clientId);
                setPets(pets);

                if (pets.length > 0) {
                    setQuoteData((prevState) => ({
                        ...prevState,
                        petId: pets[0].id, // Seleccionar automáticamente la primera mascota
                    }));
                }
            } catch (error) {
                console.error('Error al cargar mascotas:', error);
            }
        };

        loadPets();
    }, [clientId]);

    // Cargar métodos de pago activos
    useEffect(() => {
        const loadPaymentMethods = async () => {
            try {
                const methods = await fetchActivePaymentMethods();
                setPaymentMethods(methods);

                if (methods.length > 0) {
                    setQuoteData((prevState) => ({
                        ...prevState,
                        metPagId: methods[0].idMetPag, // Seleccionar automáticamente el primer método de pago
                    }));
                }
            } catch (error) {
                console.error('Error al cargar métodos de pago:', error);
            }
        };

        loadPaymentMethods();
    }, []);

    // Manejar cambios en los campos del formulario
    const handleChange = (e) => {
        const { name, value } = e.target;
        setQuoteData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    // Validar los datos del formulario
    const validateForm = () => {
        const newErrors = {};
        if (!quoteData.petId) newErrors.petId = 'Selecciona una mascota.';
        if (!quoteData.serviceId) newErrors.serviceId = 'Selecciona un servicio.';
        if (!quoteData.metPagId) newErrors.metPagId = 'Selecciona un método de pago.';
        if (!quoteData.date) newErrors.date = 'Selecciona una fecha.';
        if (!quoteData.hour) newErrors.hour = 'Selecciona una hora.';
        return newErrors;
    };

    // Manejar la búsqueda de servicios por nombre
    const handleSearchService = async () => {
        try {
            const response = await searchServicesByName(serviceSearchTerm);
            if (response.content.length > 0) {
                setServiceResult(response.content[0]); // Seleccionar el primer servicio encontrado
                setQuoteData((prevState) => ({
                    ...prevState,
                    serviceId: response.content[0].idService,
                }));
            } else {
                setServiceResult(null);
                setQuoteData((prevState) => ({
                    ...prevState,
                    serviceId: '',
                }));
            }
        } catch (error) {
            console.error('Error al buscar servicio:', error);
        }
    };

    // Manejar el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();

        const newErrors = validateForm();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        const formattedData = {
            pet: { idPet: parseInt(quoteData.petId) },
            service: { idService: parseInt(quoteData.serviceId) },
            metPag: { idMetPag: parseInt(quoteData.metPagId) },
            date: quoteData.date,
            hour: quoteData.hour,
            comments: quoteData.comments,
            statusPag: quoteData.statusPag,
            status: quoteData.status,
        };

        try {
            await createQuote(formattedData); // Usar método de Axios
            alert('Cita creada exitosamente.');
            onUpdate(); // Actualizar lista de citas
            onClose(); // Cerrar el modal
        } catch (error) {
            console.error('Error al crear la cita:', error);
            alert('Error al crear la cita.');
        }
    };

    return (
        <div className="modal">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Nueva Cita</h5>
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
                                    value: pet.id,
                                    label: pet.name,
                                }))}
                            />
                            {errors.petId && <p className="text-danger">{errors.petId}</p>}

                            {!defaultServiceId && (
                                <div>
                                    <Box_Text_Value
                                        Label="Buscar Servicio"
                                        V_Text={serviceSearchTerm}
                                        onChange={(e) => setServiceSearchTerm(e.target.value)}
                                    />
                                    <button
                                        type="button"
                                        className="btn btn-primary"
                                        onClick={handleSearchService}
                                    >
                                        Buscar
                                    </button>
                                    {serviceResult ? (
                                        <p className="text-success">
                                            Servicio encontrado: {serviceResult.name}
                                        </p>
                                    ) : (
                                        <p className="text-danger">Servicio no encontrado.</p>
                                    )}
                                </div>
                            )}

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
                            {errors.metPagId && <p className="text-danger">{errors.metPagId}</p>}

                            <DateTimePicker
                                label="Fecha"
                                type="date"
                                name="date"
                                value={quoteData.date}
                                onChange={handleChange}
                            />
                            {errors.date && <p className="text-danger">{errors.date}</p>}

                            <DateTimePicker
                                label="Hora"
                                type="time"
                                name="hour"
                                value={quoteData.hour}
                                onChange={handleChange}
                            />
                            {errors.hour && <p className="text-danger">{errors.hour}</p>}

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

export default ModalNewQuote_Cl;
