import React from 'react'
import Box_Text_Empty from  '../../../Components/CS_General/Form Box/Box_Text/Box_Text_Empty'
import "../../Options_L/Options.css"
import C_Title from '../../../Components/CS_General/C_Title/C_Title'
import Btn_Save from '../../../Components/CS_General/Buttons/Btn_Save'

function O_newClient() {
  return (
    <div className='Options'>
      <div className='Content-Options'>
          
          <C_Title nameTitle={"Nuevo Cliente"}/>
          <Box_Text_Empty id="newDni" Label="Dni"/>
          <Box_Text_Empty id="newPrimerNombre" Label="Primer Nombre"/>
          <Box_Text_Empty id="newSegundoNombre" Label="Segundo Nombre"/>
          <Box_Text_Empty id="newPrimerApellido" Label="Primer Apellido"/>
          <Box_Text_Empty id="newSegundoApellido" Label="Segundo Apellido"/>
          <Box_Text_Empty id="newDireccion" Label="Dirección"/>
          <Box_Text_Empty id="newTelefono" Label="Telefono"/>
          <Btn_Save nameId={"newCliente"} showContent='text+icon'/>

      </div>
    </div>
  )
}

export default O_newClient