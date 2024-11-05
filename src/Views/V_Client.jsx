import React from 'react'
import C_Aside_Cl from '../Components/CS_Clients/C_Aside/C_Aside_Cl'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import L_Agenda_Cl from '../Layouts/LS_Clients/L_Agenda_Cl'
import L_Profile_Cl from '../Layouts/LS_Clients/L_Profile_Cl'
import L_Pets_Cl from '../Layouts/LS_Clients/L_Pets_Cl'
import L_Services_Cl from '../Layouts/LS_Clients/L_Services_Cl'
import L_Notifications_Cl from '../Layouts/LS_Clients/L_Notifications_Cl'
import L_Citas_Cl from '../Layouts/LS_Clients/L_Citas_Cl'

function V_Client() {
  return (
    <div>
      
      <C_Aside_Cl nameCliente={"Juan Carlos"}/>
      <div>
          <Routes>
            <Route>
                <Route path="agenda/*" element={<L_Agenda_Cl />}></Route>
                <Route path="perfil/*" element={<L_Profile_Cl />}></Route>
                <Route path="mascotas/*" element={<L_Pets_Cl />}></Route>
                <Route path="servicios/*" element={<L_Services_Cl />}></Route>
                <Route path="citas/*" element={<L_Citas_Cl />}></Route>
                <Route path="notificaciones/*" element={<L_Notifications_Cl />}></Route>
                <Route path="/" element={<Navigate to="agenda" />} />
            </Route>
          </Routes>
        

      </div>
    </div>

    
  )
}

export default V_Client