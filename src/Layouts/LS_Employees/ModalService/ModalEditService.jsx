import React, { useEffect, useState } from 'react';
import "../../../Layouts/Layouts.css";
import Box_Text_Value from '../../../Components/CS_General/Form Box/Box_Text/Box_Text_Value';
import HiddenInput from '../../../Components/CS_General/Form Box/Box_Text/HiddenInput';

function ModalEditService({ serviceId, onClose, onUpdate }) {
    const [serviceData, setServiceData] = useState({
        name: '',
        categoryName: '',
        categoryId: '',
        especieName: '',
        especieId: '',
        description: '',
        recommendedAge: '',
        recommendedFrequency: '',
        price: '',
        dirImage: '',
        status: '1',
    });

    const [categoryData, setCategoryData] = useState(null); // Datos de la categoría encontrada
    const [categoryError, setCategoryError] = useState(null); // Error al buscar categoría
    const [especieData, setEspecieData] = useState(null); // Datos de la especie encontrada
    const [especieError, setEspecieError] = useState(null); // Error al buscar especie

    useEffect(() => {
        if (serviceId) {
            fetch(`http://localhost:8080/api/services/${serviceId}`)
                .then(response => response.json())
                .then(data => {
                    setServiceData({
                        name: data.name,
                        categoryName: data.category.name,
                        categoryId: data.category.idCategory,
                        especieName: data.especie.name,
                        especieId: data.especie.idEspecie,
                        description: data.description,
                        recommendedAge: data.recommendedAge,
                        recommendedFrequency: data.recommendedFrequency,
                        price: data.price,
                        dirImage: data.dirImage,
                        status: data.status,
                    });
                })
                .catch(error => console.error("Error al obtener los datos del servicio:", error));
        }
    }, [serviceId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setServiceData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    // Busca categoría por nombre
    const handleFindCategory = () => {
        if (!serviceData.categoryName) {
            setCategoryError("Por favor, ingrese un nombre de categoría válido.");
            return;
        }

        fetch(`http://localhost:8080/api/categories/search?name=${serviceData.categoryName}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Error al buscar la categoría.");
                }
                return response.json();
            })
            .then(data => {
                if (data.content && data.content.length > 0) {
                    const category = data.content[0];
                    setServiceData(prevState => ({
                        ...prevState,
                        categoryId: category.idCategory,
                    }));
                    setCategoryData(category);
                    setCategoryError(null);
                } else {
                    setCategoryError("No se encontró una categoría con el nombre proporcionado.");
                    setCategoryData(null);
                }
            })
            .catch(error => {
                console.error("Error en la búsqueda de categoría:", error);
                setCategoryError("Ocurrió un error al buscar la categoría.");
                setCategoryData(null);
            });
    };

    // Busca especie por nombre
    const handleFindEspecie = () => {
        if (!serviceData.especieName) {
            setEspecieError("Por favor, ingrese un nombre de especie válido.");
            return;
        }

        fetch(`http://localhost:8080/api/especies/search?name=${serviceData.especieName}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Error al buscar la especie.");
                }
                return response.json();
            })
            .then(data => {
                if (data.content && data.content.length > 0) {
                    const especie = data.content[0];
                    setServiceData(prevState => ({
                        ...prevState,
                        especieId: especie.idEspecie,
                    }));
                    setEspecieData(especie);
                    setEspecieError(null);
                } else {
                    setEspecieError("No se encontró una especie con el nombre proporcionado.");
                    setEspecieData(null);
                }
            })
            .catch(error => {
                console.error("Error en la búsqueda de especie:", error);
                setEspecieError("Ocurrió un error al buscar la especie.");
                setEspecieData(null);
            });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!serviceData.categoryId || !serviceData.especieId) {
            alert("Por favor, busque y seleccione una categoría y una especie antes de guardar los cambios.");
            return;
        }

        fetch(`http://localhost:8080/api/services/update/${serviceId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ...serviceData,
                category: { idCategory: serviceData.categoryId },
                especie: { idEspecie: serviceData.especieId },
            }),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Error al actualizar el servicio.");
                }
                return response.text();
            })
            .then(() => {
                alert("Servicio actualizado exitosamente.");
                onUpdate();
                onClose();
            })
            .catch(error => {
                console.error("Error al actualizar el servicio:", error);
                alert("Error al actualizar el servicio.");
            });
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
                    <form onSubmit={handleSubmit}>
                        <div className="modal-body">
                            <Box_Text_Value
                                Label="Nombre"
                                V_Text={serviceData.name}
                                onChange={handleChange}
                                name="name"
                                required
                            />
                            <Box_Text_Value
                                Label="Categoría (Nombre)"
                                V_Text={serviceData.categoryName}
                                onChange={handleChange}
                                name="categoryName"
                                required
                            />
                            <button type="button" className="btn btn-secondary" onClick={handleFindCategory}>
                                Buscar Categoría
                            </button>
                            {categoryError && <p className="text-danger">{categoryError}</p>}
                            {categoryData && (
                                <p className="text-success">
                                    Categoría encontrada: {categoryData.name}
                                </p>
                            )}
                            <Box_Text_Value
                                Label="Especie (Nombre)"
                                V_Text={serviceData.especieName}
                                onChange={handleChange}
                                name="especieName"
                                required
                            />
                            <button type="button" className="btn btn-secondary" onClick={handleFindEspecie}>
                                Buscar Especie
                            </button>
                            {especieError && <p className="text-danger">{especieError}</p>}
                            {especieData && (
                                <p className="text-success">
                                    Especie encontrada: {especieData.name}
                                </p>
                            )}
                            <Box_Text_Value
                                Label="Descripción"
                                V_Text={serviceData.description}
                                onChange={handleChange}
                                name="description"
                                required
                            />
                            <Box_Text_Value
                                Label="Edad Recomendada"
                                V_Text={serviceData.recommendedAge}
                                onChange={handleChange}
                                name="recommendedAge"
                                required
                            />
                            <Box_Text_Value
                                Label="Frecuencia Recomendada"
                                V_Text={serviceData.recommendedFrequency}
                                onChange={handleChange}
                                name="recommendedFrequency"
                                required
                            />
                            <Box_Text_Value
                                Label="Precio"
                                V_Text={serviceData.price}
                                onChange={handleChange}
                                name="price"
                                type="number"
                                required
                            />
                            <Box_Text_Value
                                Label="Imagen del Servicio (URL)"
                                V_Text={serviceData.dirImage}
                                onChange={handleChange}
                                name="dirImage"
                                required
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
