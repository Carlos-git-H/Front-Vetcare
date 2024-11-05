import React from 'react'
import C_Aside_Em from '../Components/CS_Employees/C_Aside_Em/C_Aside_Em'

import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import L_Agenda_Em from '../Layouts/LS_Employees/L_Agenda_Em'
import L_Profile_Em from '../Layouts/LS_Employees/L_Profile_Em'
import L_Pets_Em from '../Layouts/LS_Employees/L_Pets_Em'
import L_Services_Em from '../Layouts/LS_Employees/L_Services_Em'
import L_Citas_Em from '../Layouts/LS_Employees/L_Citas_Em'
import L_Notifications_Em from '../Layouts/LS_Employees/L_Notifications_Em'
import L_Reports_Em from '../Layouts/LS_Employees/L_Reports_Em'
import L_Clients_Em from '../Layouts/LS_Employees/L_Clients_Em'
import L_Employees_Em from '../Layouts/LS_Employees/L_Employees_Em'
import Btn_Edit from '../Components/CS_General/Buttons/Btn_Edit'
import O_editEmployee from '../Layouts/Options_L/O_Employees/O_editEmployee'
import O_editClient from '../Layouts/Options_L/O_Clients/O_editClient'

function V_Employee() {


  return (
    <div>
      
      <C_Aside_Em nameEmpleado={"Astonitas"}/>
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
                <Route path="clientes/*" element={<L_Clients_Em/>}></Route>
                <Route path="reportes/*" element={<L_Reports_Em />}></Route>
                <Route path="/" element={<Navigate to="agenda" />} />
                <Route path="clientes/option_editCliente/:id" element={<O_editClient />} />
            </Route>
          </Routes>
      </div>
    </div>
  )
}

export default V_Employee