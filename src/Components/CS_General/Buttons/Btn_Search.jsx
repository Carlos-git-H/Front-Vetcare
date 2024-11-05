import React from 'react'
import "./Buttons.css"

function Btn_Search({nameId, showContent = 'icon'}) {
    return (
    <button id={nameId} type="button" className={`btn btn-primary ${showContent}`}>
        {showContent === 'icon' && (
            <span className="material-symbols-outlined">Search</span>
        )}
        {showContent === 'text+icon' && (
        <>
            <span>Buscar</span>
            <span className="material-symbols-outlined">Search</span>
        </>
        )}
    </button>
    )
}
export default Btn_Search