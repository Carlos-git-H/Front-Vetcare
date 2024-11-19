import React, { useEffect, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes, useParams } from 'react-router-dom';
import C_Aside_Em from '../Components/CS_Employees/C_Aside_Em/C_Aside_Em';
import L_Agenda_Em from '../Layouts/LS_Employees/L_Agenda_Em';
import L_Profile_Em from '../Layouts/LS_Employees/L_Profile_Em';
import L_Pets_Em from '../Layouts/LS_Employees/L_Pets_Em';
import L_Services_Em from '../Layouts/LS_Employees/L_Services_Em';
import L_Citas_Em from '../Layouts/LS_Employees/L_Citas_Em';
import L_Notifications_Em from '../Layouts/LS_Employees/L_Notifications_Em';
import L_Reports_Em from '../Layouts/LS_Employees/L_Reports_Em';
import L_Clients_Em from '../Layouts/LS_Employees/L_Clients_Em';
import L_Employees_Em from '../Layouts/LS_Employees/L_Employees_Em';
import L_InfoPet_Em from '../Layouts/LS_Employees/L_InfoPet_Em';

function V_Employee() {
  const [employeeData, setEmployeeData] = useState(null);
  const { id } = useParams(); 

  useEffect(() => {
    // Llamada al backend para obtener datos del empleado por ID
    const fetchEmployeeData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/employees/${id}`);
        if (!response.ok) {
          throw new Error('Error al obtener los datos del empleado');
        }
        const data = await response.json();
        setEmployeeData(data); // Guardar los datos del empleado
      } catch (error) {
        console.error('Error al obtener los datos del empleado:', error);
      }
    };

    if (id) {
      fetchEmployeeData();
    }
  }, [id]);

  return (
    <div>
      {/* Mostrar el componente C_Aside_Em solo si los datos del empleado están disponibles */}
      {employeeData && <C_Aside_Em nameEmpleado={employeeData.firstName} />}
      <div>
        <Routes>
          <Route>
            <Route path="agenda/*" element={<L_Agenda_Em />}></Route>
            <Route path="perfil/*" element={<L_Profile_Em />}></Route>
            <Route path="mascotas/*" element={<L_Pets_Em />}></Route>
            <Route path="servicios/*" element={<L_Services_Em />}></Route>
            <Route path="citas/*" element={<L_Citas_Em />}></Route>
            <Route path="notificaciones/*" element={<L_Notifications_Em />}></Route>
            <Route path="empleados/*" element={<L_Employees_Em />}></Route>
            <Route path="clientes/*" element={<L_Clients_Em />}></Route>
            <Route path="reportes/*" element={<L_Reports_Em />}></Route>
            <Route path="info" element={<L_InfoPet_Em idPet={11}/>}></Route>
          </Route>
        </Routes>
      </div>
    </div>
  );
}

export default V_Employee;
