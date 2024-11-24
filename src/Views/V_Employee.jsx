import React, { useEffect, useState } from 'react';
import { Navigate, Routes, Route } from 'react-router-dom';
import C_Aside_Em from '../Components/CS_Employees/C_Aside_Em/C_Aside_Em';
import L_Agenda_Em from '../Layouts/LS_Employees/L_Agenda_Em';
import L_Profile_Em from '../Layouts/LS_Employees/L_Profile_Em';
import L_Pets_Em from '../Layouts/LS_Employees/L_Pets_Em';
import L_Services_Em from '../Layouts/LS_Employees/L_Services_Em';
import L_Citas_Em from '../Layouts/LS_Employees/L_Citas_Em';
import L_Reports_Em from '../Layouts/LS_Employees/L_Reports_Em';
import L_Clients_Em from '../Layouts/LS_Employees/L_Clients_Em';
import L_Employees_Em from '../Layouts/LS_Employees/L_Employees_Em';
import "./Vistas.css"

function V_Employee() {
  const [employeeData, setEmployeeData] = useState(null);
  const [redirect, setRedirect] = useState(null);

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    const userType = localStorage.getItem('userType');

    // Validar credenciales en localStorage
    if (!userId || !userType) {
      alert('Sin credenciales. Redirigiendo al inicio de sesión.');
      setRedirect('/login');
      return;
    }

    if (userType !== 'empleado') {
      alert('No eres un empleado. Redirigiendo...');
      setRedirect('/cliente');
      return;
    }

    // Llamada al backend para obtener datos del empleado
    const fetchEmployeeData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/employees/${userId}`);
        if (!response.ok) {
          throw new Error('Error al obtener los datos del empleado');
        }
        const data = await response.json();
        setEmployeeData(data); // Guardar los datos del empleado
      } catch (error) {
        console.error('Error al obtener los datos del empleado:', error);
        setRedirect('/login'); // Redirigir al login si ocurre un error
      }
    };

    fetchEmployeeData();
  }, []);

  if (redirect) {
    return <Navigate to={redirect} replace />;
  }

  return (
    <div className='layout-container'>

      <div className='layout-aside'>
      
        {/* Mostrar el componente C_Aside_Em solo si los datos del empleado están disponibles */}
        {employeeData && <C_Aside_Em nameEmpleado={employeeData.firstName} />}

      </div>

      
      <div className='layout-content'>
          <Routes>
            <Route>
              <Route path="agenda/*" element={<L_Agenda_Em />}></Route>
              <Route path="perfil/*" element={<L_Profile_Em />}></Route>
              <Route path="mascotas/*" element={<L_Pets_Em />}></Route>
              <Route path="servicios/*" element={<L_Services_Em />}></Route>
              <Route path="citas/*" element={<L_Citas_Em />}></Route>
              <Route path="empleados/*" element={<L_Employees_Em />}></Route>
              <Route path="clientes/*" element={<L_Clients_Em />}></Route>
              <Route path="reportes/*" element={<L_Reports_Em />}></Route>
              
              <Route path="/" element={<Navigate to="agenda" />} />
              
            </Route>
          </Routes>
      </div>
    </div>
  );
}

export default V_Employee;
