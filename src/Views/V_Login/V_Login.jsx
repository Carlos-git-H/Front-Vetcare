import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import "./V_Login.css";

function V_Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
      
        try {
          const response = await fetch('http://localhost:8080/api/authenticate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
          });
      
          if (!response.ok) {
            throw new Error('Error al autenticar');
          }
      
          const data = await response.json();
      
          // Redirigir basado en el tipo de usuario
          if (data.type === 'empleado') {
            setRedirect(`/empleado/${data.id}`);
          } else if (data.type === 'cliente') {
            setRedirect(`/cliente/${data.id}`);
          }
        } catch (error) {
          console.error('Error en la autenticación:', error);
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
                        <button type="submit" className="login-submit-btn" disabled={loading}>
                            {loading ? 'Cargando...' : 'Ingresar'}
                        </button>
                        {error && <p className="login-error">{error}</p>}
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
