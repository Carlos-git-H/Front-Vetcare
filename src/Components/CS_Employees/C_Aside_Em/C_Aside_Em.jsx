import React from 'react'
import "./C_Aside_Em.css"
import { Link } from 'react-router-dom'
import Btn_Logout from '../../CS_General/Buttons/Btn_Logout/Btn_Logout'
import Btn_Nav from '../../CS_General/Buttons/Btn_Nav/Btn_Nav'
import Btn_Nav_Active from '../../CS_General/Buttons/Btn_Nav_Active/Btn_Nav_Active'

function C_Aside_Em({nameEmpleado}) {
  return (
    <aside className="sidebar">
        <ul className="nav">
            
            <Link to={"agenda"} className="no-underline">
                <li className="option-nav active">
                    <Btn_Nav_Active/>
                </li>
            </Link>

            <Link to={"perfil"} className="no-underline">
                <li className="option-nav">
                    <Btn_Nav nameOption={nameEmpleado} nameIcon={"Account_Circle"}/>
                </li>
            </Link>
            
            <Link to={"empleados"} className="no-underline">
                <li className="option-nav">
                    <Btn_Nav nameOption={"Empleados"} nameIcon={"Group"}/>
                </li>
            </Link>

            <Link to={"clientes"} className="no-underline">
                <li className="option-nav">
                    <Btn_Nav nameOption={"Clientes"} nameIcon={"Group"}/>
                </li>
            </Link>

            <Link to={"mascotas"} className="no-underline">
                <li className="option-nav">
                    <Btn_Nav nameOption={"Mascotas"} nameIcon={"Pets"}/>
                </li>
            </Link>

            
            <Link to={"servicios"} className="no-underline">
                <li className="option-nav">
                    <Btn_Nav nameOption={"Servicios"} nameIcon={"Medical_Services"}/>
                </li>
            </Link>

            
            <Link to={"citas"} className="no-underline">
                <li className="option-nav">
                    <Btn_Nav nameOption={"Citas"} nameIcon={"Calendar_Month"}/>
                </li>
            </Link>

            
            <Link to={"notificaciones"} className="no-underline">
                <li className="option-nav">
                    <Btn_Nav nameOption={"Recordatorios | Notificaciones"} nameIcon={"Notifications"}/>
                </li>
            </Link>

            <Link to={"reportes"} className="no-underline">
                <li className="option-nav">
                    <Btn_Nav nameOption={"Reportes"} nameIcon={"Draft"}/>
                </li>
            </Link>

        </ul>
        <Link to="/login"><Btn_Logout></Btn_Logout></Link>
    </aside>
  )
}

export default C_Aside_Em