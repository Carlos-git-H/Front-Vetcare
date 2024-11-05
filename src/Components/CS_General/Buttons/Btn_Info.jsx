import React from 'react'
import "./Buttons.css"

function Btn_Info({nameId, showContent = 'icon'}) {
    return (
    <button id={nameId} type="button" className={`btn btn-info ${showContent}`}>
        {showContent === 'icon' && (
            <span className="material-symbols-outlined">Visibility</span>
        )}
        {showContent === 'text+icon' && (
        <>
            <span>Ver más</span>
            <span className="material-symbols-outlined">Visibility</span>
        </>
        )}
        {showContent === 'icon+text' && (
        <>
            <span className="material-symbols-outlined">Visibility</span>
            <span>Ver más</span>
        </>
        )}
    </button>
    )
}

export default Btn_Info