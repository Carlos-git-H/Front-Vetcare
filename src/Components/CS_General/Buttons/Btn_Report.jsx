import React from 'react'
import "./Buttons.css"

function Btn_Report({nameId, showContent = 'icon'}) {
    return (
    <button id={nameId} type="button" className={`btn btn-primary ${showContent}`}>
        {showContent === 'icon' && (
            <span className="material-symbols-outlined">File</span>
        )}
        {showContent === 'text+icon' && (
        <>
            <span>Generar Reporte</span>
            <span className="material-symbols-outlined">File</span>
        </>
        )}
        {showContent === 'icon+text' && (
        <>
            <span className="material-symbols-outlined">File</span>
            <span>Generar Reporte</span>
        </>
        )}
    </button>
    )
}

export default Btn_Report