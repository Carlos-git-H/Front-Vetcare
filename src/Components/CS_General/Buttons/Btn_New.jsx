import React from 'react'
import "./Buttons.css"

function Btn_New({nameId, name, showContent = 'icon'}) {
    return (
    <button id={nameId} type="button" className={`btn btn-success ${showContent}`}>
        {showContent === 'icon' && (
            <span className="material-symbols-outlined">Add</span>
        )}
        {showContent === 'text+icon' && (
        <>
            <span>Añadir {name}</span>
            <span className="material-symbols-outlined">Add</span>
        </>
        )}
        {showContent === 'icon+text' && (
        <>
            <span className="material-symbols-outlined">Add</span>
            <span>Añadir {name}</span>
        </>
        )}
    </button>
    )
}

export default Btn_New