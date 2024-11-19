
import "../../Layouts/Layouts.css"
import C_Title from '../../Components/CS_General/C_Title/C_Title'
import C_FromData_Em from '../../Components/CS_Employees/C_FromData_Em/C_FromData_Em'
import C_CardData from '../../Components/CS_Employees/C_CardData_Em/C_CardData'
import Btn_Edit from '../../Components/CS_General/Buttons/Btn_Edit'

import React, { useState, useEffect } from 'react';
import "../../Layouts/Layouts.css"
import { useParams } from 'react-router-dom';
import ModalEditEmployee from "./ModalEmployee/ModalEditEmployee"

function L_Profile_Em() {
    const { id } = useParams(); // Obtén el ID desde la URL
    const [employee, setEmployee] = useState(null); // Estado para datos del empleado
    const [showEditModal, setShowEditModal] = useState(false); // Estado para mostrar el modal

    // Función para abrir el modal y configurar el ID del empleado
    const openEditModal = () => {
        setShowEditModal(true);
    };

    // Función para cerrar el modal
    const closeEditModal = () => {
        setShowEditModal(false);
    };

    // Llamada al backend para obtener datos del empleado
    useEffect(() => {
        const fetchEmployee = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/employees/${id}`);
                if (!response.ok) {
                    throw new Error('Error al obtener los datos del empleado');
                }
                const data = await response.json();
                setEmployee(data);
            } catch (error) {
                console.error('Error al obtener los datos del empleado:', error);
            }
        };

        if (id) {
            fetchEmployee();
        }
    }, [id]);

    if (!employee) {
        return <p>Cargando datos del empleado...</p>;
    }

    return (
        <section className="Layout">
            <div className="Content_Layout">
                <C_Title nameTitle={"Perfil"} />
                <C_CardData />
                <C_FromData_Em /> 

                <Btn_Edit
                    nameId={employee.idEmployee}
                    showContent="text+icon"
                    onEdit={openEditModal} 
                />

                {/* Modal para editar el empleado */}
                {showEditModal && (
                    <ModalEditEmployee
                        employeeId={employee.idEmployee} 
                        onClose={closeEditModal}
                        onUpdate={() => {
                            closeEditModal(); 
                            window.location.reload();
                        }}
                    />
                )}
            </div>
        </section>
    );
}

export default L_Profile_Em;
