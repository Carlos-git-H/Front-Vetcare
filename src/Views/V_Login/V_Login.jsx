import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import "./V_Login.css";
import Btn_Login from '../../Components/CS_General/Buttons/Btn_Login';

function V_Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(null);

    const usuarios = [
        { correo: 'cliente@example.com', contrasena: 'cliente', tipo: 'cliente', idCliente:'2'},
        { correo: 'empleado@example.com', contrasena: 'empleado', tipo: 'empleado', idEmpleado: '2' },
    ];

    const handleSubmit = (e) => {
        e.preventDefault();

        const usuarioValido = usuarios.find(
            (usuario) => usuario.correo === email && usuario.contrasena === password
        );

        if (usuarioValido) {
            if (usuarioValido.tipo === 'empleado') {
                setRedirect('/empleado');
            } else if (usuarioValido.tipo === 'cliente') {
                setRedirect('/cliente');
            }
        } else {
            alert('Correo o contraseña incorrectos');
        }
    };

    if (redirect) {
        return <Navigate to={redirect} replace />;
    }
    
    return (
        <div className='V_login'>
            <div className="login-container">
                <div className="login-card">
                    <h1 className="login-title">Iniciar Sesión</h1>
                    <form className="login-form" onSubmit={handleSubmit}>
                        <div className="login-form-group">
                            <label htmlFor="email">Correo</label>
                            <input
                                type="text"
                                id="email"
                                name="email"
                                className="login-input"
                                placeholder="Ingrese su correo"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="login-form-group">
                            <label htmlFor="password">Contraseña</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                className="login-input"
                                placeholder="Ingrese su contraseña"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className="login-submit-btn">Ingresar</button>

                    </form>
                    <div className="login-register-link">
                        <p>¿No tienes una cuenta? <a href="/register">Regístrate aquí</a></p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default V_Login;

