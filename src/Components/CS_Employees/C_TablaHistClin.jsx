import React, { useEffect, useState } from 'react';
import ModalNewHistory from '../../Layouts/LS_Employees/ModalHistory/ModalNewHistoy';
import ModalEditHistory from '../../Layouts/LS_Employees/ModalHistory/ModalEditHistory';
import Btn_Edit from '../CS_General/Buttons/Btn_Edit';
import Btn_Delete from '../CS_General/Buttons/Btn_Delete';
import Pagination from '../CS_General/Pagination';
import Btn_New from '../CS_General/Buttons/Btn_New';

function C_TablaHistClin({ petId }) {
    const [history, setHistory] = useState([]); // Datos del historial clínico
    const [currentPage, setCurrentPage] = useState(0); // Página actual
    const [totalPages, setTotalPages] = useState(1); // Total de páginas
    const [isNewHistoryModalOpen, setIsNewHistoryModalOpen] = useState(false); // Estado para abrir modal de nuevo historial
    const [isEditHistoryModalOpen, setIsEditHistoryModalOpen] = useState(false); // Estado para abrir modal de editar historial
    const [selectedHistoryId, setSelectedHistoryId] = useState(null); // Historial seleccionado para editar

    // Función para convertir fechas al formato adecuado
    const parseDate = (dateString) => {
        if (!dateString) return 'Fecha no disponible';
        const date = new Date(dateString); // Intenta crear un objeto Date
        if (isNaN(date)) return 'Fecha inválida'; // Si no es válida, muestra un mensaje
        return date.toLocaleDateString('es-ES'); // Devuelve la fecha en formato "día/mes/año"
    };

    // Función para cargar los datos del historial clínico
    const fetchHistory = async (page = 0) => {
        try {
            const response = await fetch(`http://localhost:8080/api/pet-clinical-history/${petId}?page=${page}&size=6`);
            if (!response.ok) throw new Error('Error al obtener el historial clínico');
            const data = await response.json();
            setHistory(data.content); // Datos de la página actual
            setTotalPages(data.totalPages); // Total de páginas disponibles
        } catch (error) {
            console.error('Error al cargar el historial clínico:', error);
        }
    };

    // Función para abrir el modal de nuevo historial
    const openNewHistoryModal = () => {
        setIsNewHistoryModalOpen(true);
    };

    // Función para cerrar el modal de nuevo historial
    const closeNewHistoryModal = () => {
        setIsNewHistoryModalOpen(false);
        fetchHistory(currentPage); // Recargar los datos al cerrar el modal
    };

    // Función para abrir el modal de editar historial
    const openEditHistoryModal = (historyId) => {
        setSelectedHistoryId(historyId); // Guardar ID del historial seleccionado
        setIsEditHistoryModalOpen(true);
    };

    // Función para cerrar el modal de editar historial
    const closeEditHistoryModal = () => {
        setIsEditHistoryModalOpen(false);
        setSelectedHistoryId(null); // Limpiar historial seleccionado
        fetchHistory(currentPage); // Recargar los datos al cerrar el modal
    };

    // Función para eliminar un historial clínico
    const handleDeleteHistory = async (historyId) => {
        try {
            const response = await fetch(`http://localhost:8080/api/pet-clinical-history/${historyId}/block`, {
                method: 'PUT',
            });
    
            if (!response.ok) {
                throw new Error('Error al eliminar el historial clínico');
            }
    
            alert('Historial clínico eliminado exitosamente.'); // Alerta de éxito
            fetchHistory(currentPage); // Recargar los datos después de eliminar
        } catch (error) {
            console.error('Error al eliminar el historial clínico:', error);
            alert('Ocurrió un error al intentar eliminar el historial clínico.'); // Alerta de error
        }
    };
    
    // Cargar datos del historial clínico al montar el componente o cambiar de página
    useEffect(() => {
        if (petId) fetchHistory(currentPage);
    }, [petId, currentPage]);

    return (
        <div>
            {/* Tabla de historial clínico */}
            <h3>Historial Medico</h3>
            <table className="table">
                <thead>
                    <tr>
                        <th>Servicio</th>
                        <th>Diagnóstico</th>
                        <th>Resultado</th>
                        <th>Fecha de Registro</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {history.length > 0 ? (
                        history.map((item) => (
                            <tr key={item.idHistory}>
                                <td>{item.serviceEntity.name}</td>
                                <td>{item.diagnostico || 'Sin diagnóstico'}</td>
                                <td>
                                    {item.resultado ? (
                                        <a href={item.resultado} target="_blank" rel="noopener noreferrer">
                                            Ver Resultado
                                        </a>
                                    ) : (
                                        'Sin resultado'
                                    )}
                                </td>
                                <td>{parseDate(item.registrationDate)}</td>
                                <td>
                                    {item.status === '1'
                                        ? 'En curso'
                                        : item.status === '2'
                                        ? 'En observación'
                                        : item.status === '3'
                                        ? 'Terminado'
                                        : 'Desconocido'}
                                </td>
                                <td>
                                
                                <div className="d-flex">
                                    {localStorage.getItem('userType') === 'empleado' && (
                                    <>
                                        <Btn_Edit
                                            nameId={item.idHistory}
                                            showContent="icon"
                                            onEdit={() => openEditHistoryModal(item.idHistory)}
                                        />  
                                        <Btn_Delete
                                            nameId={item.idHistory}
                                            showContent="icon"
                                            onDelete={() => handleDeleteHistory(item.idHistory)}
                                        />
                                    </>
                                )}
                                    </div>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6" className="text-center">
                                No se encontraron registros.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            {/* Paginación */}
            <div className="d-flex justify-content-between align-items-center">
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={(page) => setCurrentPage(page)}
                />
                {localStorage.getItem('userType') === 'empleado' && (
                                    <>
                                        <Btn_New
                                    nameId="btnAddNewHistory"
                                    showContent="text+icon"
                                    onNew={openNewHistoryModal}
                                />
                                    </>
                                )}
                
            </div>

            {/* Modal de nuevo historial */}
            {isNewHistoryModalOpen && (
                <ModalNewHistory idPet={petId} onClose={closeNewHistoryModal} onUpdate={() => fetchHistory(currentPage)} />
            )}

            {/* Modal de editar historial */}
            {isEditHistoryModalOpen && selectedHistoryId && (
                <ModalEditHistory
                    idHistory={selectedHistoryId}
                    onClose={closeEditHistoryModal}
                    onUpdate={() => fetchHistory(currentPage)}
                />
            )}
        </div>
    );
}

export default C_TablaHistClin;
