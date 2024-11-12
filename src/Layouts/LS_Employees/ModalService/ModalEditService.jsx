import React, { useEffect, useState } from 'react';
import "../../../Layouts/Layouts.css";
import Box_Text_Value from '../../../Components/CS_General/Form Box/Box_Text/Box_Text_Value';

function ModalEditService({ serviceId, onClose }) {
    const [serviceData, setServiceData] = useState({
        name: "",
        description: "",
        recommendedAge: "",
        recommendedFrequency: "",
        price: 0,
        dirImage: "",
        status: "1"
    });

    useEffect(() => {
        if (serviceId) {
            fetch(`http://localhost:8080/api/services/${serviceId}`)
                .then(response => response.json())
                .then(data => setServiceData(data))
                .catch(error => console.error("Error al obtener el servicio:", error));
        }
    }, [serviceId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setServiceData(prevData => ({ ...prevData, [name]: value }));
    };

    const handleUpdateService = () => {
        fetch(`http://localhost:8080/api/services/update/${serviceId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(serviceData),
        })
        .then(response => response.text())
        .then(message => {
            alert(message);
            onClose();
        })
        .catch(error => console.error("Error al actualizar el servicio:", error));
    };

    return (
        <div className="modal">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Editar Servicio</h5>
                        <button
                            type="button"
                            className="btn-close"
                            aria-label="Close"
                            onClick={onClose}
                        ></button>
                    </div>
                    <form onSubmit={(e) => { e.preventDefault(); handleUpdateService(); }}>
                        <div className="modal-body">
                            <Box_Text_Value
                                Label="Nombre del Servicio"
                                V_Text={serviceData.name}
                                onChange={handleChange}
                                name="name"
                            />
                            <Box_Text_Value 
                                Label="Descripción"
                                V_Text={serviceData.description}
                                onChange={handleChange}
                                name="description"
                            />
                            <Box_Text_Value 
                                Label="Edad Recomendada"
                                V_Text={serviceData.recommendedAge}
                                onChange={handleChange}
                                name="recommendedAge"
                            />
                            <Box_Text_Value 
                                Label="Frecuencia Recomendada"
                                V_Text={serviceData.recommendedFrequency}
                                onChange={handleChange}
                                name="recommendedFrequency"
                            />
                            <Box_Text_Value 
                                Label="Precio"
                                V_Text={serviceData.price}
                                onChange={handleChange}
                                type="number"
                                name="price"
                            />
                            <Box_Text_Value 
                                Label="Imagen"
                                V_Text={serviceData.dirImage}
                                onChange={handleChange}
                                name="dirImage"
                            />
                            <div className="form-group">
                                <label>Estado:</label>
                                <select
                                    name="status"
                                    value={serviceData.status}
                                    onChange={handleChange}
                                    className="input-box"
                                >
                                    <option value="1">Activo</option>
                                    <option value="0">Bloqueado</option>
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

export default ModalEditService;
