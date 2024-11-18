import React, { useState, useEffect } from 'react';
import Box_Text_Value from '../../../Components/CS_General/Form Box/Box_Text/Box_Text_Value';
import SelectImput from "../../../Components/CS_General/Form Box/SelectImput/SelectImput";
import DateTimePicker from "../../../Components/CS_General/Form Box/DateTimePicker/DateTimePicker";

function ModelNewQuote({ onClose, onUpdate }) {
    const [quoteData, setQuoteData] = useState({
        petId: '',
        serviceId: '',
        metPagId: '',
        date: '',
        hour: '',
        comments: '',
        statusPag: '1',
        status: '1',
    });

    const [pets, setPets] = useState([]);
    const [services, setServices] = useState([]);
    const [paymentMethods, setPaymentMethods] = useState([]);
    const [errors, setErrors] = useState({});

    useEffect(() => {
      // Carga de mascotas
      fetch(`http://localhost:8080/api/pets/search?status=1`)
          .then((response) => response.json())
          .then((data) => {
              const pets = data.content || [];
              setPets(pets);
  
              // Si hay mascotas, selecciona la primera por defecto
              if (pets.length > 0) {
                  setQuoteData((prevState) => ({
                      ...prevState,
                      petId: pets[0].idPet, // Seleccionar automáticamente la primera mascota
                  }));
              }
          })
          .catch((error) => console.error('Error fetching pets:', error));
  
      // Carga de servicios
      fetch(`http://localhost:8080/api/services/search?status=1`)
          .then((response) => response.json())
          .then((data) => {
              const services = data.content || [];
              setServices(services);
  
              // Si hay servicios, selecciona el primero por defecto
              if (services.length > 0) {
                  setQuoteData((prevState) => ({
                      ...prevState,
                      serviceId: services[0].idService, // Seleccionar automáticamente el primer servicio
                  }));
              }
          })
          .catch((error) => console.error('Error fetching services:', error));
  
      // Carga de métodos de pago
      fetch(`http://localhost:8080/api/metpags/active`)
          .then((response) => {
              if (!response.ok) throw new Error('Error al obtener métodos de pago');
              return response.json();
          })
          .then((data) => {
              const methods = data || [];
              setPaymentMethods(methods);
  
              // Si hay métodos de pago, selecciona el primero por defecto
              if (methods.length > 0) {
                  setQuoteData((prevState) => ({
                      ...prevState,
                      metPagId: methods[0].idMetPag, // Seleccionar automáticamente el primer método de pago
                  }));
              }
          })
          .catch((error) => console.error('Error fetching payment methods:', error));
  }, []);
  

    const handleChange = (e) => {
        const { name, value } = e.target;
        setQuoteData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const validateForm = () => {
        const newErrors = {};
        if (!quoteData.petId) newErrors.petId = 'Selecciona una mascota.';
        if (!quoteData.serviceId) newErrors.serviceId = 'Selecciona un servicio.';
        if (!quoteData.metPagId) newErrors.metPagId = 'Selecciona un método de pago.';
        if (!quoteData.date) newErrors.date = 'Selecciona una fecha.';
        if (!quoteData.hour) newErrors.hour = 'Selecciona una hora.';
        return newErrors;
    };

    const handleSubmit = (e) => {
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

        console.log('Datos formateados de la cita:', formattedData);

        fetch(`http://localhost:8080/api/quotes/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formattedData),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Error al crear la cita.');
                }
                return response.text();
            })
            .then(() => {
                alert('Cita creada exitosamente.');
                onUpdate();
                onClose();
            })
            .catch((error) => {
                console.error('Error creating quote:', error);
                alert('Error al crear la cita.');
            });
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
                                value: pet.idPet,
                                label: pet.name,
                            }))}
                        />
                            {errors.petId && <p className="text-danger">{errors.petId}</p>}
                            
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

                            {errors.serviceId && <p className="text-danger">{errors.serviceId}</p>}
                            
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

export default ModelNewQuote;
