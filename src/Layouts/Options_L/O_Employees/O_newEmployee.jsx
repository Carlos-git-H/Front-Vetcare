import React from 'react'

function O_newEmployee() {
  return (
    <div className='Options'>
      <div className='Content-Options'>
        
        <C_Title nameTitle={"Nuevo Empleado"}/>

        <form >
            <Box_Text_Empty id="newDniEm" Label="Dni"/>
            <Box_Text_Empty id="newPrimerNombreEm" Label="Primer Nombre"/>
            <Box_Text_Empty id="newSegundoNombreEm" Label="Segundo Nombre"/>
            <Box_Text_Empty id="newPrimerApellidoEm" Label="Primer Apellido"/>
            <Box_Text_Empty id="newSegundoApellidoEm" Label="Segundo Apellido"/>
            <Box_Text_Empty id="newDireccionEm" Label="Dirección"/>
            <Box_Text_Empty id="newTelefonoEm" Label="Telefono"/>
            <Box_Text_Empty id="newCMVPEm" Label="CMVP"/>
            <Box_Text_Empty id="newRol" Label="Rol"/>
            <Box_Text_Empty id="newEmailEm" Label="Email"/>
            <Box_Text_Empty id="newPasswordEm" Label="Password"/>
            <Btn_Save nameId={"newEmpleado"} showContent='text+icon'/>
        </form>
      </div>
    </div>
  )
}

export default O_newEmployee