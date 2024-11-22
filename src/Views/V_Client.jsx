import React, { useEffect, useState } from 'react';
import { Navigate, Routes, Route } from 'react-router-dom';
import C_Aside_Cl from '../Components/CS_Clients/C_Aside/C_Aside_Cl';
import L_Agenda_Cl from '../Layouts/LS_Clients/L_Agenda_Cl';
import L_Profile_Cl from '../Layouts/LS_Clients/L_Profile_Cl';
import L_Pets_Cl from '../Layouts/LS_Clients/L_Pets_Cl';
import L_Services_Cl from '../Layouts/LS_Clients/L_Services_Cl';
import L_Notifications_Cl from '../Layouts/LS_Clients/L_Notifications_Cl';
import L_Citas_Cl from '../Layouts/LS_Clients/L_Citas_Cl';
import "./Vistas.css"

function V_Client() {
  const [clientData, setClientData] = useState(null);
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

    if (userType !== 'cliente') {
      alert('No eres un cliente. Redirigiendo...');
      setRedirect('/empleado');
      return;
    }

    // Llamada al backend para obtener datos del cliente
    const fetchClientData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/clients/${userId}`);
        if (!response.ok) {
          throw new Error('Error al obtener los datos del cliente');
        }
        const data = await response.json();
        setClientData(data); // Guardar los datos del cliente
      } catch (error) {
        console.error('Error al obtener los datos del cliente:', error);
        setRedirect('/login'); // Redirigir al login si ocurre un error
      }
    };

    fetchClientData();
  }, []);

  if (redirect) {
    return <Navigate to={redirect} replace />;
  }

  return (
    <div className='layout-container'>

      <div className='layout-aside'>
        {/* Mostrar el componente C_Aside_Cl solo si los datos del cliente están disponibles */}
        {clientData && <C_Aside_Cl nameCliente={clientData.firstName+" "+clientData.firstLastName} />}
      
      </div>
      
      <div className='layout-content'>
        <Routes>
          <Route>
            <Route path="agenda/*" element={<L_Agenda_Cl />} />
            <Route path="perfil/*" element={<L_Profile_Cl />} />
            <Route path="mascotas/*" element={<L_Pets_Cl />} />
            <Route path="servicios/*" element={<L_Services_Cl />} />
            <Route path="citas/*" element={<L_Citas_Cl />} />
            <Route path="notificaciones/*" element={<L_Notifications_Cl />} />
            <Route path="/" element={<Navigate to="agenda" />} />
          </Route>
        </Routes>
      </div>
    </div>
  );
}

export default V_Client;
