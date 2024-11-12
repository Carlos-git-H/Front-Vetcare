import React from 'react';
import './DateTimeInput.css'; // Archivo CSS para estilos

function DateTimeInput({ label, type, name, value, onChange }) {
    return (
        <div className="form-group date-time-input">
            <label className="date-time-label">{label}</label>
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                className="input-box date-time-input-box"
            />
        </div>
    );
}

export default DateTimeInput;
