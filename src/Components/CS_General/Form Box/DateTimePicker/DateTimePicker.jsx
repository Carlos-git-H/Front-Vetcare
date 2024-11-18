import React from 'react';
import './DateTimePicker.css'; // Archivo CSS para los estilos

function DateTimePicker({ label, type, name, value, onChange }) {
    return (
        <div className="datetime-picker">
            <label className="datetime-label">{label}:</label>
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                className="datetime-input"
            />
        </div>
    );
}

export default DateTimePicker;
