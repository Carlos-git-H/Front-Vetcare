import React from 'react'
import "./Btn_Logout.css"
import { useNavigate } from 'react-router-dom';

function Btn_Logout() {
    const navigate = useNavigate();

    const handleLogout = () => {
        //Añadir accines de eliminar token de usuario (o cosas parecida)
    navigate('/login', { replace: true }); 
    };
    return (
        <button onClick={handleLogout} className="logout-button">
            Cerrar Sesión  
            <span className="material-symbols-outlined">Logout</span>
        </button>
    )
}

export default Btn_Logout