import React from 'react';
import "./Btn_Logout.css";
import { useNavigate } from 'react-router-dom';

function Btn_Logout() {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Eliminar datos del localStorage
        localStorage.removeItem('userId');
        localStorage.removeItem('userType');

        // Navegar a la página de login
        navigate('/login', { replace: true }); 
    };

    return (
        <button onClick={handleLogout} className="logout-button">
            Cerrar Sesión  
            <span className="material-symbols-outlined">Logout</span>
        </button>
    );
}

export default Btn_Logout;
