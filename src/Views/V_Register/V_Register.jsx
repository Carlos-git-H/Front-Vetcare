import React from 'react'
import "./V_Register.css"
import Box_Text_Empty from '../../Components/CS_General/Form Box/Box_Text/Box_Text_Empty'
import "./V_Register.css"

function V_Register() {
  return (
    
    <div className='V_login'>
        <div className="register-login">
                <h1 className="login-title">Registarse</h1>
                <form className="register-form" action="#" method="POST">
                
                    <div className="row g-3">
                        <div className="col">
                            <Box_Text_Empty id={"dni"} Label={"Dni"}/>
                        </div>
                        <div className="col">
                            <Box_Text_Empty id={"primerNombre"} Label={"Primer Nombre"}/>
                        </div>
                        <div className="col">
                            <Box_Text_Empty id={"segundoNombre"} Label={"Pre Nombre"}/>
                        </div>
                    </div>
                    <div className="row g-3">
                    <div className="col">
                            <Box_Text_Empty id={"primerApellido"} Label={"Primer Apellido"}/>
                        </div>
                        <div className="col">
                            <Box_Text_Empty id={"segundoApellido"} Label={"Pre Apellido"}/>
                        </div>
                    </div>
                    <div className="row g-3">
                        <div className="col">
                            <Box_Text_Empty id={"gmail"} Label={"Gmail"}/>
                        </div>
                        <div className="col">
                            <Box_Text_Empty id={"Telefono"} Label={"Telefono"}/>
                        </div>
                    </div>
                    <div className="row g-3">
                        <div className="col">
                            <Box_Text_Empty id={"primeraContraseña"} Label={"Contraseña"}/>
                        </div>
                        <div className="col">
                            <Box_Text_Empty id={"segundaContraseña"} Label={"Confirmar Contraseña"}/>
                        </div>
                    </div>
                    <button type="submit" className="login-submit-btn">Registarme</button>
                </form>
        </div>
    </div>
    )
}

export default V_Register