import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import "./V_Login.css";

function V_Login() {
    const [email, setEmail] = useState(''); // Estado para el email
    const [password, setPassword] = useState(''); // Estado para la contraseña
    const [redirect, setRedirect] = useState(null); // Estado para redirigir
    const [error, setError] = useState(''); // Estado para manejar errores

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Limpiar cualquier error previo

        console.log('Intentando autenticación con:', { email, password });

        try {
            const response = await fetch('http://localhost:8080/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            console.log('Estado de la respuesta:', response.status);

            if (!response.ok) {
                const errorText = await response.text();
                console.error('Error del servidor:', errorText);
                throw new Error('Credenciales incorrectas');
            }

            const data = await response.json();
            console.log('Datos recibidos:', data);

            // Redirigir basado en el tipo de usuario
            if (data.type === 'empleado') {
                localStorage.setItem('userType', 'empleado'); // Almacenar tipo de usuario
                localStorage.setItem('userId', data.id); // Almacenar ID del usuario
                setRedirect('/empleado');
            } else if (data.type === 'cliente') {
                localStorage.setItem('userType', 'cliente'); // Almacenar tipo de usuario
                localStorage.setItem('userId', data.id); // Almacenar ID del usuario
                setRedirect('/cliente');
            }
        } catch (err) {
            console.error('Error en la autenticación:', err);
            setError('Error: ' + (err.message || 'Error desconocido.'));
        }
    };

    // Redirigir al usuario si la autenticación fue exitosa
    if (redirect) {
        console.log('Redirigiendo a:', redirect);
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
                                type="email"
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
                        {error && <p className="login-error">{error}</p>}
                        <button type="submit" className="login-submit-btn">
                            Ingresar
                        </button>
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
