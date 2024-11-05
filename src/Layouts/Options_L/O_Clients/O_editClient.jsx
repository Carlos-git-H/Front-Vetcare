import React from 'react'
import "../../Options_L/Options.css"
import C_Title from '../../../Components/CS_General/C_Title/C_Title'
import Btn_Save from '../../../Components/CS_General/Buttons/Btn_Save'
import Box_Text_Value from  '../../../Components/CS_General/Form Box/Box_Text/Box_Text_Value'

function O_editClient() {

  return (
    <div className='Options'>
      <div className='Content-Options'>
          <form action="#" method="post">
            <C_Title nameTitle={"Editar"}/>
            <Box_Text_Value id="editDni" Label="Dni"/>
            <Box_Text_Value id="editPrimerNombre" Label="Primer Nombre"/>
            <Box_Text_Value id="editSegundoNombre" Label="Segundo Nombre"/>
            <Box_Text_Value id="editPrimerApellido" Label="Primer Apellido"/>
            <Box_Text_Value id="editSegundoApellido" Label="Segundo Apellido"/>
            <Box_Text_Value id="editDireccion" Label="Dirección"/>
            <Box_Text_Value id="editTelefono" Label="Telefono"/>
            <Btn_Save nameId={"editCliente"} showContent='text+icon'/>
          </form>
          
      </div>
    </div>
  )
}
export default O_editClient