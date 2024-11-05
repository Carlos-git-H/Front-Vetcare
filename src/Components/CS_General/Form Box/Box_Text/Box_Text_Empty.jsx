import React from 'react'
import "./Box_Text.css"

function Box_Text_Empty({id,Label}) {
    return (
        
    <div className='form-group'>
        <label>{Label}:</label>
        <input
            id={id}
            name={id}
            type="text"
            required
        />
    </div>
    );
}


export default Box_Text_Empty