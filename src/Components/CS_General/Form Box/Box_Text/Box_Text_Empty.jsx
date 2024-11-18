import React from 'react';
import "./Box_Text.css";

function Box_Text_Empty({ id, Label, name, value, onChange }) {
    return (
        <div className="form-group">
            <label>{Label}:</label>
            <input
                id={id}
                name={name || id} // Usa `name` si está definido, de lo contrario `id`
                type="text"
                value={value || ""} // Valor controlado con cadena vacía predeterminada
                onChange={onChange} // Maneja el cambio en el input
                className="input-box"
            />
        </div>
    );
}

export default Box_Text_Empty;
