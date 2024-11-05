import React from 'react'
import "./C_CardData.css"

function C_CardData() {
    const DirImgs="../../../../public/Img/"
    const dataProfile = {
        id:6,
        dni: "57452158",
        PrimerNombre: "Luis",
        SegundoNombre: "Angel",
        PrimerApellido: "Astonitas",
        SegundoApellido: "Gómez",
        CMVP: "12345",
        Direccion: "Calle Falsa 123",
        Telefono: "987654321",
        Email: "luis.angel@mail.com",
        Rol: "admi",
        RutaImg:"UserFoto.png"
    };
  return (
    <div className='container'>
        <div className='preview'>
            <div className='imagenProfile'>
                <img className='imagenP' src={DirImgs+dataProfile.RutaImg} alt="foto User" />
            </div>
            <div className='info'>
                <h4>
                    {dataProfile.PrimerNombre +" "+ dataProfile.PrimerApellido}
                </h4>
                <label >DNI: {dataProfile.dni}</label>
                <label className='caracterT'>CMVP: {dataProfile.CMVP}</label>
            </div>
        </div>
    </div>
  )
}

export default C_CardData